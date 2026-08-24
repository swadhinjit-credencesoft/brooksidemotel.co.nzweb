import { ReactNode } from "react";
import { bookingEngineUrl } from "@/lib/site";

export default function BookingButton({
  children,
  className = "btn btn-primary",
  dataEngine,
  roomId,
}: {
  children: ReactNode;
  className?: string;
  dataEngine?: string;
  roomId?: string;
}) {
  return (
    <a
      className={className}
      href={bookingEngineUrl(roomId)}
      data-booking-engine
      {...(dataEngine ? { "data-engine": dataEngine } : {})}
    >
      {children}
    </a>
  );
}
