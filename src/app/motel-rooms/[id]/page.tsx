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
import { getHotelRoomJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
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
  const title = `${room.name} — Brookside Motel, Rolleston`;
  const description =
    room.summary ??
    `${room.name} at Brookside Motel, Rolleston — luxury linen, Fibre Wi-Fi, Smart TV and free parking.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/motel-rooms/${room.id}`,
      images: [
        {
          url: room.image.src,
          width: 1200,
          height: 630,
          alt: room.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [room.image.src],
    },
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

  // Structured data for room page
  const hotelRoomJsonLd = getHotelRoomJsonLd({
    name: room.name,
    description: typeof room.description === "string" ? room.description : room.summary ?? room.name,
    image: room.image.src,
    maxGuests: parseInt(room.specs.find(s => s.icon === "guests")?.text.match(/\d+/)?.[0] ?? "2"),
    bedType: room.specs.find(s => s.icon === "bed")?.text ?? "Super King",
    amenities: room.amenities.map(a => a.text),
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Motel Rooms", url: "/motel-rooms" },
    { name: room.name, url: `/motel-rooms/${room.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
