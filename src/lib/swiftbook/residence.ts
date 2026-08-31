/**
 * BROOKSIDE RESIDENCE — STAAH CSBE API client.
 *
 * Separate from the motel booking engine. Uses the Residence property
 * credentials verified from live network capture (2026-08-26):
 *
 *   PropertyId (B64): 622NTgOqOT6TvN8eZciKNab5xydWTYGd3WNTg0Mjg=
 *   PropertyId (DEC): 58428
 *   Room IDs:         253372 (primary), 253371 (secondary)
 *   Rate Plan ID:     1513400000000001
 *   Nightly Rate:     NZD 390.00
 *   Tracker B64:      NTg0Mjg=
 *
 * Endpoints (same as motel, different PropertyId):
 *   1. bedataguest — availability + rates
 *   2. ratecart    — confirmed rate detail
 *   3. pginfo      — payment gateways
 *   4. bookingverify — create booking
 *   5. getpaymentlinkdetail — process credit card
 *   6. betracker   — analytics (fire-and-forget)
 */

import {
  CSBE_BASE,
  TRACKER_BASE,
  CSBE_API_KEY,
  CC_ENCRYPT_KEY,
  CC_ENCRYPT_IV,
  type BdgtResponse,
  type RateCartResponse,
  type PgInfoResponse,
  type RoomQuote,
  type RateDetail,
  type BookingVerifyResponse,
  type PaymentLinkResponse,
} from "./types";
import {
  RESIDENCE_PROPERTY_ID_B64,
  RESIDENCE_PROPERTY_ID_DEC,
  RESIDENCE_TRACKER_ID_B64,
  RESIDENCE_RATE_PLAN_ID,
} from "@/lib/site";

/* ─────────────────────────────────────────────────────────────────────
   Constants & helpers
   ───────────────────────────────────────────────────────────────────── */

const TIMEOUT_MS = 15_000;

const HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "X-Api-Key": CSBE_API_KEY,
  "Accept": "application/json",
};

function nightsBetween(a: string, b: string): number {
  return Math.max(
    0,
    Math.round(
      (new Date(`${b}T00:00:00`).getTime() -
        new Date(`${a}T00:00:00`).getTime()) /
        86_400_000
    )
  );
}

