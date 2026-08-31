import ContourArt from "@/components/ui/ContourArt";
import SlotImage from "@/components/ui/SlotImage";

export default function AboutPhilosophy() {
  return (
    <section className="section bg-cream contour">
      <ContourArt />
      <div className="wrap">
        <div className="split rv">
          <div className="split-body">
            <p className="eyebrow">Our core philosophy</p>
            <h3 className="h1">
              Everything You Need for an Easy,
              <br />
              Comfortable Stay
            </h3>
            <p className="lead" style={{ margin: "var(--s3) 0" }}>
               Brookside Motel was built with a simple philosophy:{" "}
              <b style={{ color: "var(--pine)" }}>nail the essentials, every time.</b>
            </p>
            <p>
              We believe that a great stay starts with the fundamentals — genuinely clean,
              modern rooms, high-end luxury bedding for deep rest, and a quiet location right
              by the motorway that makes travel easy.
            </p>
            <p>
              Whether you are visiting for a corporate assignment, a family event, or a weekend
              stopover, our commitment is to provide warm, reliable service and spotless
              accommodation you can count on, stay after stay.
            </p>
            <div className="welcome-sign" style={{ marginTop: "var(--s5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mark" src="/logos/welcome-mark.png" alt="Brookside Motel emblem" width={54} height={54} />
              <p>
                Opened October 2025
                <br />
                Rolleston, Canterbury
              </p>
            </div>
          </div>
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage
                src="/images/about-interior.jpg"
                alt="Room interior at Brookside Motel"
                label="Room / reception"
                sub="Landscape · 11:10"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
