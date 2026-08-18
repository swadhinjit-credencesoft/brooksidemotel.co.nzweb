import Ico from "@/components/ui/Ico";

export default function ResidenceInsideTrio() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="sec-head center rv">
          <p className="eyebrow">Inside the home</p>
          <h2 className="h1">Room to spread out</h2>
        </div>
        <div className="trio rv">
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="bathtaps" size={20} sw={1.5} />
            </div>
            <h4>3 modern bathrooms</h4>
            <p>
              A private ensuite in the master suite, plus 2 additional full bathrooms with
              high-pressure showers. Supplied with luxury hotel-grade toiletries, plush bath
              towels, and immaculate presentation.
            </p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="coffee" size={20} sw={1.5} />
            </div>
            <h4>Fully equipped designer kitchen</h4>
            <p>
              Microwave, large refrigerator, dishwasher, oven, electric kettle, and full cookware
              and cutlery sets. Dedicated coffee and tea station, plus a spacious dining area with
              a large family table.
            </p>
          </div>
          <div className="trio-card">
            <div className="t-ico">
              <Ico name="tv" size={20} sw={1.5} />
            </div>
            <h4>Premium entertainment lounge</h4>
            <p>
              Elegant lounge with designer sofa seating and an 85-inch Smart TV with built-in
              streaming apps, plus Smart TVs in all 4 bedrooms. High-speed Fibre Wi-Fi throughout
              and a workstation desk for business travellers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
