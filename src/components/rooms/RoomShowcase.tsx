import FeatureRoom from "@/components/rooms/FeatureRoom";
import RoomCard from "@/components/rooms/RoomCard";
import { ROOMS } from "@/content/rooms";

export default function RoomShowcase() {
  return (
    <section className="section bg-paper" id="showcase">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Room by room</p>
          <h2 className="h1">Choose your room</h2>
          <p>
            Six room types as listed on brooksidemotel.co.nz, each with luxury linen,
            guest-controlled climate, and free parking directly outside the door.
          </p>
        </div>

        <FeatureRoom />

        <div className="room-grid">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
}
