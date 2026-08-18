import type { FaqItem } from "@/lib/types";

export default function FaqCategory({
  id,
  number,
  title,
  items,
}: {
  id: string;
  number: number;
  title: string;
  items: FaqItem[];
}) {
  return (
    <div className="faq-cat rv" id={id}>
      <h3 className="h2">
        <span className="n">{number}</span> {title}
      </h3>
      {items.map((item) => (
        <details className="qa" key={item.q} open={item.open}>
          <summary>{item.q}</summary>
          <div className="a">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
