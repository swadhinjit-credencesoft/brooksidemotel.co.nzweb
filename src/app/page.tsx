import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import SearchWidget from "@/components/home/SearchWidget";
import JourneySection from "@/components/home/JourneySection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeaturedRoomsSection from "@/components/home/FeaturedRoomsSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import TrustSection from "@/components/home/TrustSection";
import LocationSection from "@/components/home/LocationSection";
import { getLodgingBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Brookside Motel Rolleston | New Motel Accommodation, Canterbury NZ",
  description:
    "Quiet, modern motel accommodation and private luxury residences in Rolleston, Canterbury \u2014 just 20 minutes from Christchurch Airport.",
  openGraph: {
    title: "Brookside Motel Rolleston | New Motel Accommodation, Canterbury NZ",
    description:
      "Quiet, modern motel accommodation and private luxury residences in Rolleston, Canterbury \u2014 just 20 minutes from Christchurch Airport.",
    url: "/",
  },
};

export default function HomePage() {
  const jsonLd = getLodgingBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <SearchWidget />
      <JourneySection />
      <WelcomeSection />
      <FeaturedRoomsSection />
      <AmenitiesSection />
      <TrustSection />
      <LocationSection />
    </>
  );
}
