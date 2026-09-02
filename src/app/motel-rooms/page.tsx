import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RoomsOverview from "@/components/rooms/RoomsOverview";
import RoomShowcase from "@/components/rooms/RoomShowcase";
import StandardAmenitiesSection from "@/components/rooms/StandardAmenitiesSection";
import CrossSellSection from "@/components/rooms/CrossSellSection";
import { ROOMS } from "@/content/rooms";
import { getRoomListJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Accommodation & Motel Units \u2014 Brookside Motel, Rolleston",
  description:
    "Brand-new, motel rooms in Rolleston with luxury bedding, Fibre Wi-Fi, Smart TV and free parking. Six room types including accessible and interconnected options.",
};

export default function MotelRoomsPage() {
  const roomListJsonLd = getRoomListJsonLd(
    ROOMS.map((room) => ({
      id: room.id,
      name: room.name,
      image: room.image.src,
      maxGuests: parseInt(
        room.specs.find((s) => s.icon === "guests")?.text.match(/\d+/)?.[0] ?? "2"
      ),
    }))
  );
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Motel Rooms", url: "/motel-rooms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
