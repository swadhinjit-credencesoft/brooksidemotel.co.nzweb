import AccentBand from "@/components/ui/AccentBand";
import BookingButton from "@/components/ui/BookingButton";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function AmenitiesBookingBand() {
  return (
    <AccentBand
      eyebrow="Book direct"
      title="Experience Modern Hospitality in Rolleston"
      lead="Book your stay directly through our website to enjoy flexible cancellation and priority check-in perks."
    >
      <BookingButton className="btn btn-cream">Book your stay direct</BookingButton>
      <a className="btn btn-ghost-light" href={PHONE_TEL}>
        Call {PHONE_DISPLAY}
      </a>
    </AccentBand>
  );
}
