import Ico from "@/components/ui/Ico";

export default function ComfortsSection() {
  return (
    <section className="section bg-cream" id="in-room">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">Climate control &amp; in-room essentials</p>
          <h2 className="h1">The comforts that do the work</h2>
        </div>
        <div className="trio rv">
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="sun" size={20} sw={1.5} />
            </div>
            <h4>Year-round climate control</h4>
            <p>
              Guest-controlled heat pumps and air conditioning in every unit so you can set your
              preferred temperature.
            </p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="washer" size={20} sw={1.5} />
            </div>
            <h4>Guest laundry facilities</h4>
            <p>
              On-site guest laundry facilities are available upon request — perfect for longer
              corporate stays or travelling families.
            </p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="bedbar" size={20} sw={1.5} />
            </div>
            <h4>Luxury sleep &amp; bath</h4>
            <p>
              Premium Super King bedding, high-grade linen, blackout curtains, high-pressure
              showers, and luxury hotel toiletries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