function generateVisitorId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let r = "";
  for (let i = 0; i < 18; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

export interface ResidenceSearchParams {
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  adults: number;
  children: number;
}

/* ─────────────────────────────────────────────────────────────────────
   1. bedataguest — availability + per-night rates
      POST https://csbe.staah.net/?RequestType=bedataguest&JDRN=Y
   ───────────────────────────────────────────────────────────────────── */

export async function fetchResidenceAvailability(
  params: ResidenceSearchParams
): Promise<{ quotes: RoomQuote[]; currency: string }> {
  const nights = Math.max(1, nightsBetween(params.checkIn, params.checkOut));

  const body = {
    Product: "no",
    PropertyId: RESIDENCE_PROPERTY_ID_B64,
    CheckInDate: params.checkIn,
    CheckOutDate: params.checkOut,
    Country: "NZ",
    DeviceType: "desktop",
    JDRN: "Y",
    Lang: "EN",
    Rooms: [
      {
        Adult: params.adults,
        Children: Array.from({ length: params.children }, () => 8),
      },
    ],
  };

  const res = await fetch(`${CSBE_BASE}?RequestType=bedataguest&JDRN=Y`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`STAAH API availability check failed: HTTP ${res.status}`);
  }

  const json = (await res.json()) as BdgtResponse;
  const product = json.Product?.[0];
  const currency = product?.Currency ?? "NZD";
  const rawRooms = product?.Rooms ?? [];

  if (rawRooms.length === 0) {
    return { quotes: [], currency };
  }

  const quotes: RoomQuote[] = [];
  const needsRatecart: { roomId: string; rateId: string }[] = [];

  for (const r of rawRooms) {
    const plan = r.RatePlans?.[0];
    const rateDates = plan?.Rates?.[0]?.Dates ?? {};
    const nightlyRates: { date: string; beforeTax: number; afterTax: number }[] = [];
    let total = 0;

    for (const [date, rd] of Object.entries(rateDates)) {
      const afterTax = parseFloat(rd.RateAfterTax ?? "0");
      const beforeTax = parseFloat(rd.RateBeforeTax ?? "0");
      total += afterTax;
      nightlyRates.push({ date, beforeTax, afterTax });
    }
    nightlyRates.sort((a, b) => a.date.localeCompare(b.date));

    const available =
      (r.Roommatch === "fullmatch" || r.Roommatch === undefined) &&
      (r.MinInventory === undefined || r.MinInventory > 0);

    const rateId = plan?.RateId ?? RESIDENCE_RATE_PLAN_ID;

    if (available && nightlyRates.length === 0) {
      needsRatecart.push({ roomId: r.RoomId, rateId });
    }

    quotes.push({
      roomId: r.RoomId,
      available,
      restrictionTitle: r.RestrictionTitle ?? "",
      minInventory: r.MinInventory ?? 1,
      currency,
      total,
      minNightly: nightlyRates.length > 0 ? Math.min(...nightlyRates.map((n) => n.afterTax)) : null,
      nightlyRates,
      nights,
      cancellationDesc: plan?.CancellationPolicy?.Description ?? "",
      rateId,
    });
  }

  // Resolve live rate details via ratecart for rooms missing inline rates in bedataguest
  if (needsRatecart.length > 0) {
    const rateResults = await Promise.allSettled(
      needsRatecart.map(async ({ roomId, rateId }) => {
        const detail = await fetchResidenceRateCart(params, roomId, rateId);
        return { roomId, detail };
      })
    );

    for (const result of rateResults) {
      if (result.status === "fulfilled") {
        const { roomId, detail } = result.value;
        const quote = quotes.find((q) => q.roomId === roomId);
        if (quote && detail.totalAmount > 0) {
          quote.total = detail.totalAmount;
          quote.currency = detail.currency;
          if (detail.cancellationDesc) {
            quote.cancellationDesc = detail.cancellationDesc;
          }
          const nRates: { date: string; beforeTax: number; afterTax: number }[] = [];
          for (const [date, day] of Object.entries(detail.perDay)) {
            nRates.push({ date, beforeTax: day.beforeTax, afterTax: day.afterTax });
          }
          if (nRates.length > 0) {
            nRates.sort((a, b) => a.date.localeCompare(b.date));
            quote.nightlyRates = nRates;
            quote.minNightly = Math.min(...nRates.map((n) => n.afterTax));
          }
        }
      }
    }
  }

  return { quotes, currency };
}

/* ─────────────────────────────────────────────────────────────────────
   2. ratecart — confirmed rate detail for selected room
      POST https://csbe.staah.net/?RequestType=ratecart&JDRN=Y
   ───────────────────────────────────────────────────────────────────── */

function safeUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function fetchResidenceRateCart(
  params: ResidenceSearchParams,
  roomId: string,
  rateId: string,
  promoCode = ""
): Promise<RateDetail> {
  const uniqId = safeUUID();
  const resolvedRateId = rateId || RESIDENCE_RATE_PLAN_ID;

  const body = {
    Other: {
      Country: "IN",
      DeviceType: "desktop",
      Lang: "EN",
    },
    Request: [
      {
        PropertyId: RESIDENCE_PROPERTY_ID_B64,
        Currency: "NZD",
        PromoCode: promoCode,
        Room: [
          {
            RoomId: roomId,
            RatePlanId: resolvedRateId,
            CheckInDate: params.checkIn,
            CheckOutDate: params.checkOut,
            Adult: params.adults,
            Children: Array.from({ length: params.children }, () => 8),
            UniqId: uniqId,
          },
        ],
      },
    ],
  };

  const res = await fetch(`${CSBE_BASE}?RequestType=ratecart&JDRN=Y`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`STAAH ratecart failed: HTTP ${res.status}`);
  }

  const json = (await res.json()) as RateCartResponse;
  const propBlock = json.Product?.[RESIDENCE_PROPERTY_ID_DEC];
  if (!propBlock) throw new Error("STAAH ratecart: no product data returned");

  const uuid = Object.keys(propBlock)[0];
  if (!uuid) throw new Error("STAAH ratecart: no rate entry found");

  const entry = propBlock[uuid];
  const days = entry.Rates ?? {};

  const perDay: RateDetail["perDay"] = {};
  let totalAfterTax = 0;

  for (const [date, dayRate] of Object.entries(days)) {
    const afterTax = Number(dayRate.RateAfterTax) || 0;
    const beforeTax = Number(dayRate.RateBeforeTax) || 0;
    const savings = Number(dayRate.Savings) || 0;
    perDay[date] = { beforeTax, afterTax, savings };
    totalAfterTax += afterTax;
  }

  return {
    currency: entry.Currency ?? "NZD",
    depositAmount: Number(entry.DepositAmount) || 0,
    totalAmount: totalAfterTax,
    cancellationDesc: entry.CancellationPolicy?.Description ?? "",
    cancellationType: entry.CancellationPolicy?.Type ?? "",
    perDay,
  };
}

