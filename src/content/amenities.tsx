import type { IconName } from "@/lib/types";

export interface AmenityComparisonItem {
  name: string;
  details: string;
  cost: string;
  pillType: "pill-free" | "pill-cost" | "pill-req";
}

export interface AmenityDetailSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    label: string;
    sub: string;
  };
  features: {
    icon: IconName;
    title: string;
    desc: string;
  }[];
}

export const AMENITIES_COMPARISON: AmenityComparisonItem[] = [
  {
    name: "High-speed Fibre Wi-Fi",
    details: "Unlimited fast internet in all units",
    cost: "Complimentary",
    pillType: "pill-free",
  },
  {
    name: "On-site vehicle parking",
    details: "Cars, work vans, street parking",
    cost: "Complimentary",
    pillType: "pill-free",
  },
  {
    name: "TV & entertainment",
    details: "Smart TV, Freeview & 20 Sky Channels",
    cost: "Complimentary",
    pillType: "pill-free",
  },
  {
    name: "Climate control",
    details: "In-room heat pumps / air conditioning",
    cost: "Complimentary",
    pillType: "pill-free",
  },
  {
    name: "EV charging station",
    details: "Type 2 EV charging setup",
    cost: "$25 overnight",
    pillType: "pill-cost",
  },
  {
    name: "Guest laundry",
    details: "Washer & dryer facilities",
    cost: "Available on request",
    pillType: "pill-req",
  },
];

export const DETAILED_AMENITIES: AmenityDetailSection[] = [
  {
    id: "parking",
    eyebrow: "EV charging & free on-site parking",
    title: "Convenient Parking & EV Power",
    description: "We cater to modern drivers and regional transport needs with stress-free parking directly on-site.",
    image: {
      src: "/images/parking-ev.jpg",
      alt: "On-site parking and EV charging",
      label: "Parking & EV",
      sub: "Landscape · 11:10",
    },
    features: [
      {
        icon: "car",
        title: "On-site & street parking",
        desc: "Generous, complimentary parking spaces designed to comfortably accommodate cars, work vans, and commercial vehicles or trailers.",
      },
      {
        icon: "bolt",
        title: "EV power station",
        desc: "Type 2 EV charging power available on-site for $25 overnight, ensuring your electric vehicle is fully charged and ready for the road ahead.",
      },
    ],
  },
  {
    id: "connectivity",
    eyebrow: "Fibre Wi-Fi & smart entertainment",
    title: "Stay Connected & Entertained",
    description: "Whether you need to host video calls for work or unwind with your favourite shows, our digital setup keeps you connected.",
    image: {
      src: "/images/wifi-smarttv.jpg",
      alt: "In-room Smart TV and workspace",
      label: "Smart TV & Wi-Fi",
      sub: "Landscape · 11:10",
    },
    features: [
      {
        icon: "wifi",
        title: "Ultra-fast Fibre Wi-Fi",
        desc: "Unlimited high-speed Fibre internet included in every room rate — ideal for corporate travellers.",
      },
      {
        icon: "tv",
        title: "Samsung Lynk & Sky TV",
        desc: "Enjoy Freeview channels and 20 Sky Channels, or stream directly on your in-room Smart TV.",
      },
    ],
  },
];

export interface OverviewAmenity {
  icon: "bolt" | "wifi" | "car" | "tv" | "sun" | "washer";
  title: string;
  desc: string;
}

export const OVERVIEW_AMENITIES: OverviewAmenity[] = [
  {
    icon: "bolt",
    title: "EV charging stations",
    desc: "On-site Type 2 EV charging power available ($25 overnight).",
  },
  {
    icon: "wifi",
    title: "Ultra-fast fibre Wi-Fi",
    desc: "Complimentary high-speed internet in every room.",
  },
  {
    icon: "car",
    title: "Free on-site & street parking",
    desc: "Spacious parking suitable for cars, vans, and commercial vehicles.",
  },
  {
    icon: "tv",
    title: "Sky TV & smart channels",
    desc: "Samsung Lynk Channels, Freeview, and 20 Sky Channels.",
  },
  {
    icon: "sun",
    title: "Climate control",
    desc: "Guest-controlled heating and heat pumps/aircon in all units.",
  },
  {
    icon: "washer",
    title: "Guest laundry",
    desc: "On-site laundry facilities available upon request.",
  },
];

