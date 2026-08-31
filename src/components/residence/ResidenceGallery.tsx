"use client";

import { useCallback, useEffect, useState } from "react";

const IMAGES = [
  { src: "/images/residenceimage/residence1.png", alt: "BROOKSIDE RESIDENCE luxury front exterior and private entrance" },
  { src: "/images/residenceimage/residence2.png", alt: "BROOKSIDE RESIDENCE open-plan living lounge with 85-inch Smart TV" },
  { src: "/images/residenceimage/residence3.png", alt: "BROOKSIDE RESIDENCE master bedroom suite with Super King bed" },
  { src: "/images/residenceimage/residence4.png", alt: "BROOKSIDE RESIDENCE fully equipped designer kitchen and dining area" },
  { src: "/images/residenceimage/residence5.png", alt: "BROOKSIDE RESIDENCE private outdoor courtyard with spa pool and BBQ" },
  { src: "/images/residenceimage/residence6.png", alt: "BROOKSIDE RESIDENCE landscaped garden and patio area" },
  { src: "/images/residenceimage/residencefullview.png", alt: "BROOKSIDE RESIDENCE architectural panoramic exterior view" },
];

export default function ResidenceGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((i) => (i === null ? i : (i + d + IMAGES.length) % IMAGES.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Photo tour</p>
          <h2 className="h1">Residence gallery</h2>
          <p>Take a look around THE BROOKSIDE RESIDENCE before you book.</p>
        </div>
        <div className="gallery-grid rv">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`g-item g-${IMAGES.length}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Open image ${i + 1} of ${IMAGES.length}: ${img.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Residence gallery"
          onClick={close}
        >
          <button type="button" className="lb-x" onClick={close} aria-label="Close gallery">
            &times;
          </button>
          <button
            type="button"
            className="lb-nav lb-prev"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
          >
            &lsaquo;
          </button>
          <button
            type="button"
            className="lb-nav lb-next"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); step(1); }}
          >
            &rsaquo;
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES[active].src} alt={IMAGES[active].alt} />
            <figcaption>
              {IMAGES[active].alt}
              <span>
                {active + 1} / {IMAGES.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
