import BookingButton from "@/components/ui/BookingButton";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function ResidenceBookingBand() {
  return (
    <section className="section-sm bg-cream">
      <div className="wrap">
        <div className="accent-band rv">
          <p className="eyebrow on-dark">Bypass online agent fees</p>
          <h2 className="h1">Book The Brookside Residence Direct &amp; Save</h2>
          <p>
            Avoid third-party service fees. Secure your stay directly through our website to
            enjoy flexible booking terms and direct manager support.
          </p>
          <div className="row">
            <BookingButton className="btn btn-gold" dataEngine="residence">Check Residence availability direct</BookingButton>
            <a className="btn btn-ghost-light" href={PHONE_TEL}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
