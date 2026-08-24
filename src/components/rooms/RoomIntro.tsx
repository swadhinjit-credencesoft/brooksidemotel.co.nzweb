import Link from "next/link";
import BookingButton from "@/components/ui/BookingButton";
import Ico from "@/components/ui/Ico";
import { SWIFTBOOK_ROOM_IDS } from "@/lib/site";
import type { RoomData } from "@/lib/types";

export default function RoomIntro({ room }: { room: RoomData }) {
  return (
    <section className="section-sm bg-cream">
      <div className="wrap">
        <div className="rd-intro rv">
          <div className="rd-copy">
            <p className="eyebrow">Motel Rooms · Rolleston</p>
            <h2 className="h1">{room.name}</h2>
            <p className="room-live-name">{room.liveName}</p>
            <p className="lead">{room.description}</p>
            {room.descriptionExtra && <p>{room.descriptionExtra}</p>}
            <ul className="incl" style={{ marginBlock: "var(--s3)" }}>
              {room.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <aside className="rd-aside">
            <div className="rd-card">
              <b>Ready to stay?</b>
              <ul className="room-specs rd-specs">
                {room.specs.map((s) => (
                  <li key={s.text}>
                    <Ico name={s.icon} />
                    {s.text}
                  </li>
                ))}
              </ul>
              <BookingButton
                className="btn btn-primary"
                roomId={SWIFTBOOK_ROOM_IDS[room.id]}
              >
                {room.cta}
              </BookingButton>
              <Link className="btn btn-ghost" href="/contact">
                Ask a question
              </Link>
              <p className="rd-note">
                Book direct for flexible cancellation and priority late check-out.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
