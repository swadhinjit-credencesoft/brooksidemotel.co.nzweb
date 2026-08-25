/**
 * SwiftBook / CSBE API client — browser-side.
 *
 * All CSBE APIs have permissive CORS (`Access-Control-Allow-Origin: *`)
 * and use a public visitor API key. No server-side proxy needed.
 *
 * Verified from live traffic capture (2026-08-25):
 *   1. bedataguest — room availability
 *   2. ratecart    — detailed rate for selected room
 *   3. pginfo      — payment gateway info
 *   4. bettracker  — analytics (fire-and-forget)
 */

import {
  type BdgtResponse,
  type RateCartResponse,
  type PgInfoResponse,
  type BerateResponse,
  type BeWidgetResponse,
  type BookingVerifyRequest,
  type BookingVerifyResponse,
  type PaymentLinkRequest,
  type PaymentLinkResponse,
  type RoomQuote,
  type RateDetail,
  type BookingSearchParams,
  type PropertyJson,
  type ManageBookingRequest,
  type ManageBookingResponse,
  type TrackerPayload,
  PROPERTY_ID_B64,
  PROPERTY_ID_DEC,
  CSBE_API_KEY,
  CSBE_BASE,
  TRACKER_BASE,
  PROPERTY_JSON_BASE,
  CC_ENCRYPT_IV,
  CC_ENCRYPT_KEY,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TIMEOUT_MS = 15_000;

const COMMON_HEADERS: Record<string, string> = {
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

/** Format date as DD-MM-YYYY (SwiftBook tracker format) */
function formatDateTracker(d: string): string {
  const [y, m, day] = d.split("-");
  return `${day}-${m}-${y}`;
}

/** Generate a random visitor ID for tracking */
function generateVisitorId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 18; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  1. bedataguest — availability                                      */
/* ------------------------------------------------------------------ */

/**
 * Fetch room availability for the given stay dates.
 *
 * POST https://csbe.staah.net/?RequestType=bedataguest&JDRN=Y
 * VERIFIED: 2026-08-25 — returns live room availability.
 *
 * @param specificRoomId — optional: filter to a single room ID
 */
export async function fetchAvailability(
  params: BookingSearchParams,
  specificRoomId?: string
): Promise<{ quotes: RoomQuote[]; currency: string }> {
  const body: Record<string, unknown> = {
    Product: "no",
    PropertyId: PROPERTY_ID_B64,
    CheckInDate: params.checkIn,
    CheckOutDate: params.checkOut,
    Country: "IN",
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
  if (specificRoomId) body.RoomID = specificRoomId;

  const res = await fetch(`${CSBE_BASE}?RequestType=bedataguest&JDRN=Y`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...COMMON_HEADERS,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`bedataguest failed: HTTP ${res.status}`);
  const json = (await res.json()) as BdgtResponse;

  const product = json.Product?.[0];
  const currency = product?.Currency ?? "NZD";
  const nights = nightsBetween(params.checkIn, params.checkOut);

  // Track which rooms have inline rates vs need ratecart fetch
  const needsRatecart: { roomId: string; rateId: string }[] = [];

  const quotes: RoomQuote[] = (product?.Rooms ?? [])
    .map((r) => {
      const plan = r.RatePlans?.[0];

      // Parse rates from bedataguest response
      // Rates are nested inside RatePlans[0].Rates[0].Dates (NOT room-level Rates)
      const rateEntry = plan?.Rates?.[0];
      const rateDates = rateEntry?.Dates ?? {};
      const nightlyRates: { date: string; beforeTax: number; afterTax: number }[] = [];
      let total = 0;
      for (const [date, rd] of Object.entries(rateDates)) {
        const afterTax = parseFloat(rd.RateAfterTax ?? "0");
        const beforeTax = parseFloat(rd.RateBeforeTax ?? "0");
        total += afterTax;
        nightlyRates.push({ date, beforeTax, afterTax });
      }
      nightlyRates.sort((a, b) => a.date.localeCompare(b.date));

      // Available = room has inventory match (fullmatch) AND stock
      const available =
        r.Roommatch === "fullmatch" &&
        (r.MinInventory ?? 0) > 0;

      const hasInlineRates = nightlyRates.length > 0;
      const rateId = plan?.RateId ?? "";

      // Only call ratecart as fallback when bedataguest returns no rates
      if (available && !hasInlineRates && rateId) {
        needsRatecart.push({ roomId: r.RoomId, rateId });
      }

      return {
        roomId: r.RoomId,
        available,
        restrictionTitle: r.RestrictionTitle ?? "",
        minInventory: r.MinInventory ?? 0,
        currency,
        total,
        minNightly: nightlyRates.length > 0 ? Math.min(...nightlyRates.map(n => n.afterTax)) : null,
        nightlyRates,
        nights,
        cancellationDesc: plan?.CancellationPolicy?.Description ?? "",
        rateId,
      };
    });

  // For rooms missing inline rates, fetch via ratecart in parallel
  if (needsRatecart.length > 0) {
    const rateResults = await Promise.allSettled(
      needsRatecart.map(async ({ roomId, rateId }) => {
        const detail = await fetchRateCart(params, roomId, rateId);
        return { roomId, detail };
      })
    );

    for (const result of rateResults) {
      if (result.status === "rejected") {
        console.warn("[ratecart] fetch failed:", result.reason?.message ?? result.reason);
        continue;
      }
      const { roomId, detail } = result.value;
      const quote = quotes.find(q => q.roomId === roomId);
      if (!quote) continue;

      // Merge ratecart data into the quote
      quote.total = detail.totalAmount;
      quote.currency = detail.currency;
      quote.cancellationDesc = detail.cancellationDesc || quote.cancellationDesc;

      // Build nightlyRates from ratecart perDay
      const nightlyRates: { date: string; beforeTax: number; afterTax: number }[] = [];
      for (const [date, day] of Object.entries(detail.perDay)) {
        nightlyRates.push({ date, beforeTax: day.beforeTax, afterTax: day.afterTax });
      }
      nightlyRates.sort((a, b) => a.date.localeCompare(b.date));
      quote.nightlyRates = nightlyRates;
      quote.minNightly = nightlyRates.length > 0 ? Math.min(...nightlyRates.map(n => n.afterTax)) : null;
    }
  }

  console.log("[bedataguest] quotes:", quotes.map(q => ({
    id: q.roomId,
    total: q.total,
    nights: q.nightlyRates.length,
    nightly: q.minNightly,
  })));

  return { quotes, currency };
}

/* ------------------------------------------------------------------ */
/*  2. ratecart — detailed rate for selected room                       */
/* ------------------------------------------------------------------ */

/**
 * Fetch detailed rate info for a selected room (deposit, cancellation, per-day).
 *
 * POST https://csbe.staah.net/?RequestType=ratecart&JDRN=Y
 * VERIFIED: 2026-08-25 — returns full rate breakdown.
 *
 * The ratecart response is keyed: Product[propertyDecimalId][uuid] = RateCartEntry
 */
export async function fetchRateCart(
  params: BookingSearchParams,
  roomId: string,
  rateId: string
): Promise<RateDetail> {
  const body = {
    Product: "no",
    PropertyId: PROPERTY_ID_B64,
    CheckInDate: params.checkIn,
    CheckOutDate: params.checkOut,
    Country: "IN",
    DeviceType: "desktop",
    RoomID: roomId,
    RateId: rateId,
    Rooms: [
      {
        Adult: params.adults,
        Children: Array.from({ length: params.children }, () => 8),
      },
    ],
    JDRN: "Y",
    Lang: "EN",
  };

  const res = await fetch(`${CSBE_BASE}?RequestType=ratecart&JDRN=Y`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...COMMON_HEADERS,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`ratecart failed: HTTP ${res.status}`);
  const json = (await res.json()) as RateCartResponse;

  // Product is { "55855": { "<uuid>": { Currency, Rates, ... } } }
  const propBlock = json.Product?.[PROPERTY_ID_DEC];
  if (!propBlock) {
    console.warn("[ratecart] response:", JSON.stringify(json).slice(0, 500));
    throw new Error("ratecart: no product data returned");
  }

  // Get the first (and only) UUID entry
  const uuid = Object.keys(propBlock)[0];
  if (!uuid) {
    throw new Error("ratecart: no rate entry found");
  }

  const entry = propBlock[uuid];
  const days = entry.Rates ?? {};
  const nights = nightsBetween(params.checkIn, params.checkOut);

  // Build per-day breakdown
  const perDay: RateDetail["perDay"] = {};
  let totalAfterTax = 0;
  let totalBeforeTax = 0;

  for (const [date, dayRate] of Object.entries(days)) {
    const afterTax = Number(dayRate.RateAfterTax) || 0;
    const beforeTax = Number(dayRate.RateBeforeTax) || 0;
    const savings = Number(dayRate.Savings) || 0;
    perDay[date] = { beforeTax, afterTax, savings };
    totalAfterTax += afterTax;
    totalBeforeTax += beforeTax;
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

/* ------------------------------------------------------------------ */
/*  3. pginfo — payment gateway info                                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch available payment gateways.
 *
 * GET https://csbe.staah.net/?RequestType=pginfo&JDRN=Y&PropertyId=...&Currency=NZD&Lang=EN
 * VERIFIED: 2026-08-25 — returns payment method list.
 */
export async function fetchPaymentGateways(): Promise<PgInfoResponse> {
  const params = new URLSearchParams({
    RequestType: "pginfo",
    JDRN: "Y",
    PropertyId: PROPERTY_ID_B64,
    Currency: "NZD",
    Lang: "EN",
  });

  const res = await fetch(`${CSBE_BASE}?${params.toString()}`, {
    method: "GET",
    headers: COMMON_HEADERS,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`pginfo failed: HTTP ${res.status}`);
  return res.json() as Promise<PgInfoResponse>;
}

/* ------------------------------------------------------------------ */
/*  4. berate — calendar inventory (GET)                                */
/* ------------------------------------------------------------------ */

/**
 * Fetch per-day inventory for a date range (for calendar UI).
 *
 * GET https://csbe.staah.net/?RequestType=berate&PropertyId=...
 *     &Product=no&FromDate=...&ToDate=...&JDRN=Y
 *     &RoomID=225755,225756,225757,225758,225759&ignoreRates=true
 *
 * VERIFIED: 2026-08-25 — returns inventory per day per property.
 */
export async function fetchCalendarInventory(
  fromDate: string,
  toDate: string
): Promise<BerateResponse> {
  const params = new URLSearchParams({
    RequestType: "berate",
    PropertyId: PROPERTY_ID_B64,
    Product: "no",
    FromDate: fromDate,
    ToDate: toDate,
    JDRN: "Y",
    RoomID: "225755,225756,225757,225758,225759,232836",
    ignoreRates: "true",
  });

  const res = await fetch(`${CSBE_BASE}?${params.toString()}`, {
    method: "GET",
    headers: COMMON_HEADERS,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`berate failed: HTTP ${res.status}`);
  return res.json() as Promise<BerateResponse>;
}

/* ------------------------------------------------------------------ */
/*  5. bewidget — widget/property config (GET)                          */
/* ------------------------------------------------------------------ */

/**
 * Fetch widget configuration (official room names, limits, theme).
 *
 * GET https://csbe.staah.net/bewidget/?Action=fetch
 *     &PropertyId=223NTUD2eB2ox9GXf4NTU=
 *     &ScriptId=223NTUD2eB2ox9GXf4NTU=
 *
 * VERIFIED: 2026-08-25 — returns room names, max guests, theme, etc.
 */
export async function fetchWidgetConfig(): Promise<BeWidgetResponse> {
  const params = new URLSearchParams({
    Action: "fetch",
    PropertyId: PROPERTY_ID_B64,
    ScriptId: PROPERTY_ID_B64,
  });

  const res = await fetch(`${CSBE_BASE}bewidget/?${params.toString()}`, {
    method: "GET",
    headers: COMMON_HEADERS,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`bewidget failed: HTTP ${res.status}`);
  return res.json() as Promise<BeWidgetResponse>;
}

/* ------------------------------------------------------------------ */
/*  4. bettracker — analytics (fire-and-forget)                         */
/* ------------------------------------------------------------------ */

/**
 * Fire a tracking event. Non-blocking — errors are silently swallowed.
 *
 * POST https://maxtracker.staah.net/betracker?propertyId=NTU4NTU=
 * VERIFIED: 2026-08-25 — analytics only, not required for booking.
 */
export function trackEvent(
  action: string,
  actionDetail?: string,
  extra?: Partial<TrackerPayload>
): void {
  const visitorId = generateVisitorId();
  const now = new Date().toISOString();

  const payload: TrackerPayload = {
    propertyid: PROPERTY_ID_DEC,
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

  // Fire and forget — don't await
  fetch(`${TRACKER_BASE}betracker?propertyId=${btoa(PROPERTY_ID_DEC)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* intentionally swallowed — analytics only */
  });
}

/* ------------------------------------------------------------------ */
/*  5. Property JSON — static config                                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch property configuration.
 *
 * GET https://www.swiftbook.io/PropertyJson/EN/55855.json
 * VERIFIED: 2026-08-25 — returns room definitions + policies.
 */
export async function fetchPropertyJson(): Promise<PropertyJson> {
  const url = `${PROPERTY_JSON_BASE}/EN/${PROPERTY_ID_DEC}.json?tmp=${Date.now()}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`PropertyJson failed: HTTP ${res.status}`);
  return res.json() as Promise<PropertyJson>;
}

/* ------------------------------------------------------------------ */
/*  5. CC encryption — AES-256-CBC                                      */
/* ------------------------------------------------------------------ */

/**
 * Encrypt credit card data using AES-256-CBC.
 * VERIFIED: Keys from SwiftBook widget (encryptCCData function).
 *
 * The encrypted format is: base64(AES_CBC encrypt(json, key, iv))
 * Card data format: "4111111111111111|12/25|123"
 */
export async function encryptCCData(
  cardNumber: string,
  expiry: string,
  cvv: string
): Promise<string> {
  const clean = cardNumber.replace(/\s/g, "");
  const data = `${clean}|${expiry}|${cvv}`;

  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(CC_ENCRYPT_KEY);
  const ivBytes = encoder.encode(CC_ENCRYPT_IV);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    encoder.encode(data)
  );

  // Convert to base64
  const bytes = new Uint8Array(encrypted);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/* ------------------------------------------------------------------ */
/*  6. bookingverify — create booking                                   */
/* ------------------------------------------------------------------ */

/**
 * Create a booking via the CSBE API.
 *
 * POST https://csbe.staah.net/?RequestType=bookingverify&JDRN=Y
 * VERIFIED: Discovered from SwiftBook widget source.
 */
export async function verifyBooking(
  params: BookingSearchParams,
  room: { roomId: string; rateId: string },
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    arrivalTime?: string;
    requests?: string;
  }
): Promise<BookingVerifyResponse> {
  const body: BookingVerifyRequest = {
    PropertyId: PROPERTY_ID_B64,
    RoomID: room.roomId,
    RateId: room.rateId,
    CheckInDate: params.checkIn,
    CheckOutDate: params.checkOut,
    Adults: params.adults,
    Children: Array.from({ length: params.children }, () => 8),
    FirstName: guest.firstName,
    LastName: guest.lastName,
    Email: guest.email,
    Phone: guest.phone,
    ArrivalTime: guest.arrivalTime ?? "",
    SpecialRequests: guest.requests ?? "",
    JDRN: "Y",
  };

  const res = await fetch(`${CSBE_BASE}?RequestType=bookingverify&JDRN=Y`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...COMMON_HEADERS,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`bookingverify failed: HTTP ${res.status}`);
  return res.json() as Promise<BookingVerifyResponse>;
}

/* ------------------------------------------------------------------ */
/*  7. getpaymentlinkdetail — process payment                           */
/* ------------------------------------------------------------------ */

/**
 * Process payment via encrypted CC data.
 *
 * POST https://csbe.staah.net/securelink/?RequestType=getpaymentlinkdetail&JDRN=Y
 * VERIFIED: Discovered from SwiftBook widget source (SecurePayment component).
 *
 * Returns a URL — either a confirmation page or a hosted payment page.
 */
export async function processPayment(
  bookingId: string,
  ccData: {
    cardNumber: string;
    expiry: string; // MM/YY
    cvv: string;
  },
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
): Promise<PaymentLinkResponse> {
  const encrypted = await encryptCCData(ccData.cardNumber, ccData.expiry, ccData.cvv);
  const tokenId = generateVisitorId();

  const body: PaymentLinkRequest = {
    action: "create_json",
    property_id: PROPERTY_ID_B64,
    pg_id: "0", // Credit Card
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

  const res = await fetch(
    `${CSBE_BASE}securelink/?RequestType=getpaymentlinkdetail&JDRN=Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...COMMON_HEADERS,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    }
  );

  if (!res.ok) throw new Error(`payment failed: HTTP ${res.status}`);
  return res.json() as Promise<PaymentLinkResponse>;
}

/**
 * Look up existing booking by confirmation + email.
 * TODO: REQUIRE OFFICIAL SWIFTBOOK API INFORMATION
 */
export async function manageBooking(
  confirmationNumber: string,
  email: string
): Promise<ManageBookingResponse> {
  const body: ManageBookingRequest = {
    PropertyId: PROPERTY_ID_B64,
    ConfirmationNumber: confirmationNumber,
    Email: email,
    DeviceType: "desktop",
    Lang: "EN",
  };

  const res = await fetch("https://ckswidget.staah.net/manageMyBooking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`manageBooking failed: HTTP ${res.status}`);
  return res.json() as Promise<ManageBookingResponse>;
}

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

export function formatCurrency(amount: number, currency: string): string {
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

export function addDays(dateISO: string, days: number): string {
  const d = new Date(`${dateISO}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
