import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactGrid from "@/components/contact/ContactGrid";
import MapDirections from "@/components/contact/MapDirections";
import EatShopSection from "@/components/contact/EatShopSection";

export const metadata: Metadata = {
  title: "Contact Us & Location \u2014 Brookside Motel, Rolleston",
  description:
    "12 Brookside Road, Rolleston 7614. Under 2 minutes from the town centre and 20 minutes from Christchurch Airport. Call +64 3 930 0060.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        src="/images/contact-hero.jpg"
        alt="Rolleston, Canterbury"
        placeholderLabel="Rolleston / Canterbury"
        placeholderSub="Landscape · 21:9"
        crumb="Contact"
        title="Contact Us &amp; Location"
        sub="Located right by the motorway in Rolleston — under 2 minutes from town centre and 20 minutes from Christchurch Airport."
      />

      <ContactGrid />
      <MapDirections />
      <EatShopSection />
    </>
  );
}
