"use client";

import { useEffect, useRef } from "react";

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const drop = () => v.remove();
    v.addEventListener("error", drop, true);
    const src = v.querySelector("source");
    if (src) src.addEventListener("error", drop);
    return () => {
      v.removeEventListener("error", drop, true);
      if (src) src.removeEventListener("error", drop);
    };
  }, []);

  return (
    <div className="hero-media">
      <div className="hero-fallback" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="https://bookonelocal.in/cdn/Brookside-Motel-FINAL.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
