import { PHONE_DISPLAY, PHONE_TEL, EMAIL_RESERVATIONS, STREET, MAPS_URL } from "@/lib/site";

export default function UtilityBar() {
  const threeItems = (
    <>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="View Brookside Motel on Google Maps"
        className="u-item"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{STREET}</span>
      </a>

      <span className="u-dot" aria-hidden="true">•</span>

      <a href={PHONE_TEL} className="u-item" title="Call Brookside Motel">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
        <span>{PHONE_DISPLAY}</span>
      </a>

      <span className="u-dot" aria-hidden="true">•</span>

      <a href={`mailto:${EMAIL_RESERVATIONS}`} className="u-item" title="Email Brookside Motel reservations">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
        <span>{EMAIL_RESERVATIONS}</span>
      </a>

      <span className="u-dot" aria-hidden="true">•</span>
    </>
  );

  return (
    <div className="utility">
      {/* Desktop static layout */}
      <div className="wrap u-desktop">
        <div className="u-group">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="View Brookside Motel on Google Maps"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {STREET}
          </a>
        </div>
        <div className="u-group">
          <a href={PHONE_TEL}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL_RESERVATIONS}`}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            {EMAIL_RESERVATIONS}
          </a>
        </div>
      </div>

      {/* Mobile/Responsive floating scroll ticker (Right to Left - 3 items only) */}
      <div className="u-mobile-ticker" role="region" aria-label="Quick contact and location ticker">
        <div className="u-ticker-track">
          <div className="u-ticker-content">
            {threeItems}
          </div>
          <div className="u-ticker-content" aria-hidden="true">
            {threeItems}
          </div>
        </div>
      </div>
    </div>
  );
}

