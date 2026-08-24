import BookingButton from "@/components/ui/BookingButton";
import { PHONE_DISPLAY, PHONE_TEL, SWIFTBOOK_ROOM_IDS } from "@/lib/site";
import type { RoomData } from "@/lib/types";

export default function RoomBookingBand({ room }: { room: RoomData }) {
  return (
    <section className="section-sm bg-pine">
      <div className="wrap">
        <div className="rd-band rv">
          <div>
            <p className="eyebrow on-dark">Book direct &amp; save</p>
            <h2 className="h1">Stay in the {room.name}</h2>
            <p className="rd-band-sub">
              No commissions, flexible cancellation, and priority late check-out when you book
              directly with us.
            </p>
          </div>
          <div className="rd-band-cta">
            <BookingButton
              className="btn btn-gold"
              roomId={SWIFTBOOK_ROOM_IDS[room.id]}
            >
              Check availability
            </BookingButton>
            <a className="btn btn-ghost-light" href={PHONE_TEL}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
