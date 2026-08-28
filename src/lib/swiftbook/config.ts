/**
 * STAAH SwiftBook / CSBE Booking Engine Configuration.
 * Centralized Single Source of Truth for all Property IDs, Room IDs, API endpoints, and credentials.
 */

/* =================================================================
   1. API ENDPOINTS & CREDENTIALS
   ================================================================= */

export const CSBE_BASE = "https://csbe.staah.net/";
export const TRACKER_BASE = "https://maxtracker.staah.net/";
export const PROPERTY_JSON_BASE = "https://www.swiftbook.io/PropertyJson";

export const CSBE_API_KEY =
  process.env.NEXT_PUBLIC_STAAH_API_KEY ?? "cPPq1uh0xD6BpfDFpGWEx9fxnDOUA3Y25RdigC0X";

export const CC_ENCRYPT_IV = "Wuwr6ka?2uW7eCEc$29K&1Ia*px0LD?c";
export const CC_ENCRYPT_KEY = "V-a+Jg?pTw4XuJ^&";


/* =================================================================
   2. MOTEL PROPERTY CONFIGURATION (STAAH Property 55855)
   ================================================================= */

export const MOTEL_PROPERTY = {
  idB64: process.env.NEXT_PUBLIC_STAAH_PROPERTY_ID ?? "223NTUD2eB2ox9GXf4NTU=",
  idDec: process.env.NEXT_PUBLIC_STAAH_PROPERTY_ID_DEC ?? "55855",
  name: "Brookside Motel",
  bookingUrl: "https://www.swiftbook.io/inst/#home?propertyId=223NTUD2eB2ox9GXf4NTU=&JDRN=Y",
  roomIds: {
    "superior-outdoor": "225755",
    "superior-interconnected": "225756",
    "deluxe-two-doubles": "225757",
    "deluxe-top-floor": "225758",
    "accessible-superking": "225759",
    "deluxe-one-double": "232836",
  },
} as const;

/* =================================================================
   3. RESIDENCE PROPERTY CONFIGURATION (STAAH Property 58428)
   ================================================================= */

export const RESIDENCE_PROPERTY = {
  idB64: "622NTgOqOT6TvN8eZciKNab5xydWTYGd3WNTg0Mjg=",
  idDec: "58428",
  trackerB64: "NTg0Mjg=",
  ratePlanId: "1513400000000001",
  name: "The Brookside Residence",
  bookingUrl: "https://www.swiftbook.io/inst/#home?propertyId=622NTgOqOT6TvN8eZciKNab5xydWTYGd3WNTg0Mjg=&JDRN=Y",
  roomIds: {
    primary: "253372",
    secondary: "253371",
  },
} as const;

/* =================================================================
   4. ALL ROOM IDS REGISTRY
   ================================================================= */

export const SWIFTBOOK_ROOM_IDS: Record<string, string> = {
  ...MOTEL_PROPERTY.roomIds,
  "brookside-residence": RESIDENCE_PROPERTY.roomIds.primary,
  "brookside-residence-secondary": RESIDENCE_PROPERTY.roomIds.secondary,
};

/** Reverse mapping: STAAH RoomId (e.g. "225755") → internal slug (e.g. "superior-outdoor") */
export const STAAH_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(SWIFTBOOK_ROOM_IDS).map(([slug, id]) => [id, slug]),
);

/* =================================================================
   5. BOOKING URL GENERATORS
   ================================================================= */

export interface BookingStayDates {
  checkIn?: string;
  checkOut?: string;
}

export interface BookingPageOptions {
  room?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
}

/** Generate deep-link to Motel STAAH SwiftBook widget */
export function getMotelSwiftBookUrl(roomId?: string, stay?: BookingStayDates): string {
  const base = MOTEL_PROPERTY.bookingUrl.replace(/&JDRN=Y$/, "");
  let url = roomId ? `${base}&RoomID=${encodeURIComponent(roomId)}&JDRN=Y` : MOTEL_PROPERTY.bookingUrl;
  if (stay?.checkIn) url += `&checkIn=${encodeURIComponent(stay.checkIn)}`;
  if (stay?.checkOut) url += `&checkOut=${encodeURIComponent(stay.checkOut)}`;
  return url;
}

/** Generate internal URL to /book route */
export function getMotelBookPageUrl(opts: BookingPageOptions = {}): string {
  const p = new URLSearchParams();
  if (opts.room) p.set("room", opts.room);
  if (opts.checkIn) p.set("checkIn", opts.checkIn);
  if (opts.checkOut) p.set("checkOut", opts.checkOut);
  if (opts.adults) p.set("adults", String(opts.adults));
  if (opts.children) p.set("children", String(opts.children));
  const qs = p.toString();
  return qs ? `/book?${qs}` : "/book";
}

/** Generate internal URL to /book-residence route */
export function getResidenceBookPageUrl(opts: BookingPageOptions = {}): string {
  const p = new URLSearchParams();
  if (opts.checkIn) p.set("checkIn", opts.checkIn);
  if (opts.checkOut) p.set("checkOut", opts.checkOut);
  if (opts.adults) p.set("adults", String(opts.adults));
  if (opts.children) p.set("children", String(opts.children));
  const qs = p.toString();
  return qs ? `/book-residence?${qs}` : "/book-residence";
}
