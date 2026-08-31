import Link from "next/link";
import SlotImage from "@/components/ui/SlotImage";

export default function CrossSellSection() {
  return (
    <section className="section-sm bg-cream">
      <div className="wrap">
        <div className="cross-sell rv">
          <div className="cross-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage src="/images/residenceimage/residence7.png" alt="THE BROOKSIDE RESIDENCE outdoor spa" label="The Residence" sub="Portrait · 3:4" />
            </figure>
          </div>
          <div className="cross-body">
            <span className="jtag jtag-res">Need more space?</span>
            <h2 className="h1">Travelling with a large family or corporate group?</h2>
            <p className="lead">
              If you require a fully self-contained home with 4 bedrooms, 3 bathrooms, a full
              designer kitchen with oven and dishwasher, an 85-inch Smart TV lounge with a Smart
              TV in every bedroom, private laundry, a private outdoor spa and a fenced BBQ yard,
              check out our flagship <b>BROOKSIDE RESIDENCE</b>. Sleeps up to 8 adults.
            </p>
            <Link className="btn btn-gold" href="/brookside-residence">
              Explore 4-bed Residence
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
