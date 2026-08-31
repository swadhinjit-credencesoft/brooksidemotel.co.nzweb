import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ContourArt from "@/components/ui/ContourArt";
import SlotImage from "@/components/ui/SlotImage";

const CheckIco = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MOTEL_REASONS: { text: string; sub: string }[] = [
{ text: "Brand-new motel", sub: "Comfortable stays, thoughtfully designed" },
  { text: "Exceptionally clean", sub: "Genuinely deep-cleaned, every day" },
  { text: "Super King beds", sub: "High-end luxury bedding" },
  { text: "Free parking at your door", sub: "Directly outside every unit" },
  { text: "Fast Fibre Wi-Fi", sub: "High-speed & unlimited" },
  { text: "Heat pump / air-conditioning", sub: "Guest-controlled in every room" },
  { text: "Smart TV", sub: "20 Sky channels & Freeview" },
  { text: "Easy motorway access", sub: "Right by the SH1 interchange" },
  { text: "20 min from Christchurch Airport", sub: "Short, simple drive" },
  { text: "Close to Rolleston town centre", sub: "Under 2 minutes away" },
  { text: "Corporate & crew friendly", sub: "Work vans welcome, ground-floor rooms" },
];

export default function WelcomeSection() {
  return (
    <section className="section bg-paper contour" id="welcome">
      <ContourArt variant="c" />
      <div className="wrap">
        <div className="welcome-grid">
          <div className="welcome-copy rv">
            <p className="eyebrow">Welcome to Brookside Motel</p>
            <h2 className="h1">
              Everything You Need for an Easy,
              <br />
              Comfortable Stay
            </h2>
            <p className="lead" style={{ marginTop: "var(--s3)" }}>
              At Brookside Motel, our philosophy is simple: nail the essentials, every time.
              Opened in October 2025, we offer brand-new, genuinely clean, and modern rooms
              designed around deep rest and effortless convenience.
            </p>
            <p style={{ color: "var(--sage-text)", marginTop: "var(--s3)" }}>
              Situated right by the Motorway and an easy walk to Rolleston&apos;s vibrant shops
              and cafés, we provide the perfect base for corporate guests, weekend event-goers,
              and regional travellers. Expect high-end luxury bedding, premium toiletries, and
              warm, reliable service from the moment you arrive.
            </p>
            <ul className="welcome-diffs">
              {MOTEL_REASONS.map((r) => (
                <li key={r.text}>
                  <span className="wd-ico" aria-hidden="true">
                    {CheckIco}
                  </span>
                  <span className="wd-text">
                    <b>{r.text}</b>
                    <small>{r.sub}</small>
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "var(--s4)" }}>
              <Link className="link-brook" href="/about-us">
                More about Brookside <ArrowIcon />
              </Link>
            </p>
            <div className="welcome-sign">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mark" src="/logos/welcome-mark.png" alt="Brookside Motel emblem" width={54} height={54} />
              <p>
                Brand-new luxury motel accommodation
                <br />
                in Rolleston, Canterbury.
              </p>
            </div>
          </div>
          <div className="photo-stack rv">
            <figure className="arch p1" style={{ margin: 0 }}>
              <SlotImage src="/images/welcome-room.jpg" alt="Modern motel room interior" label="Room interior" sub="Portrait · 2:3" />
            </figure>
            <figure className="arch p2" style={{ margin: 0 }}>
              <SlotImage src="/images/welcome-detail.jpg" alt="Luxury bedding detail" label="Detail" sub="2:3" size={24} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}