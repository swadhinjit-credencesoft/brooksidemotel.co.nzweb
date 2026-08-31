import Link from "next/link";
import HeroMedia from "@/components/ui/HeroMedia";

export default function HomeHero() {
  return (
    <section className="hero">
      <HeroMedia />
      <div className="hero-scrim"></div>
      <div className="hero-inner wrap">
        <div className="hero-copy">
          <p className="hero-eyebrow"> Rolleston, Canterbury</p>
          <h1 className="display">
          Brand-New Motel Accommodation 
            <br />
            Modern Comfort in <em>Rolleston</em>
          </h1>
          <p className="hero-sub">
          Modern, exceptionally clean rooms with free parking, fast Wi-Fi and easy motorway access — just 20 minutes from Christchurch Airport.
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
