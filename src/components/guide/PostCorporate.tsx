import BookingButton from "@/components/ui/BookingButton";
import GuidePost from "@/components/guide/GuidePost";

export default function PostCorporate() {
  return (
    <GuidePost
      id="post-corporate"
      tag="Corporate travel"
      title="Why Rolleston is the Smart Base for Corporate Travellers in Canterbury"
      image={{
        src: "/images/post-corporate.jpg",
        alt: "Modern workspace in a Brookside Motel suite",
        label: "Modern workspace / suite",
        sub: "Landscape · 19:10",
      }}
      cta={
        <>
          <b>Book your corporate stay direct</b>
          <p>
            Book directly with us to secure flexible cancellation terms and priority
            consideration for late check-out.
          </p>
          <BookingButton className="btn btn-primary">Reserve your corporate stay</BookingButton>
        </>
      }
    >
      <p>
        For corporate travellers, contractors, and business representatives working across the
        Canterbury region, choosing where to stay can make or break a productive trip. While
        many default to inner-city Christchurch hotels, smart business travellers are
        increasingly turning to Rolleston.
      </p>
      <p>
        Positioned right alongside the Christchurch Southern Motorway, Rolleston provides the
        perfect strategic middle ground: immediate connectivity to major commercial hubs
        without the delays of inner-city traffic, paid parking hassles, or cramped hotel
        rooms. Opened in October 2025, Brookside Motel is purpose-built to give corporate
        guests a frictionless, restful base.
      </p>

      <h3>1. Unbeatable motorway &amp; airport connectivity</h3>
      <p>Time is money when you are on a business schedule. Brookside Motel places you right where you need to be:</p>
      <ul>
        <li>
          <b>Christchurch International Airport (17 km / ~20 mins):</b> A quick, stress-free
          drive to your flight without fighting urban morning traffic.
        </li>
        <li>
          <b>Christchurch CBD (25 km / ~25 mins):</b> The Southern Motorway link allows you
          to reach central Christchurch meetings swiftly.
        </li>
        <li>
          <b>Izone &amp; Rolleston Industrial Parks (~5 mins):</b> Right on the doorstep of
          one of Canterbury&apos;s largest commercial and industrial logistics hubs.
        </li>
      </ul>

      <h3>2. Designed around corporate productivity</h3>
      <p>
        A productive business trip requires more than just a bed. Every unit at Brookside
        Motel is equipped with practical amenities designed for corporate performance:
      </p>
      <ul>
        <li>
          <b>Ultra-fast free Fibre Wi-Fi:</b> Unlimited high-speed internet in every room
          ensures seamless video conferencing, large file uploads, and continuous
          connectivity.
        </li>
        <li>
          <b>Dedicated work desks &amp; power outlets:</b> Comfortable, well-lit desk areas
          positioned near power sockets so you can set up your mobile workstation.
        </li>
        <li>
          <b>Samsung Lynk &amp; 20 Sky Channels:</b> Catch up on news, finance, and sport on
          in-room Smart TVs featuring Freeview and 20 Sky Channels.
        </li>
      </ul>

      <h3>3. Stress-free parking &amp; EV infrastructure</h3>
      <p>
        Finding parking or paying high daily parking fees in the CBD adds unnecessary friction
        to your travel expense claims.
      </p>
      <ul>
        <li>
          <b>Free on-site &amp; street parking:</b> Ample, 100% free parking directly outside
          your room. Our spacious layout easily accommodates large work vans, utility
          vehicles, and commercial trailers.
        </li>
        <li>
          <b>On-site Type 2 EV charging:</b> Travelling in an electric vehicle? Plug in
          overnight for just $25 and wake up with a full charge, ready for your day of
          meetings.
        </li>
      </ul>

      <h3>4. Deep rest &amp; flexible after-hours arrival</h3>
      <p>
        A good night&apos;s sleep is non-negotiable before an important meeting. Opened in
        late 2025, our rooms feature brand-new double glazing, guest-controlled heat pumps and
        air conditioning, and high-end Super King beds with luxury linens.
      </p>
      <p>
        Running late due to delayed flights or long site visits? Simply call our manager prior
        to arrival, and our secure self check-in key box system ensures you can access your
        room no matter what time you arrive.
      </p>

      <h3>5. Corporate group options: The Brookside Residence</h3>
      <p>
        Travelling with a team or managing a longer-term regional contract? In addition to our
        individual motel suites, we offer The Brookside Residence — a flagship 4-bedroom,
        3-bathroom private home. Featuring a full designer kitchen, an 85-inch Smart TV
        lounge, high-speed Wi-Fi, and a private outdoor spa, it provides corporate work crews
        with a premium home away from home.
      </p>
    </GuidePost>
  );
}
