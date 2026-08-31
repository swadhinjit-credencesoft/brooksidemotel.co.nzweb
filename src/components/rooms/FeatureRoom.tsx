import Link from "next/link";
import BookingButton from "@/components/ui/BookingButton";
import SlotImage from "@/components/ui/SlotImage";
import { SWIFTBOOK_ROOM_IDS } from "@/lib/site";

export default function FeatureRoom() {
  return (
    <article className="feature-room rv" id="superior-outdoor">
      <div className="feature-media">
        <figure className="arch" style={{ margin: 0 }}>
          <SlotImage src="/images/superior-outdoor-area.jpg" alt="Superior Room with outdoor seating area" label="Superior · outdoor area" sub="Portrait · 3:4" />
        </figure>
      </div>
      <div className="feature-body">
        <span className="room-flag static">Our best seller</span>
        <h3 className="h2">SUPERIOR ROOM - OUTDOOR AREA</h3>
        <p className="room-live-name">
          Also referred to as <em>Superior King Suite with Outdoor Seating</em>
        </p>
        <p className="lead">
          Relax and unwind in our beautifully appointed Superior Deluxe Room, complete with
          your own outdoor seating area — perfect for enjoying a quiet morning coffee or a
          peaceful evening wind down.
        </p>
        <p>
          Our most popular suite, combining maximum space, ground-floor convenience, and a
          private outdoor courtyard to unwind after a busy day.
        </p>

        <div className="spec-strip">
          <div className="spec">
            <span className="spec-l">Max occupancy</span>
            <b>2 guests</b>
          </div>
          <div className="spec">
            <span className="spec-l">Bed configuration</span>
            <b>1 Super King, luxury linen</b>
          </div>
          <div className="spec">
            <span className="spec-l">Key feature</span>
            <b>Ground floor with outdoor patio</b>
          </div>
        </div>

        <h4 className="incl-title">Included highlights</h4>
        <ul className="incl">
          {/* <li>Ground-floor courtyard access</li> */}
          <li>Ultra-Fast Fibre Wi-Fi</li>
          <li>Smart TV with 20 Sky Channels &amp; Freeview</li>
          <li>Guest-controlled heat pump / aircon</li>
          <li>Microwave &amp; kitchenette facilities</li>
          <li>Luxury toiletries &amp; high-pressure shower</li>
        </ul>

        <div className="feature-cta">
          <BookingButton
            className="btn btn-primary"
            roomId={SWIFTBOOK_ROOM_IDS["superior-outdoor"]}
          >
            Book Superior Suite direct
          </BookingButton>
          <Link className="btn btn-ghost" href="/motel-rooms/superior-outdoor">
            View room details
          </Link>
        </div>
      </div>
    </article>
  );
}
