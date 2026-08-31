export default function MapDirections() {
  return (
    <section className="section bg-paper" id="map">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Finding us</p>
          <h2 className="h1">Interactive map &amp; driving directions</h2>
        </div>
        <div className="rv">
          <div className="map-frame map-wide">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d261477.3042636744!2d172.28803824716857!3d-43.607720937249276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d3203007b582e1b%3A0x78adb1054c7e9e22!2sBrookside%20Motel!5e0!3m2!1sen!2sbd!4v1787899286315!5m2!1sen!2sbd"
              width="600"
              height="450"
              style={{ border: 0, width: "100%", height: "100%", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Brookside Motel Google Maps Location"
            />
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

