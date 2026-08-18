import Ico from "@/components/ui/Ico";

export default function StandardAmenitiesSection() {
  return (
    <section className="section bg-pine" id="every-stay">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">Standard in every room</p>
          <h2 className="h1">Every stay includes</h2>
        </div>
        <div className="amen rv">
          <div className="amen-item">
            <div className="amen-ico"><Ico name="wifi" size={20} sw={1.5} /></div>
            <div>
              <h5>Free high-speed Fibre Wi-Fi</h5>
              <p>Unlimited, in every room.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="tv" size={20} sw={1.5} /></div>
            <div>
              <h5>Smart TV &amp; 20 Sky Channels</h5>
              <p>Samsung Lynk, plus Freeview.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="sun" size={20} sw={1.5} /></div>
            <div>
              <h5>Guest-controlled heat pump / aircon</h5>
              <p>Set your own temperature.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="kitchen" size={20} sw={1.5} /></div>
            <div>
              <h5>Kettle, microwave &amp; fridge</h5>
              <p>With a coffee and tea starter pack.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="car" size={20} sw={1.5} /></div>
            <div>
              <h5>Free on-site &amp; street parking</h5>
              <p>Suitable for vans and trailers.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="bolt" size={20} sw={1.5} /></div>
            <div>
              <h5>On-site EV charging available</h5>
              <p>Type 2, $25 overnight.</p>
            </div>
          </div>
          <div className="amen-item">
            <div className="amen-ico"><Ico name="toiletries" size={20} sw={1.5} /></div>
            <div>
              <h5>Luxury hotel toiletries &amp; plush towels</h5>
              <p>Restocked daily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
