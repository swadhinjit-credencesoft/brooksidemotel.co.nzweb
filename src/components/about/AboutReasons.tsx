export default function AboutReasons() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">What sets us apart</p>
          <h2 className="h1">Three reasons guests come back</h2>
        </div>
        <div className="trio rv">
          <div className="trio-card">
            <div className="t-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 21V9l9-6 9 6v12" />
                <path d="M9 21v-7h6v7" />
              </svg>
            </div>
            <h4>Brand-new standards</h4>
            <p>Opened in late 2025 with modern architecture, double glazing, heat pumps, and luxury Super King beds.</p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4>Effortless location</h4>
            <p>Located right by the Motorway, 2 minutes from Rolleston Square, and 20 minutes from Christchurch Airport.</p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 20h20" />
              </svg>
            </div>
            <h4>Versatile accommodation</h4>
            <p>Offering ground-floor motel units for short stays and our 4-bedroom private residence for larger families or long-stay corporate teams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
