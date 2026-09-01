import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RoomsOverview from "@/components/rooms/RoomsOverview";
import RoomShowcase from "@/components/rooms/RoomShowcase";
import StandardAmenitiesSection from "@/components/rooms/StandardAmenitiesSection";
import CrossSellSection from "@/components/rooms/CrossSellSection";

export const metadata: Metadata = {
  title: "Our Accommodation & Motel Units \u2014 Brookside Motel, Rolleston",
  description:
    "Brand-new, motel rooms in Rolleston with luxury bedding, Fibre Wi-Fi, Smart TV and free parking. Six room types including accessible and interconnected options.",
};

export default function MotelRoomsPage() {
  return (
    <>
      <PageHero
        src="/images/hero-superior-room.jpg"
        alt="Superior Room at Brookside Motel"
        placeholderLabel="Superior Room"
        placeholderSub="Landscape · 21:9"
        crumb="Motel Rooms"
        title={
          <>
            Our Accommodation
            <br />
            &amp; Motel Units
          </>
        }
        sub="Brand-new,  comfort with luxury bedding, high-speed Fibre Wi-Fi, and quiet surroundings in Rolleston."
      />

      <RoomsOverview />
      <RoomShowcase />
      <StandardAmenitiesSection />
      <CrossSellSection />
    </>
  );
}
