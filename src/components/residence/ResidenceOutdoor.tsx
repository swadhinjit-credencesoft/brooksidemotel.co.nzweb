import Ico from "@/components/ui/Ico";
import SlotImage from "@/components/ui/SlotImage";

export default function ResidenceOutdoor() {
  return (
    <section className="section bg-pine">
      <div className="wrap">
        <div className="split rv">
          <div className="split-body">
            <p className="eyebrow on-dark">Resort-style outdoor living</p>
            <h3 className="h2" style={{ color: "var(--alpine-cream)" }}>
              Private spa &amp; outdoor entertainment
            </h3>
            <p style={{ color: "var(--mist-sage)" }}>
              A fully fenced, private yard built for winding down after a long day of travel or
              work.
            </p>
            <ul className="split-list">
              <li>
                <span
                  className="li-ico"
                  style={{ background: "rgba(239,230,221,.1)", color: "var(--gold-light)", border: "1px solid rgba(192,211,205,.24)" }}
                >
                  <Ico name="spa" size={18} sw={1.6} />
                </span>
                <div>
                  <b style={{ color: "var(--alpine-cream)" }}>Private outdoor hot tub spa</b>
                  <p style={{ color: "var(--mist-sage)" }}>
                    Unwind under the stars after a long day of travel or work.
                  </p>
                </div>
              </li>
              <li>
                <span
                  className="li-ico"
                  style={{ background: "rgba(239,230,221,.1)", color: "var(--gold-light)", border: "1px solid rgba(192,211,205,.24)" }}
                >
                  <Ico name="bbq" size={18} sw={1.6} />
                </span>
                <div>
                  <b style={{ color: "var(--alpine-cream)" }}>Dedicated BBQ area</b>
                  <p style={{ color: "var(--mist-sage)" }}>
                    Outdoor seating and barbecue setup in a fully fenced, private yard.
                  </p>
                </div>
              </li>
            </ul>

            <h4 className="incl-title" style={{ color: "var(--gold-light)" }}>
              Extra &quot;wow&quot; touches included
            </h4>
            <ul className="wow">
              <li style={{ color: "var(--mist-sage)" }}>Full private laundry room with washer &amp; dryer</li>
              <li style={{ color: "var(--mist-sage)" }}>Electronic front-door keyless entry lock</li>
              <li style={{ color: "var(--mist-sage)" }}>Climate control heat pumps &amp; air conditioning</li>
              <li style={{ color: "var(--mist-sage)" }}>Starter pack: bottled water, tea, coffee, sugar, milk</li>
              <li style={{ color: "var(--mist-sage)" }}>Child-friendly amenities on request (high chair and cot)</li>
              <li style={{ color: "var(--mist-sage)" }}>Private on-site parking</li>
            </ul>
          </div>
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage src="/images/residenceimage/residence1.png" alt="Private outdoor spa and BBQ area" label="Spa &amp; BBQ yard" sub="Landscape · 11:10" dark />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
