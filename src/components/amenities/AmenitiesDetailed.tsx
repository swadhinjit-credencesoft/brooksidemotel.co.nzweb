import Ico from "@/components/ui/Ico";
import SlotImage from "@/components/ui/SlotImage";

export default function AmenitiesDetailed() {
  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className="split rv" id="parking">
          <div className="split-body">
            <p className="eyebrow">EV charging &amp; free on-site parking</p>
            <h3 className="h2">Convenient Parking &amp; EV Power</h3>
            <p>
              We cater to modern drivers and regional transport needs with stress-free parking
              directly on-site.
            </p>
            <ul className="split-list">
              <li>
                <span className="li-ico">
                  <Ico name="car" size={18} sw={1.6} />
                </span>
                <div>
                  <b>On-site &amp; street parking</b>
                  <p>
                    Generous, complimentary parking spaces designed to comfortably accommodate
                    cars, work vans, and commercial vehicles or trailers.
                  </p>
                </div>
              </li>
              <li>
                <span className="li-ico">
                  <Ico name="bolt" size={18} sw={1.6} />
                </span>
                <div>
                  <b>EV power station</b>
                  <p>
                    Type 2 EV charging power available on-site for $25 overnight, ensuring your
                    electric vehicle is fully charged and ready for the road ahead.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage src="/images/parking-ev.jpg" alt="On-site parking and EV charging" label="Parking &amp; EV" sub="Landscape · 11:10" />
            </figure>
          </div>
        </div>

        <div className="split flip rv" id="connectivity">
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage src="/images/wifi-smarttv.jpg" alt="In-room Smart TV and workspace" label="Smart TV &amp; Wi-Fi" sub="Landscape · 11:10" />
            </figure>
          </div>
          <div className="split-body">
            <p className="eyebrow">Fibre Wi-Fi &amp; smart entertainment</p>
            <h3 className="h2">Stay Connected &amp; Entertained</h3>
            <p>
              Whether you need to host video calls for work or unwind with your favourite shows,
              our digital setup keeps you connected.
            </p>
            <ul className="split-list">
              <li>
                <span className="li-ico">
                  <Ico name="wifi" size={18} sw={1.6} />
                </span>
                <div>
                  <b>Ultra-fast Fibre Wi-Fi</b>
                  <p>
                    Unlimited high-speed Fibre internet included in every room rate — ideal for
                    corporate travellers.
                  </p>
                </div>
              </li>
              <li>
                <span className="li-ico">
                  <Ico name="tv" size={18} sw={1.6} />
                </span>
                <div>
                  <b>Samsung Lynk &amp; Sky TV</b>
                  <p>
                    Enjoy Freeview channels and 20 Sky Channels, or stream directly on your
                    in-room Smart TV.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
