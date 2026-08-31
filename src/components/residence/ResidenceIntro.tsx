import ContourArt from "@/components/ui/ContourArt";

export default function ResidenceIntro() {
  return (
    <section className="section bg-cream contour">
      <ContourArt variant="b" />
      <div className="wrap">
        <div className="intro-block rv">
          <p className="eyebrow">Introduction &amp; luxury positioning</p>
          <p className="lead">
            Welcome to <b style={{ color: "var(--pine)" }}>BROOKSIDE RESIDENCE</b>, the flagship
            premium home of Brookside Motel Rolleston, crafted for guests who appreciate space,
            style, and absolute comfort. Located centrally on Moore Street, this private
            residence blends high-quality furnishings, modern architectural design, and
            resort-style amenities for a truly exceptional stay.
          </p>
          <p style={{ color: "var(--sage-text)", marginTop: "var(--s3)" }}>
            Whether you are travelling with family, hosting a group reunion, or seeking a
            spacious long-stay home for corporate executives, BROOKSIDE RESIDENCE is designed to
            impress from the moment you walk through the door — right down to the starter pack of
            bottled water, tea, coffee, sugar and milk waiting on arrival.
          </p>
        </div>

        <div className="counters rv">
          <div className="counter">
            <span className="cn">8</span>
            <span className="cl">Capacity</span>
            <span className="cs">Up to 8 adults</span>
          </div>
          <div className="counter">
            <span className="cn">4</span>
            <span className="cl">Bedrooms</span>
            <span className="cs">2 Super Kings + 2 Doubles</span>
          </div>
          <div className="counter">
            <span className="cn">3</span>
            <span className="cl">Bathrooms</span>
            <span className="cs">1 ensuite + 2 full</span>
          </div>
          <div className="counter">
            <span className="cn">1</span>
            <span className="cl">Outdoor living</span>
            <span className="cs">Private hot tub spa &amp; BBQ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
