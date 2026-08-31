import Link from "next/link";
import BookingButton from "@/components/ui/BookingButton";
import SlotImage from "@/components/ui/SlotImage";
import { SWIFTBOOK_ROOM_IDS } from "@/lib/site";
import type { RoomData } from "@/lib/types";

export default function RoomCard({
  id,
  image,
  flag,
  name,
  liveName,
  description,
  specs,
  highlights,
  cta,
  detailsFirst = false,
}: RoomData) {
  const href = `/motel-rooms/${id}`;
  const specLine = specs.map((s) => s.text).join(" | ");
  return (
    <article className="room rv" id={id}>
      <div className="room-media">
        <Link href={href} aria-label={`View details: ${name}`}>
          <SlotImage src={image.src} alt={image.alt} label={image.label} sub={image.sub} />
        </Link>
        {flag === "accessible" && (
          <span className="room-flag flag-accessible">Accessible</span>
        )}
      </div>
      <div className="room-body">
        <h4 className="h3">
          <Link href={href}>{name}</Link>
        </h4>
        <p className="room-spec-line">{specLine}</p>
        <ul className="room-core">
          {(detailsFirst ? highlights : highlights).slice(0, 6).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="room-cta">
          <BookingButton
            className="btn btn-primary"
            roomId={SWIFTBOOK_ROOM_IDS[id]}
          >
            Check availability
          </BookingButton>
          <Link className="link-brook" href={href}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}