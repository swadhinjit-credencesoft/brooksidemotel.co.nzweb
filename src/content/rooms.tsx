import type { RoomData } from "@/lib/types";

export const ROOMS: RoomData[] = [
  {
    id: "superior-interconnected",
    image: {
      src: "/images/superior-interconnected.jpg",
      alt: "Superior Interconnected Suite",
      label: "Interconnected",
      sub: "Landscape · 3:2",
    },
    name: "Superior Room – Interconnected (with Sofa)",
    liveName: (
      <>
        Also referred to as <em>Superior King Interconnected Suite</em>
      </>
    ),
    description:
      "Enjoy comfort and flexibility in our spacious Superior Room, perfect for families, friends, or anyone who appreciates a little extra space. This room can be set up with either a Super King bed or two Singles.",
    specs: [
      { icon: "guests", text: "2–3 guests" },
      { icon: "bed", text: "1 Super King + sofa / interconnected" },
      { icon: "door", text: "Flexible adjoining room access" },
    ],
    highlights: [
      "Interconnected door option",
      "Dedicated work area / desk",
      "Ultra-Fast Fibre Wi-Fi & Smart TV",
      "Guest-controlled climate heating/cooling",
      "Microwave, kettle & coffee/tea station",
    ],
    cta: "Book Interconnected Suite",
  },
  {
    id: "deluxe-two-doubles",
    image: {
      src: "/images/room-family-twin.jpg",
      alt: "Deluxe Room with two double beds",
      label: "2 double beds",
      sub: "Landscape · 3:2",
    },
    name: "Deluxe Room – 2 Double Beds",
    liveName: (
      <>
        Also referred to as <em>Deluxe Double Room (Family / Twin)</em>
      </>
    ),
    description:
      "Perfect for families and friends travelling together, our Deluxe Room offers two comfortable double beds and generous floor space.",
    specs: [
      { icon: "guests", text: "2–4 guests" },
      { icon: "bed", text: "2 double beds" },
      { icon: "building", text: "Full ground-floor accessibility" },
    ],
    highlights: [
      "2 double beds with hotel-grade linen",
      "Smart TV with Sky TV channels",
      "Kitchenette with microwave & fridge",
      "Spacious private bathroom",
      "Free Fibre Wi-Fi & on-site parking",
    ],
    cta: "Book Deluxe Family Room",
  },
  {
    id: "deluxe-top-floor",
    image: {
      src: "/images/deluxe-top-floor.jpg",
      alt: "Deluxe Room, Top Floor",
      label: "Deluxe Room · Top Floor",
      sub: "Landscape · 3:2",
    },
    name: "Deluxe Room – Top Floor",
    liveName: (
      <>
        Also referred to as <em>Deluxe Top Floor Suite</em>
      </>
    ),
    description:
      "Enjoy a peaceful retreat in our Deluxe Top Floor Room, offering elevated views and a sense of extra privacy. Settle into a luxurious Super King bed and make yourself at home with a refrigerator and tea and coffee making facilities.",
    specs: [
      { icon: "guests", text: "2 guests" },
      { icon: "bed", text: "1 Super King bed" },
      { icon: "corner", text: "Upper-level quiet position" },
    ],
    highlights: [
      "Quiet top-floor positioning",
      "Super King bed with premium linen",
      "Climate control heat pump",
      "Smart TV & high-speed Fibre Wi-Fi",
    ],
    cta: "Book Top Floor Suite",
  },
  {
    id: "accessible-superking",
    image: {
      src: "/images/room-accessible-superking.jpg",
      alt: "Accessible Deluxe Room with Super King bed",
      label: "Accessible Room",
      sub: "Landscape · 3:2",
    },
    flag: "accessible",
    name: "Accessible Deluxe Room – 1 Superking Bed",
    liveName: (
      <>
        Also referred to as <em>Accessible Super King Room</em>
      </>
    ),
    description:
      "Thoughtfully designed for comfort and accessibility, this room features a comfortable superking bed and all the essentials for a relaxed and enjoyable stay.",
    specs: [
      { icon: "guests", text: "2 guests" },
      { icon: "bed", text: "1 Super King bed" },
      { icon: "accessible", text: "Purpose-built disability access" },
    ],
    highlights: [
      "Level ground-floor entry",
      "Accessible bathroom with roll-in shower & handrails",
      "Wide doorways & lowered counters",
      "Smart TV & free Fibre Wi-Fi",
    ],
    cta: "Book Accessible Room",
  },
  {
    id: "deluxe-one-double",
    image: {
      src: "/images/room-deluxe-one-double.jpg",
      alt: "Deluxe Room with one double bed",
      label: "Deluxe One Double",
      sub: "Landscape · 3:2",
    },
    name: "Deluxe Room – 1 Double Bed",
    liveName: "Listed on brooksidemotel.co.nz/accommodation",
    description:
      "Ideal for solo travellers or couples, this room features a comfortable Double bed and all the essentials for a relaxing stay.",
    detailsFirst: true,
    specs: [
      { icon: "guests", text: "1–2 guests" },
      { icon: "bed", text: "1 double bed" },
      { icon: "building", text: "Ground floor" },
    ],
    highlights: [
      "Double bed with hotel-grade linen",
      "Smart TV with Sky TV channels",
      "Kitchenette with microwave & fridge",
      "Free Fibre Wi-Fi & on-site parking",
    ],
    cta: "Book this room",
  },
];
