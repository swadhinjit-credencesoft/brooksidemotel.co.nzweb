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
  name: string;
  liveName: ReactNode;
  description: ReactNode;
  specs: RoomSpec[];
  highlights: string[];
  cta: string;
  detailsFirst?: boolean;
}

export interface FaqItem {
  q: string;
  a: ReactNode;
  open?: boolean;
}

export interface FaqCategory {
  id: string;
  number: number;
  title: string;
  items: FaqItem[];
}
