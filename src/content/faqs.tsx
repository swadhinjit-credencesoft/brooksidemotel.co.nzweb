import Link from "next/link";
import type { FaqCategory } from "@/lib/types";

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "checkin",
    number: 1,
    title: "Check-in & after-hours access",
    items: [
      {
        q: "What are your standard check-in and check-out times?",
        open: true,
        a: (
          <p>
            Standard check-in is available from <b>2:00 PM</b>, and check-out is by{" "}
            <b>10:00 AM</b>.
          </p>
        ),
      },
      {
        q: "Do you offer late check-out?",
        a: (
          <>
            <p>Late check-out may be available upon request, subject to availability.</p>
            <p className="tip">
              Tip: guests who book directly on our website receive priority consideration for
              late check-out.
            </p>
          </>
        ),
      },
      {
        q: "How do I check in if I am arriving late or after hours?",
        a: (
          <p>
            If you plan to arrive after hours, simply call our Manager on{" "}
            <b>+64 3 930 0060</b> prior to arrival, and we will guide you through our simple
            key box and self check-in process.
          </p>
        ),
      },
    ],
  },
  {
    id: "parking",
    number: 2,
    title: "Parking, EV charging & location",
    items: [
      {
        q: "Is on-site parking available, and does it cost extra?",
        a: (
          <p>
            On-site parking is <b>100% free</b> for all guests. We also have plenty of street
            parking right outside the property, making it easy to park larger work vans,
            trucks, or commercial trailers.
          </p>
        ),
      },
      {
        q: "Do you have EV charging stations?",
        a: (
          <p>
            Yes. We offer on-site Type 2 EV charging for <b>$25 overnight</b>, so your
            electric vehicle is fully charged for the day ahead.
          </p>
        ),
      },
      {
        q: "How far is Brookside Motel from Christchurch Airport and Rolleston Town Centre?",
        a: (
          <p>
            We are located under 2 km (about a 2 minute drive) from Rolleston Square and Town
            Centre, approximately 17 km (about 20 minutes) from Christchurch International
            Airport, and around 25 km (about 25 minutes) from Christchurch CBD.
          </p>
        ),
      },
    ],
  },
  {
    id: "policies",
    number: 3,
    title: "Property policies & payments",
    items: [
      {
        q: "What is your policy on smoking, vaping, and pets?",
        a: (
          <p>
            For the comfort and health of all guests, Brookside Motel is strictly a{" "}
            <b>no pets</b> and <b>no smoking or vaping in rooms</b> property.
          </p>
        ),
      },
      {
        q: "What is your cancellation and deposit policy for group bookings?",
        a: (
          <p>
            Standard individual bookings enjoy flexible cancellation terms when booked
            directly through our website. For large group bookings, a <b>25% deposit</b> is
            required in advance, with a <b>14-day cancellation policy</b>.
          </p>
        ),
      },
    ],
  },
  {
    id: "features",
    number: 4,
    title: "In-room amenities & services",
    items: [
      {
        q: "Are kitchen facilities available in the rooms?",
        a: (
          <p>
            Yes. Our rooms feature convenient kitchenette setups equipped with a microwave,
            refrigerator, electric kettle, and coffee/tea stations. If you require a full
            designer kitchen with an oven and dishwasher, consider booking our 4-bedroom
            house —{" "}
            <Link href="/brookside-residence" style={{ color: "var(--deep-gold)", textDecoration: "underline" }}>
              <b>Brookside Residence</b>
            </Link>
            .
          </p>
        ),
      },
      {
        q: "What TV channels and Wi-Fi do you provide?",
        a: (
          <p>
            Every room includes <b>free unlimited high-speed Fibre Wi-Fi</b>. In-room Smart
            TVs feature Samsung Lynk Channels, Freeview, and <b>20 Sky Channels</b>.
          </p>
        ),
      },
      {
        q: "Do you have laundry facilities on-site?",
        a: (
          <p>
            Yes. Guest laundry facilities are available upon request — ideal for longer
            corporate stays or travelling families.
          </p>
        ),
      },
    ],
  },
];
