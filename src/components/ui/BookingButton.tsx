import { ReactNode } from "react";
import { bookPageUrl, residenceBookPageUrl } from "@/lib/site";

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
  const href = dataEngine === "residence"
    ? residenceBookPageUrl()
    : bookPageUrl({ room: roomId });

  return (
    <a
      className={className}
      href={href}
      data-booking-engine
      {...(dataEngine ? { "data-engine": dataEngine } : {})}
    >
      {children}
    </a>
  );
}
