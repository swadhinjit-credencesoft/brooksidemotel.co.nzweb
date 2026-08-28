import Link from "next/link";
import { OVERVIEW_AMENITIES } from "@/content";

function getAmenityIcon(icon: string) {
  switch (icon) {
    case "bolt":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M13 2 5 14h6l-2 8 8-12h-6l2-8z" />
        </svg>
      );
    case "wifi":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" />
        </svg>
      );
    case "car":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M3 17h18M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8M7 21h2M15 21h2" />
          <circle cx="8" cy="13" r="1" />
          <circle cx="16" cy="13" r="1" />
        </svg>
      );
    case "tv":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "sun":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx="12" cy="12" r="3.6" />
        </svg>
      );
    case "washer":
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <circle cx="12" cy="13" r="4.5" />
          <path d="M8 6h.01M12 6h.01" />
        </svg>
      );
  }
}

export default function AmenitiesSection() {
  return (
    <section className="section bg-pine" id="amenities">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">On-site amenities</p>
          <h2 className="h1">Everything already handled</h2>
          <p>The things that make a stay easy, included as standard across the property.</p>
        </div>
        <div className="amen rv">
          {OVERVIEW_AMENITIES.map((amen) => (
            <div key={amen.title} className="amen-item">
              <div className="amen-ico">{getAmenityIcon(amen.icon)}</div>
              <div>
                <h5>{amen.title}</h5>
                <p>{amen.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="sec-foot rv">
          <Link className="btn btn-ghost-light" href="/amenities">
            View all amenities
          </Link>
        </p>
      </div>
    </section>
  );
}