/* ─────────────────────────────────────────────────────────────────────
   3. pginfo — payment gateways
      GET https://csbe.staah.net/?RequestType=pginfo&JDRN=Y&PropertyId=...&Currency=NZD&Lang=EN
      VERIFIED: returns Credit Card (PgId=0, Iscollect=true)
   ───────────────────────────────────────────────────────────────────── */

export async function fetchResidencePaymentGateways(): Promise<PgInfoResponse> {
  const qs = new URLSearchParams({
    RequestType: "pginfo",
    JDRN: "Y",
    PropertyId: RESIDENCE_PROPERTY_ID_B64,
    Currency: "NZD",
    Lang: "EN",
  });

  const res = await fetch(`${CSBE_BASE}?${qs.toString()}`, {
    method: "GET",
    headers: { "X-Api-Key": CSBE_API_KEY, Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`pginfo (residence) failed: HTTP ${res.status}`);
  return res.json() as Promise<PgInfoResponse>;
}

/* ─────────────────────────────────────────────────────────────────────
   4. bookingverify — create the booking
      POST https://csbe.staah.net/?RequestType=bookingverify&JDRN=Y
   ───────────────────────────────────────────────────────────────────── */

export interface ResidenceGuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  arrivalTime?: string;
  specialRequests?: string;
  bookingForOther?: boolean;
  otherGuestName?: string;
  promoCode?: string;
}

export async function verifyResidenceBooking(
  params: ResidenceSearchParams,
  room: { roomId: string; rateId: string },
  guest: ResidenceGuestInfo
): Promise<BookingVerifyResponse> {
  const body = {
    PropertyId: RESIDENCE_PROPERTY_ID_B64,
    RoomID: room.roomId,
    RateId: room.rateId,
    CheckInDate: params.checkIn,
    CheckOutDate: params.checkOut,
    Adults: params.adults,
    Children: Array.from({ length: params.children }, () => 8),
    FirstName: guest.firstName,
    LastName: guest.lastName,
    Email: guest.email,
    Phone: `${guest.countryCode}${guest.phone}`,
    ArrivalTime: guest.arrivalTime ?? "",
    SpecialRequests: guest.specialRequests ?? "",
    PromoCode: guest.promoCode ?? "",
    JDRN: "Y",
  };

  const res = await fetch(`${CSBE_BASE}?RequestType=bookingverify&JDRN=Y`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`bookingverify (residence) failed: HTTP ${res.status}`);
  return res.json() as Promise<BookingVerifyResponse>;
}

/* ─────────────────────────────────────────────────────────────────────
   5. getpaymentlinkdetail — process credit card payment
      POST https://csbe.staah.net/securelink/?RequestType=getpaymentlinkdetail&JDRN=Y
   ───────────────────────────────────────────────────────────────────── */

async function encryptCCData(cardNumber: string, expiry: string, cvv: string): Promise<string> {
  const clean = cardNumber.replace(/\s/g, "");
  const data = `${clean}|${expiry}|${cvv}`;
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(CC_ENCRYPT_KEY);
  const ivBytes = encoder.encode(CC_ENCRYPT_IV);
  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyBytes, { name: "AES-CBC" }, false, ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBytes }, cryptoKey, encoder.encode(data)
  );
  const bytes = new Uint8Array(encrypted);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export async function processResidencePayment(
  bookingId: string,
  ccData: { cardNumber: string; expiry: string; cvv: string },
  guestInfo: { firstName: string; lastName: string; email: string; phone: string }
): Promise<PaymentLinkResponse> {
  const encrypted = await encryptCCData(ccData.cardNumber, ccData.expiry, ccData.cvv);
  const tokenId = generateVisitorId();

  const body = {
    action: "create_json",
    property_id: RESIDENCE_PROPERTY_ID_B64,
    pg_id: "0",
    cust_address: "",
    cust_city: "",
    cust_country: "NZ",
    cust_phone: guestInfo.phone,
    cust_postalcode: "",
    cust_state: "",
    dial_code: "",
    guest_extras_info: encrypted,
    token_id: tokenId,
    partner_id: 1,
    channel_booking_id: bookingId,
    request_type: "pay",
    ttl_date: "",
  };

  const res = await fetch(`${CSBE_BASE}securelink/?RequestType=getpaymentlinkdetail&JDRN=Y`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) throw new Error(`payment (residence) failed: HTTP ${res.status}`);
  return res.json() as Promise<PaymentLinkResponse>;
}

