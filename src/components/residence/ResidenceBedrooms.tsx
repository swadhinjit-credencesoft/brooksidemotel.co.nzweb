import SlotImage from "@/components/ui/SlotImage";

export default function ResidenceBedrooms() {
  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className="split rv">
          <div className="split-body">
            <p className="eyebrow">Designed for deep rest</p>
            <h3 className="h2">4 stunning bedrooms</h3>
            <p>
              All bedrooms feature premium hotel-grade linen, blackout curtains, ambient lighting,
              and top-class furnishings for a quiet, hotel-quality sleep experience.
            </p>
            <ul className="bedroom-list">
              <li>
                <span className="b-n">1</span>
                <div>
                  <b>Master suite</b>
                  <span>Super King bed, private ensuite bathroom, walk-in wardrobe, and mounted Smart TV.</span>
                </div>
              </li>
              <li>
                <span className="b-n">2</span>
                <div>
                  <b>Second bedroom</b>
                  <span>Super King bed, spacious wardrobe, and mounted Smart TV.</span>
                </div>
              </li>
              <li>
                <span className="b-n">3</span>
                <div>
                  <b>Third bedroom</b>
                  <span>Double bed, wardrobe, and mounted Smart TV.</span>
                </div>
              </li>
              <li>
                <span className="b-n">4</span>
                <div>
                  <b>Fourth bedroom</b>
                  <span>Double bed, wardrobe, and mounted Smart TV.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage src="/images/residence-bedroom.jpg" alt="Master suite at Brookside Residence" label="Bedroom gallery" sub="Landscape · 11:10" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
