import ContourArt from "@/components/ui/ContourArt";

export default function AmenitiesIntro() {
  return (
    <section className="section-sm bg-cream contour">
      <ContourArt variant="b" />
      <div className="wrap">
        <div className="intro-block rv">
          <p className="eyebrow">What&apos;s on site</p>
          <p className="lead">
            At Brookside Motel, we focus on delivering the essential comforts that make your stay
            seamless. From hassle-free vehicle charging and high-speed Fibre internet to guest
            laundry and climate-controlled rooms, every detail is configured so you can relax or
            work without interruption.
          </p>
        </div>
      </div>
    </section>
  );
}
