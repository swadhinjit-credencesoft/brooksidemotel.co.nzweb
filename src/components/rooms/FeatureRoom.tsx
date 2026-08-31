import Link from "next/link";
import BookingButton from "@/components/ui/BookingButton";
import SlotImage from "@/components/ui/SlotImage";
import { SWIFTBOOK_ROOM_IDS } from "@/lib/site";

const HIGHLIGHTS = [
  "Private outdoor seating",
  "Smart TV — 20 Sky channels & Freeview",
  "Ultra-Fast Fibre Wi-Fi",
  "Guest-controlled heat pump / aircon",
  "Microwave, fridge & kitchenette",
  "Luxury toiletries & high-pressure shower",
];

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
        <h3 className="h2">Superior Super King – Private Patio</h3>
        <p className="room-live-name">
          Also referred to as <em>Superior King Suite with Outdoor Seating</em>
        </p>
        <p className="room-spec-line" style={{ marginBottom: "var(--s3)" }}>
          Sleeps 2 | Super King | Ground floor
        </p>
        <p className="lead">
          Relax and unwind in our beautifully appointed Superior Deluxe Room, complete with your
          own outdoor seating area — perfect for enjoying a quiet morning coffee or a peaceful
          evening wind down.
        </p>

        <h4 className="incl-title">Included highlights</h4>
        <ul className="incl">
          {HIGHLIGHTS.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="feature-cta">
          <BookingButton
            className="btn btn-primary"
            roomId={SWIFTBOOK_ROOM_IDS["superior-outdoor"]}
          >
            Check availability
          </BookingButton>
          <Link className="btn btn-ghost" href="/motel-rooms/superior-outdoor">
            View room details
          </Link>
        </div>
      </div>
    </article>
  );
}