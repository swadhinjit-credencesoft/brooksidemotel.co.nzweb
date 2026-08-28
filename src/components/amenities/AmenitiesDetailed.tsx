import Ico from "@/components/ui/Ico";
import SlotImage from "@/components/ui/SlotImage";
import { DETAILED_AMENITIES } from "@/content";

export default function AmenitiesDetailed() {
  return (
    <section className="section bg-paper">
      <div className="wrap">
        {DETAILED_AMENITIES.map((section, idx) => {
          const isFlipped = idx % 2 !== 0;
          return (
            <div
              key={section.id}
              className={`split ${isFlipped ? "flip " : ""}rv`}
              id={section.id}
            >
              {isFlipped && (
                <div className="split-media">
                  <figure className="arch" style={{ margin: 0 }}>
                    <SlotImage
                      src={section.image.src}
                      alt={section.image.alt}
                      label={section.image.label}
                      sub={section.image.sub}
                    />
                  </figure>
                </div>
              )}

              <div className="split-body">
                <p className="eyebrow">{section.eyebrow}</p>
                <h3 className="h2">{section.title}</h3>
                <p>{section.description}</p>
                <ul className="split-list">
                  {section.features.map((feat) => (
                    <li key={feat.title}>
                      <span className="li-ico">
                        <Ico name={feat.icon} size={18} sw={1.6} />
                      </span>
                      <div>
                        <b>{feat.title}</b>
                        <p>{feat.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {!isFlipped && (
                <div className="split-media">
                  <figure className="arch" style={{ margin: 0 }}>
                    <SlotImage
                      src={section.image.src}
                      alt={section.image.alt}
                      label={section.image.label}
                      sub={section.image.sub}
                    />
                  </figure>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

