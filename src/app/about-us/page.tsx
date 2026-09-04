import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutCommunity from "@/components/about/AboutCommunity";
import AboutReasons from "@/components/about/AboutReasons";
import AboutBookingBand from "@/components/about/AboutBookingBand";
import { getOrganizationJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Brookside Motel \u2014 Rolleston, Canterbury",
  description:
    " Brand-new luxury, genuinely clean rooms, and dependable hospitality in the heart of fast-growing Rolleston.",
};

export default function AboutUsPage() {
  const orgJsonLd = getOrganizationJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
