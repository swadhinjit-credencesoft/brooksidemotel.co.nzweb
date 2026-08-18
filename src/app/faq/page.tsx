import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqCategories from "@/components/faq/FaqCategories";
import FaqContactBand from "@/components/faq/FaqContactBand";

export const metadata: Metadata = {
  title: "FAQ & Guest Policies \u2014 Brookside Motel, Rolleston",
  description:
    "Check-in and check-out times, parking and EV charging, smoking and pet policies, group deposits, and in-room amenities at Brookside Motel.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        src="/images/faq-hero.jpg"
        alt="Brookside Motel reception"
        placeholderLabel="Reception"
        placeholderSub="Landscape · 21:9"
        crumb="FAQ"
        title={
          <>
            Frequently Asked Questions
            <br />
            &amp; Guest Policies
          </>
        }
        sub="Everything you need to know about checking in, parking, policies, and making the most of your stay at Brookside Motel."
      />

      <FaqCategories />
      <FaqContactBand />
    </>
  );
}
