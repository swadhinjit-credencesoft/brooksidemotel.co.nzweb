export default function TrustSection() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">Trust &amp; value</p>
          <h2 className="h1">Why book directly at Brookside Motel?</h2>
        </div>
        <div className="perks rv" style={{ marginTop: 0 }}>
          <div className="perk">
            <div className="perk-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
            </div>
            <h4>Direct manager support</h4>
            <p>
              Book direct and you deal with the motel itself, not a call centre — with no
              third-party booking fees added to your stay.
            </p>
          </div>
          <div className="perk">
            <div className="perk-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </div>
            <h4>Priority late check-out</h4>
            <p>Direct guests receive priority consideration for late check-out, subject to availability.</p>
          </div>
          <div className="perk">
            <div className="perk-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </div>
            <h4>Flexible cancellation policies</h4>
            <p>Amend or cancel on flexible terms, handled by the front desk rather than a third party.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
