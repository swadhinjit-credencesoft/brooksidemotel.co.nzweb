import type { RoomData } from "@/lib/types";

export const ROOMS: RoomData[] = [
  {
    id: "superior-outdoor",
    feature: true,
    hideFromGrid: true,
    image: {
      src: "/images/superior-outdoor-area.jpg",
      alt: "Superior Room with private outdoor seating area",
      label: "Superior · outdoor area",
      sub: "Landscape · 3:2",
    },
    summary:
      "Our best-seller: ground-floor Superior Room with a Super King bed and private outdoor courtyard seating in Rolleston.",
    name: "Superior Super King – Private Patio",
    shortName: "Superior Super King",
    liveName: (
      <>
        Also referred to as <em>Superior King Suite with Outdoor Seating</em>
      </>
    ),
    description: (
      <>
        Relax and unwind in our beautifully appointed Superior Deluxe Room, complete with your
        own outdoor seating area — perfect for enjoying a quiet morning coffee or a peaceful
        evening wind down.
      </>
    ),
    descriptionExtra: (
      <>
        Our most popular suite, combining maximum space, ground-floor convenience, and a private
        outdoor courtyard to unwind after a busy day.
      </>
    ),
    specs: [
      { icon: "guests", text: "2 guests" },
      { icon: "bed", text: "1 Super King bed" },
      { icon: "sun", text: "Private outdoor courtyard" },
    ],
    highlights: [
      "Ground-floor courtyard access",
      "Ultra-Fast Fibre Wi-Fi",
      "Smart TV with 20 Sky Channels & Freeview",
      "Guest-controlled heat pump / aircon",
      "Microwave & kitchenette facilities",
      "Luxury toiletries & high-pressure shower",
    ],
    amenities: [
      { icon: "sun", text: "Private outdoor seating area" },
      { icon: "building", text: "Ground-floor position" },
      { icon: "bed", text: "Super King bed with luxury linen" },
      { icon: "tv", text: "Smart TV — 20 Sky channels & Freeview" },
      { icon: "kitchen", text: "Microwave & kitchenette facilities" },
      { icon: "toiletries", text: "Luxury toiletries & high-pressure shower" },
      { icon: "wifi", text: "Ultra-Fast Fibre Wi-Fi" },
      { icon: "car", text: "Free on-site parking at your door" },
    ],
    cta: "Book Superior Suite direct",
  },
  {
    id: "superior-interconnected",
    image: {
      src: "/images/superior-interconnected.jpg",
      alt: "Superior Interconnected Suite",
      label: "Interconnected",
      sub: "Landscape · 3:2",
    },
    summary:
      "Spacious interconnected Superior Room with Super King or twin setup, work desk and flexible adjoining-room access for families and groups.",
    name: "Superior Interconnected – With Sofa",
    shortName: "Superior Interconnected",
    liveName: (
      <>
        Also referred to as <em>Superior King Interconnected Suite</em>
      </>
    ),
    description:
      "Enjoy comfort and flexibility in our spacious Superior Room, perfect for families, friends, or anyone who appreciates a little extra space. This room can be set up with either a Super King bed or two Singles.",
    specs: [
      { icon: "guests", text: "2–3 guests" },
      { icon: "bed", text: "Super King or twins + sofa" },
      { icon: "door", text: "Flexible adjoining room access" },
    ],
    highlights: [
      "Interconnected door option",
      "Dedicated work area / desk",
      "Ultra-Fast Fibre Wi-Fi & Smart TV",
      "Guest-controlled climate heating/cooling",
      "Microwave, kettle & coffee/tea station",
    ],
    amenities: [
      { icon: "door", text: "Interconnecting door option" },
      { icon: "building", text: "Dedicated work area / desk" },
      { icon: "wifi", text: "Ultra-Fast Fibre Wi-Fi" },
      { icon: "tv", text: "Smart TV with Sky channels" },
      { icon: "sun", text: "Guest-controlled climate heat/cool" },
      { icon: "coffee", text: "Microwave, kettle & coffee/tea station" },
      { icon: "bath", text: "Private bathroom with high-pressure shower" },
      { icon: "toiletries", text: "Luxury toiletries & plush towels" },
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
    summary:
      "Family-friendly Deluxe Room with two double beds, kitchenette and full ground-floor access — sleeps up to four guests.",
    name: "Deluxe Room – 2 Double Beds",
    shortName: "Deluxe Double",
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
    amenities: [
      { icon: "bed", text: "Two double beds, hotel-grade linen" },
      { icon: "tv", text: "Smart TV with Sky TV channels" },
      { icon: "kitchen", text: "Kitchenette with microwave & fridge" },
      { icon: "bath", text: "Spacious private bathroom" },
      { icon: "wifi", text: "Free Fibre Wi-Fi" },
      { icon: "car", text: "Free on-site parking" },
      { icon: "building", text: "Full ground-floor accessibility" },
      { icon: "toiletries", text: "Luxury toiletries & plush towels" },
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
    summary:
      "Peaceful top-floor Deluxe Room with elevated views, Super King bed, climate control and fibre Wi-Fi.",
    name: "Deluxe Top Floor – Super King",
    shortName: "Deluxe Top Floor",
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
    amenities: [
      { icon: "corner", text: "Quiet top-floor position, elevated views" },
      { icon: "bed", text: "Super King bed with premium linen" },
      { icon: "sun", text: "Climate control heat pump" },
      { icon: "tv", text: "Smart TV" },
      { icon: "wifi", text: "High-speed Fibre Wi-Fi" },
      { icon: "coffee", text: "Refrigerator & tea/coffee facilities" },
      { icon: "bath", text: "Private bathroom" },
      { icon: "car", text: "Free on-site parking" },
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
    summary:
      "Purpose-built accessible Deluxe Room: level entry, roll-in shower, handrails and a Super King bed.",
    name: "Accessible Deluxe – Super King",
    shortName: "Accessible Deluxe",
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
    amenities: [
      { icon: "accessible", text: "Purpose-built disability access throughout" },
      { icon: "bath", text: "Roll-in shower with handrails" },
      { icon: "building", text: "Wide doorways & lowered counters" },
      { icon: "bed", text: "Super King bed" },
      { icon: "tv", text: "Smart TV" },
      { icon: "wifi", text: "Free Fibre Wi-Fi" },
      { icon: "sun", text: "Guest-controlled climate control" },
      { icon: "car", text: "Free on-site parking" },
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
    summary:
      "Cosy ground-floor Deluxe Room with one double bed, kitchenette and Smart TV — ideal for solo travellers or couples.",
    name: "Deluxe Room – 1 Double Bed",
    shortName: "Deluxe Double",
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
    amenities: [
      { icon: "bed", text: "Double bed with hotel-grade linen" },
      { icon: "tv", text: "Smart TV with Sky TV channels" },
      { icon: "kitchen", text: "Kitchenette with microwave & fridge" },
      { icon: "wifi", text: "Free Fibre Wi-Fi" },
      { icon: "car", text: "Free on-site parking" },
      { icon: "building", text: "Ground-floor position" },
      { icon: "toiletries", text: "Luxury toiletries & plush towels" },
    ],
    cta: "Book this room",
  },
];

export function getRoom(id: string): RoomData | undefined {
  return ROOMS.find((r) => r.id === id);
}
