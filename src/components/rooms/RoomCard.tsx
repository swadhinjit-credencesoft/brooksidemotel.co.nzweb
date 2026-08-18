import BookingButton from "@/components/ui/BookingButton";
import Ico from "@/components/ui/Ico";
import SlotImage from "@/components/ui/SlotImage";
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
  return (
    <article className="room rv" id={id}>
      <div className="room-media">
        <SlotImage src={image.src} alt={image.alt} label={image.label} sub={image.sub} />
        {flag === "accessible" && (
          <span className="room-flag flag-accessible">
            <Ico name="accessible" size={13} sw={2} />
            Accessible
          </span>
        )}
      </div>
      <div className="room-body">
        <h4 className="h3">{name}</h4>
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
          <BookingButton className="btn btn-primary">{cta}</BookingButton>
        </div>
      </div>
    </article>
  );
}
