import Link from "next/link";
import AccentBand from "@/components/ui/AccentBand";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function FaqContactBand() {
  return (
    <AccentBand
      bgClass="bg-paper"
      eyebrow="Still have questions?"
      title="Have a Specific Question?"
      lead="Our friendly team is always here to help ensure your stay in Rolleston goes smoothly."
    >
      <a className="btn btn-cream" href={PHONE_TEL}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
        Call us: {PHONE_DISPLAY}
      </a>
      <Link className="btn btn-ghost-light" href="/contact">
        Send an enquiry
      </Link>
    </AccentBand>
  );
}
