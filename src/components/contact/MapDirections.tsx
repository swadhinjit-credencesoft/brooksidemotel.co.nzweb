const mapPin = (
  <span className="map-pin">
    <span className="pin-label">Brookside Motel · 12 Brookside Rd</span>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#3A4E48">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.6" fill="#EFE6DD" />
    </svg>
  </span>
);

export default function MapDirections() {
  return (
    <section className="section bg-paper" id="map">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Finding us</p>
          <h2 className="h1">Interactive map &amp; driving directions</h2>
        </div>
        <div className="rv">
          <div className="map-frame" style={{ aspectRatio: "16/7" }}>
            <svg className="mapart" viewBox="0 0 1200 525" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="1200" height="525" fill="#E1ECE9" />
              <g stroke="#C0D3CD" strokeWidth="14" fill="none">
                <path d="M-20 330 H1220" />
                <path d="M600 -20 V545" />
              </g>
              <g stroke="#CBDAD5" strokeWidth="5" fill="none">
                <path d="M-20 140 H1220" />
                <path d="M-20 240 H1220" />
                <path d="M-20 440 H1220" />
                <path d="M220 -20 V545" />
                <path d="M420 -20 V545" />
                <path d="M820 -20 V545" />
                <path d="M1000 -20 V545" />
              </g>
              <path d="M-20 70 C 180 110, 380 40, 560 100 S 900 170, 1220 120" stroke="#6E97A6" strokeWidth="8" fill="none" opacity=".5" />
              <g fill="#D6E3DE">
                <rect x="250" y="170" width="130" height="130" rx="7" />
                <rect x="640" y="160" width="110" height="100" rx="7" />
                <rect x="240" y="380" width="150" height="80" rx="7" />
                <rect x="860" y="370" width="120" height="90" rx="7" />
                <rect x="1020" y="180" width="120" height="110" rx="7" />
              </g>
              <text x="612" y="60" fontFamily="Poppins,sans-serif" fontSize="15" fill="#6E8C84" letterSpacing="2">
                SH1 · SOUTHERN MOTORWAY
              </text>
            </svg>
            {mapPin}
            <span className="map-note">Illustrative map — embed live Google Maps at build</span>
          </div>

          <div className="directions">
            <b>Arriving via Southern Motorway (SH1)</b>
            <p>
              Take the Rolleston exit onto Brookside Road. We are conveniently situated just off
              the main arterial route, offering easy access for cars, vans, and commercial
              vehicles with free on-site and street parking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
