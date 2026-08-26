import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BookingButton from "@/components/ui/BookingButton";
import ResidenceIntro from "@/components/residence/ResidenceIntro";
import ResidenceBedrooms from "@/components/residence/ResidenceBedrooms";
import ResidenceInsideTrio from "@/components/residence/ResidenceInsideTrio";
import ResidenceOutdoor from "@/components/residence/ResidenceOutdoor";
import ResidenceIdeal from "@/components/residence/ResidenceIdeal";
import ResidenceGallery from "@/components/residence/ResidenceGallery";
import ResidenceIncluded from "@/components/residence/ResidenceIncluded";
import ResidenceBookingBand from "@/components/residence/ResidenceBookingBand";

export const metadata: Metadata = {
  title: "Brookside Residence \u2014 4-Bedroom Luxury Home, Rolleston",
  description:
    "Our flagship 4-bedroom home in Rolleston with private outdoor spa, BBQ area, 3 bathrooms and an 85-inch Smart TV lounge. Sleeps up to 8 adults.",
};

export default function ResidencePage() {
  return (
    <>
      <PageHero
        src="/images/residenceimage/residence4.png"
        alt="The Brookside Residence exterior and spa"
        placeholderLabel="Residence exterior / spa / living"
        placeholderSub="Landscape · 21:9 slider"
        crumb="Brookside Residence"
        tag="Flagship 4-bedroom home"
        title="Brookside Residence"
        sub="A luxury stay beyond expectations — our flagship 4-bedroom home with private outdoor spa, BBQ area, and resort-style living in Rolleston."
        cta={
          <p style={{ marginTop: "var(--s4)" }}>
            <BookingButton className="btn btn-gold" dataEngine="residence">Book the Residence direct</BookingButton>
          </p>
        }
      />

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
