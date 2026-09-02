import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BookingButton from "@/components/ui/BookingButton";
import ResidenceSearchBar from "@/components/residence/ResidenceSearchBar";
import ResidenceIntro from "@/components/residence/ResidenceIntro";
import ResidenceBedrooms from "@/components/residence/ResidenceBedrooms";
import ResidenceInsideTrio from "@/components/residence/ResidenceInsideTrio";
import ResidenceOutdoor from "@/components/residence/ResidenceOutdoor";
import ResidenceIdeal from "@/components/residence/ResidenceIdeal";
import ResidenceGallery from "@/components/residence/ResidenceGallery";
import ResidenceIncluded from "@/components/residence/ResidenceIncluded";
import ResidenceBookingBand from "@/components/residence/ResidenceBookingBand";
import { getResidenceJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BROOKSIDE RESIDENCE — 4-Bedroom Luxury Home, Rolleston",
  description:
    "Our flagship 4-bedroom home in Rolleston with private outdoor spa, BBQ area, 3 bathrooms and an 85-inch Smart TV lounge. Sleeps up to 8 adults.",
};

export default function ResidencePage() {
  const residenceJsonLd = getResidenceJsonLd({
    name: "The Brookside Residence",
    description:
      "Our flagship 4-bedroom luxury home in Rolleston with private outdoor spa, BBQ area, 3 bathrooms and an 85-inch Smart TV lounge. Sleeps up to 8 adults.",
    image: "/images/residenceimage/residence4.png",
    occupancy: 8,
    bathrooms: 3,
    bedrooms: 4,
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Brookside Residence", url: "/brookside-residence" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        src="/images/residenceimage/residence4.png"
        alt="THE BROOKSIDE RESIDENCE exterior and spa"
        placeholderLabel="Residence exterior / spa / living"
        placeholderSub="Landscape · 21:9 slider"
        crumb="BROOKSIDE RESIDENCE"
        tag="Flagship 4-bedroom home"
        title="BROOKSIDE RESIDENCE"
        sub="A luxury stay beyond expectations — our flagship 4-bedroom home with private outdoor spa, BBQ area, and resort-style living in Rolleston."
        cta={
          <p style={{ marginTop: "var(--s4)" }}>
            <BookingButton className="btn btn-gold" dataEngine="residence">Book the Residence direct</BookingButton>
          </p>
        }
      />

      <ResidenceSearchBar />
      <ResidenceIntro />
      <ResidenceBedrooms />
      <ResidenceInsideTrio />
      <ResidenceOutdoor />
      <ResidenceIdeal />
      <ResidenceGallery />
      <ResidenceIncluded />
      <ResidenceBookingBand />
    </>
  );
}