/* ─────────────────────────────────────────────────────────────────────
   6. betracker — analytics (fire-and-forget)
      POST https://maxtracker.staah.net/betracker?propertyId=NTg0Mjg=
      VERIFIED: propertyId=NTg0Mjg= from network capture (2026-08-26)
   ───────────────────────────────────────────────────────────────────── */

export function trackResidenceEvent(
  action: string,
  actionDetail?: string,
  extra?: Record<string, unknown>
): void {
  const visitorId = generateVisitorId();
  const now = new Date().toISOString();

  const payload = {
    propertyid: RESIDENCE_PROPERTY_ID_DEC,
    visite_id: visitorId,
    action,
    action_type: extra?.action_type ?? "100",
    action_detail: actionDetail ?? "",
    bestrate: "",
    booking_id: "",
    browser: "CHROME",
    checkin: extra?.checkin ?? "",
    checkout: extra?.checkout ?? "",
    country: "New Zealand",
    create_date: now,
    createdate: now.slice(0, 10),
    device: "DESKTOP",
    os: "WINDOWS",
    proc_detail: extra?.proc_detail ?? "",
    referal_url: typeof window !== "undefined" ? window.location.href : "",
    refreshcount: "0",
    source_site: "I",
    sub_action_type: "11",
    ...extra,
  };

  fetch(`${TRACKER_BASE}betracker?propertyId=${RESIDENCE_TRACKER_ID_B64}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => { /* analytics only — swallow errors */ });
}

/* ─────────────────────────────────────────────────────────────────────
   Formatting helpers (re-exported for convenience)
   ───────────────────────────────────────────────────────────────────── */

export function formatCurrency(amount: number, currency = "NZD"): string {
  try {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export function formatDateLong(d: string): string {
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ─────────────────────────────────────────────────────────────────────
   7. PropertyJson — live room config (name, description, images, amenities)
      GET https://www.swiftbook.io/PropertyJson/EN/58428.json
      Returns RoomId, RoomDisplayName, MaxGuest, RoomSize, GalleryImages,
              RoomDescription, RoomAmenities, Fees
   ───────────────────────────────────────────────────────────────────── */

/** One room entry from the Residence PropertyJson endpoint */
export interface ResidencePropertyRoom {
  RoomId: string;
  RoomName: string;
  RoomDisplayName: string;
  RoomDescription: string;
  MaxGuest: number;
  MaxAdult: number;
  MaxChildren: number;
  RoomSize: string;
  GalleryImages: string[];
  Images: string[];
  RoomAmenities: Record<string, string[]>;
  Fees: Array<{ Name: string; Value: number; ValueType: string; StayType: string }>;
}

interface ResidencePropertyJsonResponse {
  PropertyList?: Array<{
    RoomData?: ResidencePropertyRoom[];
  }>;
}

/**
 * Fetch live room metadata (names, descriptions, images, amenities) for the Residence property.
 *
 * GET https://www.swiftbook.io/PropertyJson/EN/58428.json
 * No auth required — public endpoint.
 */
export async function fetchResidencePropertyJson(): Promise<ResidencePropertyRoom[]> {
  const PROPERTY_JSON_BASE = "https://www.swiftbook.io/PropertyJson";
  const url = `${PROPERTY_JSON_BASE}/EN/${RESIDENCE_PROPERTY_ID_DEC}.json?tmp=${Date.now()}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`ResidencePropertyJson failed: HTTP ${res.status}`);

  const json = (await res.json()) as ResidencePropertyJsonResponse;
  return json.PropertyList?.[0]?.RoomData ?? [];
}
