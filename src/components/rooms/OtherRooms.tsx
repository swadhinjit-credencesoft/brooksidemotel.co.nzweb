import Link from "next/link";
import SlotImage from "@/components/ui/SlotImage";
import { ROOMS } from "@/content/rooms";
import type { RoomData } from "@/lib/types";

export default function OtherRooms({ current }: { current: RoomData }) {
  const others = ROOMS.filter((r) => r.id !== current.id).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section className="section-sm bg-paper">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Keep browsing</p>
          <h2 className="h1">Other rooms you may like</h2>
        </div>
        <div className="xr-grid rv">
          {others.map((r) => (
            <Link
              key={r.id}
              href={`/motel-rooms/${r.id}`}
              className="xr-card"
              aria-label={`View details: ${r.name}`}
            >
              <div className="xr-media">
                <SlotImage src={r.image.src} alt={r.image.alt} label={r.image.label} sub={r.image.sub} />
              </div>
              <div className="xr-body">
                <b>{r.name}</b>
                <span>{r.specs[0]?.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
