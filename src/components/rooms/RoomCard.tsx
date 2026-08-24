import Link from "next/link";
import BookingButton from "@/components/ui/BookingButton";
import Ico from "@/components/ui/Ico";
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
  return (
    <article className="room rv" id={id}>
      <div className="room-media">
        <Link href={href} aria-label={`View details: ${name}`}>
          <SlotImage src={image.src} alt={image.alt} label={image.label} sub={image.sub} />
        </Link>
        {flag === "accessible" && (
          <span className="room-flag flag-accessible">
            <Ico name="accessible" size={13} sw={2} />
            Accessible
          </span>
        )}
      </div>
      <div className="room-body">
        <h4 className="h3">
          <Link href={href}>{name}</Link>
        </h4>
        <p className="room-live-name">{liveName}</p>
        <p>{description}</p>
        {detailsFirst && (
          <details className="incl-fold">
            <summary>Included highlights</summary>
            <ul className="incl">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </details>
        )}
        <ul className="room-specs">
          {specs.map((s) => (
            <li key={s.text}>
              <Ico name={s.icon} />
              {s.text}
            </li>
          ))}
        </ul>
        {!detailsFirst && (
          <details className="incl-fold">
            <summary>Included highlights</summary>
            <ul className="incl">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </details>
        )}
        <div className="room-cta">
          <BookingButton
            className="btn btn-primary"
            roomId={SWIFTBOOK_ROOM_IDS[id]}
          >
            {cta}
          </BookingButton>
          <Link className="btn btn-ghost" href={href}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
