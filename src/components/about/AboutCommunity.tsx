import SlotImage from "@/components/ui/SlotImage";

export default function AboutCommunity() {
  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className="split flip rv">
          <div className="split-media">
            <figure className="arch" style={{ margin: 0 }}>
              <SlotImage
                src="/images/rolleston-community.jpg"
                alt="Rolleston township"
                label="Rolleston township"
                sub="Landscape · 11:10"
              />
            </figure>
          </div>
          <div className="split-body">
            <p className="eyebrow">Local identity &amp; community</p>
            <h3 className="h2">Proud to Be Part of Selwyn&apos;s Growth</h3>
            <p className="lead" style={{ margin: "var(--s3) 0" }}>
              We love being part of Rolleston at such an exciting time.
            </p>
            <p>
              Rolleston is a genuinely vibrant, fast-growing community with new cafés, local
              shops, and families arriving all the time — yet it hasn&apos;t lost the warmth,
              friendliness, and safety of a close-knit Canterbury town.
            </p>
            <p>
              Watching our town thrive, supporting local businesses, and welcoming travellers
              into the Selwyn District is something our entire team is immensely proud to be part
              of.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
