import { SITE_URL, SITE_NAME, EMAIL_RESERVATIONS } from "./site";

/* ─── Structured Data (JSON-LD) ─── */

export interface JsonLdBase {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

/**
 * Motel/LodgingBusiness structured data for the homepage
 */
export function getLodgingBusinessJsonLd(): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "Motel",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+64-3-930-0060",
    email: EMAIL_RESERVATIONS,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Brookside Road",
      addressLocality: "Rolleston",
      addressRegion: "Canterbury",
      postalCode: "7614",
      addressCountry: "NZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -43.5925,
      longitude: 172.382,
    },
    checkinTime: "14:00",
    checkoutTime: "10:00",
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: 22,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "EV Charging", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV", value: true },
    ],
    sameAs: [
      "https://www.google.com/maps/place/Brookside+Motel",
      "https://www.booking.com/hotel/nz/brookside-motel.html",
    ],
  };
}

/**
 * FAQPage structured data for the FAQ page
 */
export function getFaqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * HotelRoom structured data for individual room pages
 */
export function getHotelRoomJsonLd(room: {
  name: string;
  description: string;
  image: string;
  maxGuests: number;
  bedType: string;
  amenities: string[];
  price?: number;
  currency?: string;
}): JsonLdBase {
  const offers = room.price
    ? {
        "@type": "Offer",
        price: room.price,
        priceCurrency: room.currency || "NZD",
        availability: "https://schema.org/InStock",
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    image: `${SITE_URL}${room.image}`,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.maxGuests,
    },
    bed: {
      "@type": "BedDetails",
      typeOfBed: room.bedType,
    },
    amenityFeature: room.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    ...(offers ? { offers } : {}),
  };
}

/**
 * BreadcrumbList structured data
 */
export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate a self-referencing canonical URL for a given pathname
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return `${SITE_URL}${cleanPath}`;
}
