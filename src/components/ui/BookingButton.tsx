import { ReactNode } from "react";
import { BOOKING_URL } from "@/lib/site";

export default function BookingButton({
  children,
  className = "btn btn-primary",
  dataEngine,
}: {
  children: ReactNode;
  className?: string;
  dataEngine?: string;
}) {
  return (
    <a
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-booking-engine
      {...(dataEngine ? { "data-engine": dataEngine } : {})}
    >
      {children}
    </a>
  );
}
