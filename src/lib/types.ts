import type { ReactNode } from "react";

export type ContourVariant = "a" | "b" | "c";

export type IconName =
  | "guests"
  | "bed"
  | "bedbar"
  | "washer"
  | "building"
  | "check"
  | "tv"
  | "bath"
  | "bathtaps"
  | "coffee"
  | "bbq"
  | "spa"
  | "door"
  | "corner"
  | "accessible"
  | "wifi"
  | "car"
  | "sun"
  | "kitchen"
  | "bolt"
  | "toiletries"
  | "shield"
  | "clock"
  | "refresh"
  | "calendar"
  | "arrow";

export interface RoomImage {
  src: string;
  alt: string;
  label: string;
  sub: string;
}

export interface RoomSpec {
  icon: IconName;
  text: string;
}

export interface RoomData {
  id: string;
  image: RoomImage;
  flag?: "accessible";
  feature?: boolean;
  hideFromGrid?: boolean;
  summary?: string;
  name: string;
  liveName: ReactNode;
  description: ReactNode;
  descriptionExtra?: ReactNode;
  specs: RoomSpec[];
  highlights: string[];
  amenities: RoomSpec[];
  cta: string;
  detailsFirst?: boolean;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface FaqItem {
  q: string;
  a: ReactNode;
  /** Plain text version of the answer, used for JSON-LD structured data */
  aText: string;
  open?: boolean;
}

export interface FaqCategory {
  id: string;
  number: number;
  title: string;
  items: FaqItem[];
}
