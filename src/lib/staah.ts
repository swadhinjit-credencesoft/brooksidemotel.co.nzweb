/**
 * STAAH Common Booking Engine (CSBE) client.
 *
 * Same endpoints that power www.swiftbook.io/inst — called directly from
 * the guest's browser. CORS is permissive (`Access-Control-Allow-Origin: *`)
 * and authenticated with the public visitor API key that ships with the
 * booking widget.
 */

const CSBE_BASE = "https://csbe.staah.net/";
const PROPERTY_ID = "223NTUD2eB2ox9GXf4NTU=";
export const CSBE_API_KEY = "cPPq1uh0xD6BpfDFpGWEx9fxnDOUA3Y25RdigC0X";

/* ------------------------------------------------------------------ */
/*  Types — bedataguest (stay-specific availability + rates)          */
/* ------------------------------------------------------------------ */

export interface BdgtRateDay {
  RateBeforeTax?: string;
  RateAfterTax?: string;
  Tax?: unknown[];
  Fees?: unknown[];
  Savings?: string;
  SpDesc?: string;
}

export interface BdgtCancellationPolicy {
  ID?: number;
  Description?: string;
  Type?: string;
}

export interface BdgtRatePlan {
  RateId?: string;
  CancellationPolicy?: BdgtCancellationPolicy;
  Rates?: {
    Dates?: Record<string, BdgtRateDay>;
    Request?: { Adult?: number; Children?: unknown[] };
  }[];
}

export interface BdgtRoom {
  RoomId: string;
  Roommatch?: string;
  MinInventory?: number;
  RestrictionTitle?: string;
  Inventory?: Record<string, number>;
  RatePlans?: BdgtRatePlan[];
  AllowRequestBooking?: boolean;
}

export interface BdgtProduct {
  PropertyId?: string;
  Currency?: string;
  Rooms?: BdgtRoom[];
  AddonsIds?: string;
  AddonRates?: Record<string, unknown>;
}

export interface BdgtResponse {
  Product?: BdgtProduct[];
  TrackingID?: string;
}

/* ------------------------------------------------------------------ */
/*  Types — berate (calendar rates + inventory)                       */
/* ------------------------------------------------------------------ */

export interface BerateDay {
  Inventory?: number;
  Rate?: number;
  ClosedToArrival?: string;
  ClosedToDeparture?: string;
  MinimumStay?: number;
  MaximumStay?: number;
}

export interface BerateProperty {
  PropertyId?: string;
  Currency?: string;
  DayRate?: Record<string, BerateDay>;
}

export interface BerateResponse {
  PropertyList?: BerateProperty[];
  TrackingID?: string;
}

/* ------------------------------------------------------------------ */
/*  Normalised room quote (what the UI consumes)                      */
/* ------------------------------------------------------------------ */

export interface RoomQuote {
  roomId: string;
  available: boolean;
  restrictionTitle: string;
  minInventory: number;
  currency: string;
  total: number;
  minNightly: number | null;
  nightlyRates: number[];
  nights: number;
  cancellationDesc: string;
}

/* ------------------------------------------------------------------ */
/*  Stay query                                                        */
/* ------------------------------------------------------------------ */

export interface StayQuery {
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenAges: number[];
}

/* ------------------------------------------------------------------ */
/*  Fetch helpers                                                     */
/* ------------------------------------------------------------------ */

function nightsBetween(a: string, b: string): number {
  return Math.max(0, Math.round((new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime()) / 86_400_000));
}

export async function fetchStayAvailability(q: StayQuery, timeoutMs = 12_000): Promise<RoomQuote[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${CSBE_BASE}?RequestType=bedataguest&JDRN=Y`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": CSBE_API_KEY },
      body: JSON.stringify({
        Product: "no",
        PropertyId: PROPERTY_ID,
        CheckInDate: q.checkIn,
        CheckOutDate: q.checkOut,
        JDRN: "Y",
        Lang: "EN",
        Rooms: [{ Adult: q.adults, Children: q.childrenAges }],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`CSBE ${res.status}`);
    const json = (await res.json()) as BdgtResponse;
    const product = json.Product?.[0];
    const currency = product?.Currency ?? "NZD";
    const nights = nightsBetween(q.checkIn, q.checkOut);

    return (product?.Rooms ?? []).map((r) => {
      const plan = r.RatePlans?.[0];
      const days = plan?.Rates?.[0]?.Dates ?? {};
      const nightly = Object.values(days)
        .map((d) => Number(d.RateAfterTax))
        .filter((n) => Number.isFinite(n));
      const available = r.Roommatch === "fullmatch" && (r.MinInventory ?? 0) > 0 && nightly.length > 0;

      return {
        roomId: r.RoomId,
        available,
        restrictionTitle: r.RestrictionTitle ?? "",
        minInventory: r.MinInventory ?? 0,
        currency,
        total: nightly.reduce((s, n) => s + n, 0),
        minNightly: nightly.length ? Math.min(...nightly) : null,
        nightlyRates: nightly,
        nights,
        cancellationDesc: plan?.CancellationPolicy?.Description ?? "",
      };
    });
  } finally {
    clearTimeout(timer);
  }
}

export function formatStayPrice(amount: number, currency: string): string {
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
