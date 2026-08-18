import BookingButton from "@/components/ui/BookingButton";
import GuidePost from "@/components/guide/GuidePost";

export default function PostAirport() {
  return (
    <GuidePost
      id="post-airport"
      tag="Travel tips"
      title="20 Minutes from Christchurch Airport: Stress-Free Stopovers at Brookside Motel"
      image={{
        src: "/images/post-airport.jpg",
        alt: "Relaxing suite near Christchurch Airport",
        label: "Airport / relaxing suite",
        sub: "Landscape · 19:10",
      }}
      cta={
        <>
          <b>Book your airport stopover today</b>
          <p>
            Brand-new rooms, luxury bedding, free high-speed Fibre Wi-Fi, and genuine Kiwi
            hospitality just 20 minutes from Christchurch Airport.
          </p>
          <BookingButton className="btn btn-primary">Book your stay directly</BookingButton>
        </>
      }
    >
      <p>
        When flying into or out of Christchurch International Airport, finding comfortable,
        quiet accommodation is key to a smooth journey. While staying at an immediate airport
        hotel might seem convenient at first glance, traveller reviews often tell a different
        story: expensive room rates, high daily parking charges, aircraft flight-path noise,
        and rigid check-in policies.
      </p>
      <p>
        Located just 17 km (about a 20 minute drive) south of the terminal, Brookside Motel in
        Rolleston offers a smarter, quieter, and far more cost-effective alternative.
      </p>

      <h3>1. Skip the flight-path noise for true sleep</h3>
      <p>
        There is nothing worse than trying to rest before an early flight while jet engines
        rumble outside your window. Situated in a peaceful residential pocket of Rolleston,
        Brookside Motel delivers genuine quiet.
      </p>
      <p>
        Built in late 2025, our modern units feature double-glazed insulation, guest-controlled
        climate control heat pumps, blackout curtains, and luxury Super King beds designed for
        deep, uninterrupted rest.
      </p>

      <h3>2. Effortless 20-minute highway drive</h3>
      <p>Reaching Brookside Motel from Christchurch Airport is completely straightforward:</p>
      <ol>
        <li>Exit Christchurch International Airport via Johns Road / State Highway 78.</li>
        <li>Connect onto the Southern Motorway (SH1) heading south.</li>
        <li>Take the Rolleston exit onto Brookside Road.</li>
      </ol>
      <p>
        In under 20 minutes you will arrive at our quiet property without having to navigate
        congested city-centre streets or multi-storey parking garages.
      </p>

      <h3>3. Seamless after-hours &amp; self check-in</h3>
      <p>
        Flight delays happen. If your flight lands late into Christchurch Airport, you
        don&apos;t need to worry about a closed front desk. Simply call our on-site manager on
        +64 3 930 0060 prior to landing, and we will arrange key box codes for a smooth,
        hassle-free self check-in no matter the hour.
      </p>

      <h3>4. Massive savings: free parking &amp; direct rates</h3>
      <p>
        Airport hotels are notorious for charging premium nightly rates alongside extra fees
        for overnight parking. At Brookside Motel, we keep things simple and transparent:
      </p>
      <ul>
        <li>
          <b>100% free on-site parking:</b> Park right outside your door without paying a
          cent.
        </li>
        <li>
          <b>Direct booking perks:</b> By booking directly on our website you avoid third-party
          travel agent markup fees.
        </li>
      </ul>

      <h3>5. Ideal base for starting a South Island road trip</h3>
      <p>
        If Christchurch Airport is your landing gateway for a South Island road trip, Rolleston
        is the perfect starting point. Positioned right on State Highway 1, staying at
        Brookside Motel lets you get a head start toward Arthur&apos;s Pass, the West Coast,
        Lake Tekapo, or Queenstown the following morning — completely bypassing Christchurch
        city traffic. With three major supermarkets and local cafés right around the corner,
        stocking up on road trip supplies is a breeze.
      </p>
    </GuidePost>
  );
}
