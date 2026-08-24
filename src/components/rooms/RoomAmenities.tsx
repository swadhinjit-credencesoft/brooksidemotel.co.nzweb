import Link from "next/link";
import Ico from "@/components/ui/Ico";
import type { RoomData } from "@/lib/types";

export default function RoomAmenities({ room }: { room: RoomData }) {
  return (
    <section className="section-sm bg-cream">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">In this room</p>
          <h2 className="h1">Room amenities</h2>
        </div>
        <div className="amen on-cream rv">
          {room.amenities.map((a) => (
            <div className="amen-item" key={a.text}>
              <div className="amen-ico">
                <Ico name={a.icon} size={20} sw={1.5} />
              </div>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
        <p className="rd-more rv">
          Plus everything standard in every Brookside stay —{" "}
          <Link href="/amenities">see all facilities</Link>.
        </p>
      </div>
    </section>
  );
}
