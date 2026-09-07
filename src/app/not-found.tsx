import Link from "next/link";
import ContourArt from "@/components/ui/ContourArt";
import Ico from "@/components/ui/Ico";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL_RESERVATIONS } from "@/lib/site";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/motel-rooms", icon: "bed" as const, label: "Motel Rooms", sub: "6 room types" },
  { href: "/brookside-residence", icon: "building" as const, label: "Residence", sub: "4-bed private" },
  { href: "/amenities", icon: "check" as const, label: "Amenities", sub: "EV, Wi-Fi, parking" },
  { href: "/faq", icon: "corner" as const, label: "FAQ", sub: "Good to know" },
];

export default function NotFound() {
  return (
    <section className="nf contour">
      <ContourArt variant="b" />
      <div className="wrap nf-inner">
        <span className="nf-eyebrow">Lost your way?</span>
        <h1 className="display">This page has wandered off</h1>
        <p className="nf-lead">
          The page you&apos;re looking for could not be found — it may have been
          moved or renamed. It&apos;s just an accident that was not intentional.
        </p>
        <div className="nf-actions">
          <Link className="btn btn-cream" href="/">
            <Ico name="arrow" size={13} /> Back to home
          </Link>
          <Link className="btn btn-ghost-light" href="/motel-rooms">
            View motel rooms
          </Link>
        </div>

        <p className="nf-more">You might be looking for</p>
        <div className="nf-grid">
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href} className="nf-card-sm">
              <span className="nf-card-ico">
                <Ico name={q.icon} size={17} sw={1.6} />
              </span>
              <span className="nf-card-body">
                <b>{q.label}</b>
                <span>{q.sub}</span>
              </span>
              <Ico name="arrow" size={13} className="nf-card-arrow" />
            </Link>
          ))}
        </div>

        <div className="nf-help">
          <p>Prefer to talk to a real person?</p>
          <a href={PHONE_TEL}>
            <Ico name="spa" size={14} /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL_RESERVATIONS}`}>{EMAIL_RESERVATIONS}</a>
        </div>
      </div>
    </section>
  );
}
