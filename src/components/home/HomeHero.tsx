import Link from "next/link";
import HeroMedia from "@/components/ui/HeroMedia";

export default function HomeHero() {
  return (
    <section className="hero">
      <HeroMedia />
      <div className="hero-scrim"></div>
      <div className="hero-inner wrap">
        <div className="hero-copy">
          <p className="hero-eyebrow">Opened October 2025 · Rolleston, Canterbury</p>
          <h1 className="display">
            Brand-New Luxury &amp;
            <br />
            Modern Comfort in <em>Rolleston</em>
          </h1>
          <p className="hero-sub">
            Quiet, modern motel accommodation and private luxury residences, just 20 minutes
            from Christchurch Airport.
          </p>
          <div className="hero-actions">
            {/* <a className="btn btn-cream" href="/book">
              Search availability
            </a> */}
            <Link className="btn btn-ghost-light" href="/motel-rooms">
              View motel rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
