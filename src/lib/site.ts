export const SITE_NAME = "Brookside Motel";

export const SITE_URL = "https://brooksidemotel.co.nz";

export const PHONE_DISPLAY = "+64 3 930 0060";
export const PHONE_TEL = "tel:+6439300060";
export const EMAIL_RESERVATIONS = "reservations@brooksidemotel.co.nz";
export const EMAIL_STAY = "reservations@brooksidemotel.co.nz";
export const STREET = "12 Brookside Road, Rolleston 7614, Canterbury";
export const ADDRESS_LINES = ["12 Brookside Rd, Rolleston", "Canterbury 7614, New Zealand"];

export const BOOKING_URL =
  "https://www.swiftbook.io/inst/#home?propertyId=223NTUD2eB2ox9GXf4NTU=&JDRN=Y";

export const SWIFTBOOK_ROOM_IDS: Record<string, string> = {
  "superior-outdoor": "225755",
  "superior-interconnected": "225756",
  "deluxe-two-doubles": "225757",
  "deluxe-top-floor": "225758",
  "accessible-superking": "225759",
  "deluxe-one-double": "232836",
  "brookside-residence": "253372",
  "brookside-residence-secondary": "253371",
};

/** Reverse map: STAAH numeric RoomId → our slug. */
export const STAAH_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(SWIFTBOOK_ROOM_IDS).map(([slug, id]) => [id, slug]),
);

export interface StayDates {
  /** YYYY-MM-DD */
  checkIn?: string;
  /** YYYY-MM-DD */
  checkOut?: string;
}

/**
 * Deep link into the STAAH SwiftBook engine.
 * - roomId → pre-selects that room type (SWIFTBOOK_ROOM_IDS).
 * - stay   → prefills check-in/check-out (param names match the engine's
 *            own search-button URL builder: lowercase checkIn/checkOut,
 *            yyyy-MM-dd). Occupancy is finalised inside the engine.
 */
export function bookingEngineUrl(roomId?: string, stay?: StayDates): string {
  const base = BOOKING_URL.replace(/&JDRN=Y$/, "");
  let url = roomId ? `${base}&RoomID=${encodeURIComponent(roomId)}&JDRN=Y` : BOOKING_URL;
  if (stay?.checkIn) url += `&checkIn=${encodeURIComponent(stay.checkIn)}`;
  if (stay?.checkOut) url += `&checkOut=${encodeURIComponent(stay.checkOut)}`;
  return url;
}

/**
 * Internal booking page URL with params.
 * The /book page runs a custom multi-step booking engine.
 */
export function bookPageUrl(opts: { room?: string; checkIn?: string; checkOut?: string; adults?: number; children?: number } = {}): string {
  const p = new URLSearchParams();
  if (opts.room) p.set("room", opts.room);
  if (opts.checkIn) p.set("checkIn", opts.checkIn);
  if (opts.checkOut) p.set("checkOut", opts.checkOut);
  if (opts.adults) p.set("adults", String(opts.adults));
  if (opts.children) p.set("children", String(opts.children));
  const qs = p.toString();
  return qs ? `/book?${qs}` : "/book";
}

export interface NavItem {
  label: string;
  href: string;
}

export const HEADER_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Motel Rooms", href: "/motel-rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Brookside Residence", href: "/brookside-residence" },
   { label: "Local Guide", href: "/local-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const IMG_BASE = "/images/";

/* ─── Brookside Residence — separate STAAH property ─── */

/**
 * Residence Property ID (Base64-encoded, from CSBE network capture).
 * Used in: bedataguest, ratecart, pginfo, bookingverify requests.
 */
export const RESIDENCE_PROPERTY_ID_B64 = "622NTgOqOT6TvN8eZciKNab5xydWTYGd3WNTg0Mjg=";

/**
 * Residence Property ID (decimal string, from CSBE response PropertyId field).
 * Used in: ratecart response keying, tracker calls.
 */
export const RESIDENCE_PROPERTY_ID_DEC = "58428";

/**
 * Tracker property ID (base64 of decimal ID "58428").
 * From network capture: maxtracker.staah.net/betracker?propertyId=NTg0Mjg=
 */
export const RESIDENCE_TRACKER_ID_B64 = "NTg0Mjg=";

/**
 * Residence room IDs from CSBE bedataguest response.
 * These are the only two rooms on this property.
 */
export const RESIDENCE_ROOM_IDS = {
  /** Primary residence room — RoomId 253372 from API */
  primary: "253372",
  /** Secondary residence room — RoomId 253371 from API */
  secondary: "253371",
} as const;

/** Rate Plan ID for the Residence (from RatePlans[0].RateId in bedataguest) */
export const RESIDENCE_RATE_PLAN_ID = "1513400000000001";

/** Direct booking URL for the Residence via SwiftBook */
export const RESIDENCE_BOOKING_URL =
  `https://www.swiftbook.io/inst/#home?propertyId=${RESIDENCE_PROPERTY_ID_B64}&JDRN=Y`;

/** Internal residence booking page URL */
export function residenceBookPageUrl(opts: { checkIn?: string; checkOut?: string; adults?: number; children?: number } = {}): string {
  const p = new URLSearchParams();
  if (opts.checkIn) p.set("checkIn", opts.checkIn);
  if (opts.checkOut) p.set("checkOut", opts.checkOut);
  if (opts.adults) p.set("adults", String(opts.adults));
  if (opts.children) p.set("children", String(opts.children));
  const qs = p.toString();
  return qs ? `/book-residence?${qs}` : "/book-residence";
}
