"use client";

import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/types";

export default function RoomGallery({
  images,
  name,
}: {
  images: GalleryImage[];
  name: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
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

  if (images.length === 0) return null;

  return (
    <section className="section-sm bg-paper">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Photo tour</p>
          <h2 className="h1">Gallery</h2>
          <p>{name} — take a look around before you book.</p>
        </div>
        <div
          className={`gallery-grid rv${images.length === 1 ? " solo" : ""}`}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`g-item g-${Math.min(images.length, 5)}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
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
          aria-label={`${name} gallery`}
          onClick={close}
        >
          <button type="button" className="lb-x" onClick={close} aria-label="Close gallery">
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lb-nav lb-prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lb-nav lb-next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                ›
              </button>
            </>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active].src} alt={images[active].alt} />
            <figcaption>
              {images[active].alt}
              <span>
                {active + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
