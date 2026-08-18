import AccentBand from "@/components/ui/AccentBand";
import BookingButton from "@/components/ui/BookingButton";

export default function AboutBookingBand() {
  return (
    <AccentBand
      bgClass="bg-paper"
      eyebrow="Book direct"
      title="Experience Reliable Hospitality in Rolleston"
      lead="Book directly with us to secure flexible cancellation terms and priority consideration for late check-out."
    >
      <BookingButton className="btn btn-cream">Book motel unit direct</BookingButton>
      <a className="btn btn-gold" href="/brookside-residence">
        Explore 4-bed Residence
      </a>
    </AccentBand>
  );
}
