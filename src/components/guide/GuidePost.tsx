import { ReactNode } from "react";
import SlotImage from "@/components/ui/SlotImage";

export default function GuidePost({
  id,
  tag,
  title,
  image,
  children,
  cta,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  image: { src: string; alt: string; label: string; sub: string };
  children: ReactNode;
  cta: ReactNode;
}) {
  return (
    <article className="post rv" id={id}>
      <div className="post-meta">
        <span className="tag">{tag}</span>
      </div>
      <h2 className="h1">{title}</h2>
      <div className="post-hero">
        <figure className="arch" style={{ margin: 0 }}>
          <SlotImage src={image.src} alt={image.alt} label={image.label} sub={image.sub} />
        </figure>
      </div>
      {children}
      <div className="post-cta">{cta}</div>
    </article>
  );
}
