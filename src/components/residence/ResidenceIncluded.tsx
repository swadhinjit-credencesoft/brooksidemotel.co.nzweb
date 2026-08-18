import Ico from "@/components/ui/Ico";

export default function ResidenceIncluded() {
  return (
    <section className="section-sm bg-cream" id="included">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">The full picture</p>
          <h2 className="h1">Everything the Residence includes</h2>
          <p>A complete, self-contained home — not a room with extras.</p>
        </div>
        <div className="quad rv">
          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <Ico name="bedbar" size={19} sw={1.5} />
              </div>
              <h4>Sleeping</h4>
              <p className="qc-sub">Four bedrooms, up to 8 adults.</p>
            </div>
            <ul>
              <li>Master suite<em>Super King, private ensuite, walk-in wardrobe</em></li>
              <li>Second bedroom<em>Super King, spacious wardrobe</em></li>
              <li>Third &amp; fourth bedrooms<em>Double beds and wardrobes</em></li>
              <li>Smart TV in every bedroom</li>
              <li>Hotel-grade linen, blackout curtains, ambient lighting</li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <Ico name="coffee" size={19} sw={1.5} />
              </div>
              <h4>Kitchen &amp; dining</h4>
              <p className="qc-sub">A full designer kitchen, not a kitchenette.</p>
            </div>
            <ul>
              <li>Oven &amp; dishwasher</li>
              <li>Large refrigerator &amp; microwave</li>
              <li>Full cookware and cutlery sets</li>
              <li>Dedicated coffee &amp; tea station</li>
              <li>Large family dining table</li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <Ico name="tv" size={19} sw={1.5} />
              </div>
              <h4>Living &amp; working</h4>
              <p className="qc-sub">Space to gather, and space to work.</p>
            </div>
            <ul>
              <li>85-inch Smart TV with streaming apps</li>
              <li>Designer sofa seating</li>
              <li>High-speed Fibre Wi-Fi throughout</li>
              <li>Workstation desk</li>
              <li>Climate control heat pumps &amp; air conditioning</li>
            </ul>
          </article>

          <article className="quad-card">
            <div className="qc-head">
              <div className="qc-ico">
                <Ico name="spa" size={19} sw={1.5} />
              </div>
              <h4>Outdoors &amp; extras</h4>
              <p className="qc-sub">The touches that make a long stay easy.</p>
            </div>
            <ul>
              <li>Private outdoor hot tub spa</li>
              <li>BBQ area in a fully fenced yard</li>
              <li>Private laundry with washer &amp; dryer</li>
              <li>Electronic keyless entry</li>
              <li>High chair &amp; cot on request</li>
              <li>Private on-site parking</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
