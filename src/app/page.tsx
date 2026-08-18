import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import SearchWidget from "@/components/home/SearchWidget";
import JourneySection from "@/components/home/JourneySection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeaturedRoomsSection from "@/components/home/FeaturedRoomsSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import TrustSection from "@/components/home/TrustSection";
import LocationSection from "@/components/home/LocationSection";

export const metadata: Metadata = {
  title: "Brookside Motel \u2014 Brand-New Luxury & Modern Comfort in Rolleston",
  description:
    "Quiet, modern motel accommodation and private luxury residences in Rolleston, Canterbury \u2014 just 20 minutes from Christchurch Airport.",
};

export default function HomePage() {
  return (
    <>
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
