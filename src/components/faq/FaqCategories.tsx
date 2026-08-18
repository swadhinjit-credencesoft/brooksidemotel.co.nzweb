import FaqCategory from "@/components/faq/FaqCategory";
import { FAQ_CATEGORIES } from "@/content/faqs";

export default function FaqCategories() {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <nav className="jump rv" aria-label="Jump to category">
          <a href="#checkin">Check-In &amp; Out</a>
          <a href="#parking">Parking &amp; Access</a>
          <a href="#policies">Property Policies</a>
          <a href="#features">Room Features</a>
        </nav>

        {FAQ_CATEGORIES.map((cat) => (
          <FaqCategory key={cat.id} {...cat} />
        ))}
      </div>
    </section>
  );
}
