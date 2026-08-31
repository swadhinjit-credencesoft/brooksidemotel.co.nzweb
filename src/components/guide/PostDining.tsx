import BookingButton from "@/components/ui/BookingButton";
import GuidePost from "@/components/guide/GuidePost";

export default function PostDining() {
  return (
    <GuidePost
      id="post-dining"
      tag="Local dining guide"
      title="Where to Eat in Rolleston: The Ultimate Local Dining &amp; Café Guide"
      image={{
        src: "/images/post-dining.jpg",
        alt: "Local café in Rolleston",
        label: "Local food &amp; café",
        sub: "Landscape · 19:10",
      }}
      cta={
        <>
          <b>Plan your stay at Brookside Motel</b>
          <p>
            Located right by the motorway at 12 Brookside Road, our brand-new motel units
            feature luxury bedding, guest-controlled heat pumps, and ultra-fast Fibre Wi-Fi.
          </p>
          <BookingButton className="btn btn-primary">Book direct &amp; save on your room rates</BookingButton>
        </>
      }
    >
      <p>
        Over the last few years, Rolleston has transformed from a quiet township into one of
        Canterbury&apos;s most vibrant, fast-growing hubs. With new families, corporate
        developments, and visitors arriving every week, the local food scene has exploded into
        a genuine dining destination.
      </p>
      <p>
        Whether you are staying at Brookside Motel for business, attending a weekend event, or
        travelling through the Selwyn District, you don&apos;t need to drive into Christchurch
        CBD to enjoy world-class coffee, casual takeaways, or an outstanding sit-down dinner.
        Everything you need sits under two minutes from our front door.
      </p>

      <h3>1. Morning coffee &amp; local cafés</h3>
      <p>If you believe a great day starts with exceptional espresso, Rolleston won&apos;t disappoint.</p>
      <ul>
        <li>
          <b>Black &amp; White Coffee Cartel:</b> Located just minutes from Brookside Motel,
          this is the local go-to for serious coffee lovers. Roasting their beans on-site,
          they serve rich, micro-batched coffee alongside a cabinet packed with savoury
          pastries, gourmet toasties, and sweet treats. The perfect spot to kickstart your
          workday or grab a quick takeaway.
        </li>
      </ul>

      <h3>2. Pub classics &amp; craft beer</h3>
      <p>Looking for a relaxed atmosphere to unwind after a long drive or a day on the job?</p>
      <ul>
        <li>
          <b>Joe&apos;s Garage:</b> A Kiwi classic known for its relaxed, industrial vibe,
          ideal for a cold local pint, hearty pub fare, or a casual dinner with colleagues.
          From legendary burgers and loaded fries to slow-cooked ribs, it&apos;s a welcoming
          spot to kick back and watch the game.
        </li>
      </ul>

      <h3>3. Sit-down global dining</h3>
      <p>
        Rolleston&apos;s international restaurant scene offers incredible variety within a
        two-minute drive of your room:
      </p>
      <ul>
        <li>
          <b>Origami (Japanese):</b> Beautifully presented sushi, sizzling teriyaki, and
          authentic ramen — crisp, modern Japanese dining in the Selwyn District.
        </li>
        <li>
          <b>The Turkish Grill Bar &amp; Restaurant:</b> Rich, flavourful kebabs, mezze
          platters, and flame-grilled meats served with warm, authentic hospitality.
        </li>
        <li>
          <b>Ratana Italian Restaurant &amp; Pizzeria:</b> Authentic wood-fired pizza and
          homemade pasta in a cosy atmosphere for romantic dinners or family gatherings.
        </li>
        <li>
          <b>Corianders &amp; Thai Terrace:</b> Corianders serves classic Indian curries,
          while Thai Terrace offers fragrant, fresh Thai dishes full of traditional flavour.
        </li>
        <li>
          <b>The Phenix, Hello Vietnam &amp; Orange House:</b> Everything from sizzling
          Chinese favourites to fresh Vietnamese pho and pan-Asian delicacies.
        </li>
      </ul>

      <h3>4. Quick casual bites &amp; takeaways</h3>
      <p>
        Want a quick, hassle-free meal to enjoy in the comfort of your air-conditioned motel
        suite?
      </p>
      <ul>
        <li>
          <b>Burger Wisconsin &amp; Smoke Rolleston:</b> Premium, gourmet handcrafted burgers
          and slow-smoked barbecue meats.
        </li>
        <li>
          <b>Pizza Club Rolleston &amp; Mexicali Fresh:</b> Fast-casual pizza and fresh
          Mexican burritos and tacos.
        </li>
      </ul>

      <h3>5. Supermarkets for extended stays</h3>
      <p>
        If you&apos;re staying in our BROOKSIDE RESIDENCE or using your room&apos;s in-room
        kitchenette, grocery shopping is completely hassle-free. Rolleston has three major
        full-scale supermarkets just minutes away:
      </p>
      <ul>
        <li>PAK&apos;nSAVE Rolleston</li>
        <li>New World Rolleston</li>
        <li>Woolworths / Countdown Rolleston</li>
      </ul>
    </GuidePost>
  );
}
