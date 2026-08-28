import {
  MOTEL_PROPERTY,
  RESIDENCE_PROPERTY,
  SWIFTBOOK_ROOM_IDS,
  STAAH_SLUGS,
  getMotelSwiftBookUrl,
  getMotelBookPageUrl,
  getResidenceBookPageUrl,
  type BookingStayDates,
  type BookingPageOptions,
} from "./swiftbook/config";

export const SITE_NAME = "Brookside Motel";
export const SITE_URL = "https://brooksidemotel.co.nz";

export const PHONE_DISPLAY = "+64 3 930 0060";
export const PHONE_TEL = "tel:+6439300060";
export const EMAIL_RESERVATIONS = "reservations@brooksidemotel.co.nz";
export const EMAIL_STAY = "reservations@brooksidemotel.co.nz";
export const STREET = "12 Brookside Road, Rolleston 7614, Canterbury";
export const ADDRESS_LINES = ["12 Brookside Rd, Rolleston", "Canterbury 7614, New Zealand"];
export const MAPS_URL =
  "https://www.google.com/maps?vet=10CAAQoqAOahcKEwjQotSSssCWAxUAAAAAHQAAAAAQBg..i&sca_esv=a4ac375be92b09b0&mstk=AUtExfA4HfyDF6L8E1XF12XpSjVvmYWCDtOKUvOlbgPbHal8qaHdktAHK57OWZ59WN29sXGQ2gv7mEndGBItGZfWQrhEVKDRrFRkP6qJN2vsTW8hX8r2oIezDS6FT1RARP-nqzMh8HkZmzerIfWP7LGy6tKTX50xw2mk6WTCcbta5wNE4xYPc7Bp7qQexqPbm7LukM4c&pvq=Cg0vZy8xMXh6NF96ajNiEhoQARoHCOoPEAkYBigBMAI4CpABAaABAKgBAYABAZABAQ&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x6d3203007b582e1b:0x78adb1054c7e9e22";

/* ─── Motel Booking Configuration ─── */
export const BOOKING_URL = MOTEL_PROPERTY.bookingUrl;
export { SWIFTBOOK_ROOM_IDS, STAAH_SLUGS };
export type StayDates = BookingStayDates;

export function bookingEngineUrl(roomId?: string, stay?: StayDates): string {
  return getMotelSwiftBookUrl(roomId, stay);
}

export function bookPageUrl(opts: BookingPageOptions = {}): string {
  return getMotelBookPageUrl(opts);
}

export interface HeaderLink {
  label: string;
  href: string;
}

export const HEADER_LINKS: HeaderLink[] = [
  { label: "Motel Rooms", href: "/motel-rooms" },
  { label: "Brookside Residence", href: "/brookside-residence" },
  { label: "Amenities", href: "/amenities" },
  { label: "Local Guide", href: "/local-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const IMG_BASE = "/images/";

/* ─── Brookside Residence Configuration ─── */
export const RESIDENCE_PROPERTY_ID_B64 = RESIDENCE_PROPERTY.idB64;
export const RESIDENCE_PROPERTY_ID_DEC = RESIDENCE_PROPERTY.idDec;
export const RESIDENCE_TRACKER_ID_B64 = RESIDENCE_PROPERTY.trackerB64;
export const RESIDENCE_RATE_PLAN_ID = RESIDENCE_PROPERTY.ratePlanId;
export const RESIDENCE_ROOM_IDS = RESIDENCE_PROPERTY.roomIds;
export const RESIDENCE_BOOKING_URL = RESIDENCE_PROPERTY.bookingUrl;

export function residenceBookPageUrl(opts: BookingPageOptions = {}): string {
  return getResidenceBookPageUrl(opts);
}
