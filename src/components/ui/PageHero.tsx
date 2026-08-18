import { ReactNode } from "react";
import Link from "next/link";
import SlotImage from "@/components/ui/SlotImage";

export default function PageHero({
  src,
  alt,
  placeholderLabel,
  placeholderSub,
  crumb,
  title,
  sub,
  tag,
  cta,
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  placeholderSub: string;
  crumb: string;
  title: ReactNode;
  sub?: string;
  tag?: string;
  cta?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-media">
        <SlotImage
          src={src}
          alt={alt}
          label={placeholderLabel}
          sub={placeholderSub}
          dark
          size={34}
        />
      </div>
      <div className="page-hero-scrim"></div>
      <div className="wrap page-hero-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        {tag && <span className="jtag jtag-res">{tag}</span>}
        <h1 className="display">{title}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
        {cta}
      </div>
    </section>
  );
}
