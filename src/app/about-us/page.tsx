import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutCommunity from "@/components/about/AboutCommunity";
import AboutReasons from "@/components/about/AboutReasons";
import AboutBookingBand from "@/components/about/AboutBookingBand";

export const metadata: Metadata = {
  title: "About Brookside Motel \u2014 Rolleston, Canterbury",
  description:
    "Opened October 2025. Brand-new luxury, genuinely clean rooms, and dependable hospitality in the heart of fast-growing Rolleston.",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        src="/images/about-exterior.jpg"
        alt="Brookside Motel exterior"
        placeholderLabel="Motel exterior"
        placeholderSub="Landscape · 21:9"
        crumb="About Us"
        title="About Brookside Motel"
        sub="Brand-new luxury, genuinely clean rooms, and dependable hospitality right in the heart of fast-growing Rolleston."
      />

      <AboutPhilosophy />
      <AboutCommunity />
      <AboutReasons />
      <AboutBookingBand />
    </>
  );
}
