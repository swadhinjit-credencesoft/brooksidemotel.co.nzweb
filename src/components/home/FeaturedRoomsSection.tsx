import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import BookingButton from "@/components/ui/BookingButton";
import SlotImage from "@/components/ui/SlotImage";
import { SWIFTBOOK_ROOM_IDS } from "@/lib/site";

const SpecGuests = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="9" cy="7" r="4" />
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
  </svg>
);

const SpecBed = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  </svg>
);

const SpecBuilding = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M3 21V9l9-6 9 6v12" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

const SpecCheck = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SpecTv = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const SpecBath = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M6 12V6a2 2 0 0 1 4 0" />
  </svg>
);

const SpecSpa = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 3v3M8 8c0 2 4 2 4 4M4 14h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
  </svg>
);

export default function FeaturedRoomsSection() {
  return (
    <section className="section bg-cream" id="rooms">
      <div className="wrap">
        <div className="rooms-head rv">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Where you&apos;ll stay</p>
            <h2 className="h1">Featured room types</h2>
          </div>
          <Link className="link-brook" href="/motel-rooms#showcase">
            See all rooms &amp; rates <ArrowIcon />
          </Link>
        </div>

        <div className="rooms">
          <article className="room rv">
            <div className="room-media">
              <SlotImage src="/images/superior-outdoor-area.jpg" alt="SUPERIOR ROOM - OUTDOOR AREA" label="Superior · outdoor area" sub="Landscape · 3:2" />
              <span className="room-flag">Best seller</span>
            </div>
            <div className="room-body">
              <h3 className="h3">
                <Link href="/motel-rooms/superior-outdoor">SUPERIOR ROOM - OUTDOOR AREA</Link>
              </h3>
              <ul className="room-specs">
                <li>{SpecGuests}2 guests</li>
                <li>{SpecBed}1 Super King bed</li>
                <li>{SpecBuilding}Private outdoor courtyard</li>
                <li>{SpecCheck}Luxury linen</li>
              </ul>
              <div className="room-cta">
                <BookingButton
                  className="btn btn-primary"
                  roomId={SWIFTBOOK_ROOM_IDS["superior-outdoor"]}
                >
                  Book direct &amp; save
                </BookingButton>
              </div>
            </div>
          </article>

          <article className="room rv">
            <div className="room-media">
              <SlotImage src="/images/room-family-twin.jpg" alt="Deluxe Family / Twin Room" label="Family / Twin" sub="Landscape · 3:2" />
            </div>
            <div className="room-body">
              <h3 className="h3">
                <Link href="/motel-rooms/deluxe-two-doubles">Deluxe Room – 2 Double Beds</Link>
              </h3>
              <ul className="room-specs">
                <li>{SpecGuests}2–4 guests</li>
                <li>{SpecBed}2 double beds</li>
                {/* <li>{SpecBuilding}Full ground-floor access</li> */}
                <li>{SpecTv}Smart TV &amp; fibre Wi-Fi</li>
              </ul>
              <div className="room-cta">
                <BookingButton
                  className="btn btn-primary"
                  roomId={SWIFTBOOK_ROOM_IDS["deluxe-two-doubles"]}
                >
                  Book direct &amp; save
                </BookingButton>
              </div>
            </div>
          </article>

          <article className="room rv">
            <div className="room-media">
              <SlotImage src="/images/residenceimage/residence4.png" alt="The Brookside Residence" label="The Residence" sub="Landscape · 3:2" />
              <span className="room-flag">4-bedroom home</span>
            </div>
            <div className="room-body">
              <h3 className="h3">
                <Link href="/brookside-residence">The Brookside Residence</Link>
              </h3>
              <ul className="room-specs">
                <li>{SpecGuests}8 adults</li>
                <li>{SpecBed}4 bedrooms (2 Super Kings + 2 Doubles)</li>
                <li>{SpecBath}3 bathrooms</li>
                <li>{SpecSpa}Outdoor spa &amp; BBQ</li>
              </ul>
              <div className="room-cta">
                <Link className="btn btn-gold" href="/brookside-residence">
                  Explore 4-bed residence
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
