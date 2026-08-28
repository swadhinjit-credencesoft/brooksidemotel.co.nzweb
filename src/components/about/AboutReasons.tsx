import { ABOUT_REASONS } from "@/content";

function getReasonIcon(icon: string) {
  switch (icon) {
    case "hotel":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 21V9l9-6 9 6v12" />
          <path d="M9 21v-7h6v7" />
        </svg>
      );
    case "map":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "home":
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 20h20" />
        </svg>
      );
  }
}

export default function AboutReasons() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">What sets us apart</p>
          <h2 className="h1">Three reasons guests come back</h2>
        </div>
        <div className="trio rv">
          {ABOUT_REASONS.map((reason) => (
            <div key={reason.title} className="trio-card">
              <div className="t-ico">{getReasonIcon(reason.icon)}</div>
              <h4>{reason.title}</h4>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

