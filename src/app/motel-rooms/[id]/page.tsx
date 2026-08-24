import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import RoomIntro from "@/components/rooms/RoomIntro";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import StandardAmenitiesSection from "@/components/rooms/StandardAmenitiesSection";
import OtherRooms from "@/components/rooms/OtherRooms";
import RoomBookingBand from "@/components/rooms/RoomBookingBand";
import { ROOMS, getRoom } from "@/content/rooms";
import { listRoomGallery } from "@/lib/img";
import type { GalleryImage } from "@/lib/types";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ id: room.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) return {};
  return {
    title: `${room.name} — Brookside Motel, Rolleston`,
    description:
      room.summary ??
      `${room.name} at Brookside Motel, Rolleston — luxury linen, Fibre Wi-Fi, Smart TV and free parking.`,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) notFound();

  const galleryFiles = listRoomGallery(room.id);
  const images: GalleryImage[] =
    galleryFiles.length > 0
      ? galleryFiles.map((src, i) => ({
          src,
          alt: `${room.name} — photo ${i + 1}`,
        }))
      : [{ src: room.image.src, alt: room.image.alt }];

  return (
    <>
      <PageHero
        src={images[0].src}
        alt={images[0].alt}
        placeholderLabel={room.image.label}
        placeholderSub="Landscape · 21:9"
        crumb={room.name}
        title={room.name}
        sub={
          room.specs.map((s) => s.text).join(" · ") ||
          "Brand-new ground-floor comfort in Rolleston."
        }
      />

      <RoomIntro room={room} />
      <RoomGallery images={images} name={room.name} />
      <RoomAmenities room={room} />
      <StandardAmenitiesSection />
      <OtherRooms current={room} />
      <RoomBookingBand room={room} />
    </>
  );
}
