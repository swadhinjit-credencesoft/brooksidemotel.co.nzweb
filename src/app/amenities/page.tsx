import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AmenitiesIntro from "@/components/amenities/AmenitiesIntro";
import AmenitiesDetailed from "@/components/amenities/AmenitiesDetailed";
import ComfortsSection from "@/components/amenities/ComfortsSection";
import AmenitiesTable from "@/components/amenities/AmenitiesTable";
import AmenitiesBookingBand from "@/components/amenities/AmenitiesBookingBand";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Facilities & Guest Amenities \u2014 Brookside Motel, Rolleston",
  description:
    "EV charging, free parking, ultra-fast Fibre Wi-Fi, Sky TV, climate control and guest laundry at Brookside Motel, Rolleston.",
};

export default function AmenitiesPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Amenities", url: "/amenities" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        src="/images/facilities-hero.jpg"
        alt="Guest facilities at Brookside Motel"
        placeholderLabel="Guest facilities"
        placeholderSub="Landscape · 21:9"
        crumb="Amenities"
        title={
          <>
            Facilities &amp;
            <br />
            Guest Amenities
          </>
        }
        sub="Thoughtfully equipped for effortless living — whether you're here for a night, a corporate stay, or an extended visit."
      />

      <AmenitiesIntro />
      <AmenitiesDetailed />
      <ComfortsSection />
      <AmenitiesTable />
      <AmenitiesBookingBand />
    </>
  );
}
