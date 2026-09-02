import { SITE_URL, SITE_NAME, EMAIL_RESERVATIONS } from "./site";

/* ─── Structured Data (JSON-LD) ─── */

export interface JsonLdBase {
  "@context": "https://schema.org";
  "@type": string | string[];
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

/**
 * Organization structured data (shared by About/Contact/homepage)
 */
export function getOrganizationJsonLd(): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": ["Motel", "Organization"],
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+64-3-930-0060",
    email: EMAIL_RESERVATIONS,
    logo: `${SITE_URL}/logos/logo-pine.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    foundingDate: "2025-10",
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
    areaServed: "Rolleston, Selwyn District, Canterbury, New Zealand",
    openingHours: "Mo-Su 07:00-22:00",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+64-3-930-0060",
      contactType: "reservations",
      email: EMAIL_RESERVATIONS,
      availableLanguage: "English",
    },
  };
}

/**
 * ItemList of hotel rooms for the motel-rooms index page
 */
export function getRoomListJsonLd(
  rooms: Array<{ id: string; name: string; image: string; maxGuests: number }>
): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Brookside Motel Rooms",
    itemListElement: rooms.map((room, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: room.name,
      url: `${SITE_URL}/motel-rooms/${room.id}`,
      image: `${SITE_URL}${room.image}`,
    })),
  };
}

/**
 * Blog/ItemList structured data for the local guide index
 */
export function getGuideIndexJsonLd(
  posts: Array<{ name: string; url: string; summary: string; datePublished: string }>
): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Brookside Motel Local Guide & Blog",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.name,
        image: `${SITE_URL}/opengraph-image.png`,
        datePublished: post.datePublished,
        dateModified: post.datePublished,
        url: `${SITE_URL}${post.url}`,
        author: { "@type": "Organization", name: SITE_NAME },
        description: post.summary,
      },
    })),
  };
}

/**
 * VacationRental / LodgingBusiness structured data for the residence page
 */
export function getResidenceJsonLd(residence: {
  name: string;
  description: string;
  image: string;
  occupancy: number;
  bathrooms: number;
  bedrooms: number;
}): JsonLdBase {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: residence.name,
    description: residence.description,
    url: `${SITE_URL}/brookside-residence`,
    image: `${SITE_URL}${residence.image}`,
    telephone: "+64-3-930-0060",
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
    numberOfRooms: residence.bedrooms,
    numberOfBathroomsTotal: residence.bathrooms,
    maximumOccupancy: {
      "@type": "QuantitativeValue",
      maxValue: residence.occupancy,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Outdoor Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ Area", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    ],
    checkinTime: "14:00",
    checkoutTime: "10:00",
  };
}
