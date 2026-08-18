import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function LocationSection() {
  return (
    <section className="section bg-paper" id="location">
      <div className="wrap">
        <div className="loc-grid">
          <div className="rv">
            <div className="map-frame">
              <svg className="mapart" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="600" height="480" fill="#E1ECE9" />
                <g stroke="#C0D3CD" strokeWidth="10" fill="none">
                  <path d="M-20 340 H620" />
                  <path d="M300 -20 V500" />
                </g>
                <g stroke="#CBDAD5" strokeWidth="4" fill="none">
                  <path d="M-20 150 H620" />
                  <path d="M-20 250 H620" />
                  <path d="M-20 430 H620" />
                  <path d="M120 -20 V500" />
                  <path d="M450 -20 V500" />
                  <path d="M540 -20 V500" />
                </g>
                <path d="M-20 60 C 120 90, 260 40, 380 96 S 560 150, 640 120" stroke="#6E97A6" strokeWidth="7" fill="none" opacity=".55" />
                <g fill="#D6E3DE">
                  <rect x="150" y="180" width="110" height="120" rx="6" />
                  <rect x="350" y="180" width="80" height="90" rx="6" />
                  <rect x="150" y="370" width="130" height="70" rx="6" />
                  <rect x="360" y="370" width="100" height="70" rx="6" />
                </g>
              </svg>
              <div className="map-pin">
                <span className="pin-label">Brookside Motel</span>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#3A4E48" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.6" fill="#EFE6DD" />
                </svg>
              </div>
              <span className="map-note">Illustrative map — embed live Google Maps at build</span>
            </div>
          </div>
          <div className="rv">
            <p className="eyebrow">Location</p>
            <h2 className="h1">Minutes From Everywhere You Need to Be</h2>
            <ul className="drive">
              <li>
                <span className="d-time">
                  20<sup>min</sup>
                </span>
                <span className="d-place">
                  <b>Christchurch International Airport</b>
                  <span>Approximately 17 km by road</span>
                </span>
              </li>
              <li>
                <span className="d-time">
                  25<sup>min</sup>
                </span>
                <span className="d-place">
                  <b>Christchurch Central / CBD</b>
                  <span>Approximately 25 km by road</span>
                </span>
              </li>
              <li>
                <span className="d-time">
                  2<sup>min</sup>
                </span>
                <span className="d-place">
                  <b>Rolleston Square &amp; Town Centre</b>
                  <span>Under 2 km — an easy walk or a short drive</span>
                </span>
              </li>
            </ul>
            <div className="dining">
              <p>
                <b>Hungry?</b> Walk or drive minutes to over 15 local eateries, including
                Joe&apos;s Garage, Origami, and Black &amp; White Coffee Cartel.
              </p>
            </div>
            <p style={{ marginTop: "var(--s4)" }}>
              <Link className="link-brook" href="/local-guide">
                Explore the local guide <ArrowIcon />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
