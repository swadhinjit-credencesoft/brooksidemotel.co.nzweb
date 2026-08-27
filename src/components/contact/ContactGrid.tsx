import { PHONE_TEL, EMAIL_STAY, MAPS_URL } from "@/lib/site";

export default function ContactGrid() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="contact-grid rv">
          <div className="contact-card">
            <p className="eyebrow">Direct contact</p>
            <h3 className="h2">Get in touch</h3>
            <ul className="cinfo">
              <li>
                <span className="c-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <span className="c-l">Physical address</span>
                  <a
                    className="c-v"
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    12 Brookside Road, Rolleston 7614, Canterbury
                  </a>
                </div>
              </li>
              <li>
                <span className="c-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <div>
                  <span className="c-l">Phone</span>
                  <a className="c-v" href={PHONE_TEL}>
                    +64 3 930 0060
                  </a>
                  <span className="c-v" style={{ fontSize: "13.5px", color: "var(--sage-text)" }}>
                    Call for reservations or after-hours check-in
                  </span>
                </div>
              </li>
              <li>
                <span className="c-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </span>
                <div>
                  <span className="c-l">Email</span>
                  <a className="c-v" href={`mailto:${EMAIL_STAY}`}>
                    {EMAIL_STAY}
                  </a>
                </div>
              </li>
              <li>
                <span className="c-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                </span>
                <div>
                  <span className="c-l">Reception / check-in hours</span>
                  <span className="c-v">
                    Check-in from 2:00 PM &nbsp;·&nbsp; Check-out by 10:00 AM
                    <br />
                    <span style={{ fontSize: "13.5px", color: "var(--sage-text)" }}>
                      After-hours self check-in available via key box upon calling management.
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-card dark">
            <p className="eyebrow on-dark">Driving times &amp; transit</p>
            <h3 className="h2">How far is everything?</h3>
            <ul className="drive" style={{ marginTop: "var(--s3)" }}>
              <li>
                <span className="d-time" style={{ color: "var(--gold-light)" }}>
                  20<sup style={{ color: "var(--mist-sage)" }}>min</sup>
                </span>
                <span className="d-place">
                  <b style={{ color: "var(--alpine-cream)" }}>Christchurch International Airport</b>
                  <span style={{ color: "var(--mist-sage)" }}>Approximately 17 km</span>
                </span>
              </li>
              <li>
                <span className="d-time" style={{ color: "var(--gold-light)" }}>
                  25<sup style={{ color: "var(--mist-sage)" }}>min</sup>
                </span>
                <span className="d-place">
                  <b style={{ color: "var(--alpine-cream)" }}>Christchurch Central / CBD</b>
                  <span style={{ color: "var(--mist-sage)" }}>Approximately 25–26 km</span>
                </span>
              </li>
              <li>
                <span className="d-time" style={{ color: "var(--gold-light)" }}>
                  2<sup style={{ color: "var(--mist-sage)" }}>min</sup>
                </span>
                <span className="d-place">
                  <b style={{ color: "var(--alpine-cream)" }}>Rolleston Square / Town Centre</b>
                  <span style={{ color: "var(--mist-sage)" }}>Under 2 km</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
