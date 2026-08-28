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
        aText:
          "Standard check-in is available from 2:00 PM, and check-out is by 10:00 AM.",
        a: (
          <p>
            Standard check-in is available from <b>2:00 PM</b>, and check-out is by{" "}
            <b>10:00 AM</b>.
          </p>
        ),
      },
      {
        q: "Do you offer late check-out?",
        aText:
          "Late check-out may be available upon request, subject to availability. Guests who book directly receive priority consideration.",
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
        aText:
          "If you plan to arrive after hours, simply call our Manager on +64 3 930 0060 prior to arrival, and we will guide you through our simple key box and self check-in process.",
        a: (
          <p>
            If you plan to arrive after hours, simply call our Manager on{" "}
            <b>+64 3 930 0060</b> prior to arrival, and we will guide you through our simple
            key box and self check-in process.
          </p>
        ),
      },
      {
        q: "What are your front desk hours?",
        aText:
          "Our front desk is open 7:00 AM – 7:00 PM daily. For arrivals outside these hours, we offer a simple self check-in process — just call us beforehand.",
        a: (
          <p>
            Our front desk is open <b>7:00 AM – 7:00 PM daily</b>. For arrivals outside
            these hours, we offer a simple self check-in process — just call us beforehand
            and we will set everything up for you.
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
        aText:
          "On-site parking is 100% free for all guests. We also have plenty of street parking right outside the property, making it easy to park larger work vans, trucks, or commercial trailers.",
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
        aText:
          "Yes. We offer on-site Type 2 EV charging for $25 overnight, so your electric vehicle is fully charged for the day ahead.",
        a: (
          <p>
            Yes. We offer on-site Type 2 EV charging for <b>$25 overnight</b>, so your
            electric vehicle is fully charged for the day ahead.
          </p>
        ),
      },
      {
        q: "How far is Brookside Motel from Christchurch Airport and Rolleston Town Centre?",
        aText:
          "We are located under 2 km (about a 2 minute drive) from Rolleston Square and Town Centre, approximately 17 km (about 20 minutes) from Christchurch International Airport, and around 25 km (about 25 minutes) from Christchurch CBD. We are also just a 5-minute walk from Rolleston Train Station.",
        a: (
          <p>
            We are located under 2 km (about a 2 minute drive) from Rolleston Square and Town
            Centre, approximately 17 km (about 20 minutes) from Christchurch International
            Airport, and around 25 km (about 25 minutes) from Christchurch CBD. We are also
            just a 5-minute walk from Rolleston Train Station, making it easy to travel to and
            from Christchurch city.
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
        aText:
          "For the comfort and health of all guests, Brookside Motel is strictly a no pets and no smoking or vaping in rooms property.",
        a: (
          <p>
            For the comfort and health of all guests, Brookside Motel is strictly a{" "}
            <b>no pets</b> and <b>no smoking or vaping in rooms</b> property.
          </p>
        ),
      },
      {
        q: "What is your cancellation and deposit policy for group bookings?",
        aText:
          "Standard individual bookings enjoy flexible cancellation terms when booked directly through our website. For large group bookings, a 25% deposit is required in advance, with a 14-day cancellation policy.",
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
        aText:
          "Yes. Our rooms feature convenient kitchenette setups equipped with a microwave, refrigerator, electric kettle, and coffee/tea stations. If you require a full designer kitchen, consider booking the Brookside Residence — our 4-bedroom house.",
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
        aText:
          "Every room includes free unlimited high-speed Fibre Wi-Fi. In-room Smart TVs feature Samsung Lynk Channels, Freeview, and 20 Sky Channels.",
        a: (
          <p>
            Every room includes <b>free unlimited high-speed Fibre Wi-Fi</b>. In-room Smart
            TVs feature Samsung Lynk Channels, Freeview, and <b>20 Sky Channels</b>.
          </p>
        ),
      },
      {
        q: "Do you have laundry facilities on-site?",
        aText:
          "Yes. Guest laundry facilities are available upon request — ideal for longer corporate stays or travelling families.",
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
