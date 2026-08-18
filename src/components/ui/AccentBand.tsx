import { ReactNode } from "react";

export default function AccentBand({
  bgClass = "bg-cream",
  eyebrow,
  title,
  lead,
  children,
}: {
  bgClass?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={`section-sm ${bgClass}`}>
      <div className="wrap">
        <div className="accent-band rv">
          <p className="eyebrow on-dark">{eyebrow}</p>
          <h2 className="h1">{title}</h2>
          {lead && <p>{lead}</p>}
          <div className="row">{children}</div>
        </div>
      </div>
    </section>
  );
}
