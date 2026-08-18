import Link from "next/link";
import SlotImage from "@/components/ui/SlotImage";

export default function JourneySection() {
  return (
    <section className="journey bg-cream">
      <div className="wrap">
        <div className="journey-grid">
          <article className="jcard rv" id="motel-units">
            <div className="jcard-media">
              <SlotImage src="/images/motel-units.jpg" alt="Brookside Motel units" label="Motel units" sub="Landscape · 16:10" />
            </div>
            <div className="jcard-veil"></div>
            <div className="jcard-body">
              <span className="jtag jtag-motel">The motel</span>
              <h3 className="h2">Brookside Motel Units</h3>
              <p>
                Brand-new, ground-floor motel rooms with Super King or Double beds, luxury
                toiletries, and quiet surroundings. Ideal for corporate travellers, tradies, and
                event-goers.
              </p>
              <Link className="btn btn-cream" href="/motel-rooms">
                View motel rooms
              </Link>
            </div>
          </article>

          <article className="jcard rv" id="residence">
            <div className="jcard-media">
              <SlotImage src="/images/residence-exterior.jpg" alt="The Brookside Residence" label="The Residence" sub="Portrait · 4:5" />
            </div>
            <div className="jcard-veil"></div>
            <div className="jcard-body">
              <span className="jtag jtag-res">Flagship home</span>
              <h3 className="h2">The Brookside Residence</h3>
              <p>
                Our flagship 4-bedroom luxury home featuring an outdoor spa, private BBQ, 3
                bathrooms, an 85-inch Smart TV lounge and a Smart TV in every bedroom. Sleeps up
                to 8 adults.
              </p>
              <Link className="btn btn-gold" href="/brookside-residence">
                Explore luxury residence
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
