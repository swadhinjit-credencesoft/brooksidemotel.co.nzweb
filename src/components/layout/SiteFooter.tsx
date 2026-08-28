import Link from "next/link";
import {
  SITE_NAME,
  ADDRESS_LINES,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL_STAY,
  MAPS_URL,
} from "@/lib/site";

export default function SiteFooter() {
  return (
    <>
      {/* <svg
        className="ridge"
        viewBox="0 0 1400 74"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 74h1400V30l-112 14-122-22-130 18-114-26-136 20-122-18-128 24-120-22-122 16-112-20-98 18-84-10V74z"
        />
      </svg> */}
      <footer className="footer" id="contact">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="footer-logo"
                src="/logos/logo-cream.png"
                alt={SITE_NAME}
                width={232}
                height={46}
              />
              <p className="footer-note">
                Brand-new luxury motel accommodation in Rolleston, Canterbury.
              </p>
              {/* <div className="socials">
                <a href="#" aria-label="Facebook" data-todo="social-url">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" data-todo="social-url">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="3.6" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div> */}
            </div>
            <div>
              <p className="footer-heading">Quick links</p>
              <ul>
                <li>
                  <Link href="/motel-rooms">Rooms</Link>
                </li>
                <li>
                  <Link href="/amenities">Amenities</Link>
                </li>
                <li>
                  <Link href="/brookside-residence">Brookside Residence</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/local-guide">Local Guide</Link>
                </li>
                <li>
                  <Link href="/manage-booking">Manage Booking</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading">Direct contact</p>
              <ul>
                <li>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ADDRESS_LINES[0]}
                    <br />
                    {ADDRESS_LINES[1]}
                  </a>
                </li>
                <li style={{ marginTop: 14 }}>
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL_STAY}`}>{EMAIL_STAY}</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading">Book direct</p>
              <div className="staah-badge">
                <div className="bk-ico">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M20 7h-9M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <b>Secure direct booking</b>
                <span>Powered by STAAH — flexible terms, direct support</span>
              </div>
            </div>
          </div>
          <div className="footer-base">
            <span>Copyright &copy; 2026 Brookside Motel.</span>
            <nav>
              <Link href="/privacy/">Privacy</Link>
              <Link href="/terms/">Terms</Link>
              <Link href="/accessibility/">Accessibility</Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
