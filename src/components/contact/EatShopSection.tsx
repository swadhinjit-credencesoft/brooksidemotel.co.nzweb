export default function EatShopSection() {
  return (
    <section className="section bg-cream" id="eat-shop">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">Local guide</p>
          <h2 className="h1">Eat &amp; Shop Locally</h2>
          <p>
            Rolleston has grown into a genuine food destination with something for every craving
            just minutes from your door.
          </p>
        </div>
        <div className="quad rv">
          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 8h1a3 3 0 0 1 0 6h-1" />
                  <path d="M3 8h14v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" />
                  <path d="M6 2v2M10 2v2M14 2v2" />
                </svg>
              </div>
              <h4>Cafés &amp; pubs</h4>
              <p className="qc-sub">Coffee first, pints later.</p>
            </div>
            <ul>
              <li>
                Black &amp; White Coffee Cartel<em>Local espresso and fresh bites</em>
              </li>
              <li>
                Joe&apos;s Garage<em>A relaxed local pint or a hearty pub meal</em>
              </li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M7 2v9a3 3 0 0 0 6 0V2M10 11v11" />
                  <path d="M18 2c-1.5 2-2 4-2 7v4h3V2z" />
                </svg>
              </div>
              <h4>Sit-down dining</h4>
              <p className="qc-sub">A global dining scene right in town.</p>
            </div>
            <ul>
              <li>
                Origami<em>Japanese</em>
              </li>
              <li>The Turkish Grill Bar &amp; Restaurant</li>
              <li>Ratana Italian Restaurant &amp; Pizzeria</li>
              <li>Corianders &amp; Thai Terrace</li>
              <li>The Phenix, Hello Vietnam &amp; Orange House</li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 10h16l-1.5 9a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7z" />
                  <path d="M8 10a4 4 0 0 1 8 0" />
                </svg>
              </div>
              <h4>Casual bites &amp; takeout</h4>
              <p className="qc-sub">Perfect for a quick, relaxed night in.</p>
            </div>
            <ul>
              <li>Burger Wisconsin</li>
              <li>Pizza Club Rolleston</li>
              <li>Smoke Rolleston</li>
              <li>Mexicali Fresh</li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 4h2l2.4 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="17" cy="20" r="1" />
                </svg>
              </div>
              <h4>Supermarkets &amp; supplies</h4>
              <p className="qc-sub">Three full supermarkets just minutes away.</p>
            </div>
            <ul>
              <li>PAK&apos;nSAVE Rolleston</li>
              <li>New World Rolleston</li>
              <li>Countdown / Woolworths</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
