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
};

export function bookingEngineUrl(roomId?: string): string {
  if (!roomId) return BOOKING_URL;
  return `${BOOKING_URL.replace(/&JDRN=Y$/, "")}&RoomID=${encodeURIComponent(roomId)}&JDRN=Y`;
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
