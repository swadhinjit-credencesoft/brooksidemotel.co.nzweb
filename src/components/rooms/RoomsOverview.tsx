import BookingButton from "@/components/ui/BookingButton";
import ContourArt from "@/components/ui/ContourArt";
import Ico from "@/components/ui/Ico";

export default function RoomsOverview() {
  return (
    <section className="section-sm bg-cream contour">
      <ContourArt />
      <div className="wrap">
        <div className="intro-block rv">
          <p className="eyebrow">Every room</p>
          <p className="lead">
             Brookside Motel is thoughtfully built for solid
            rest and effortless convenience. Whether you are a solo corporate traveller needing a
            quiet workspace, a couple on a weekend getaway, or a trade crew working locally, our
            modern rooms deliver a seamless stay.
          </p>
        </div>

        <div className="perk-bar rv">
          <div className="perk-bar-ico">
            <Ico name="shield" size={22} sw={1.6} />
          </div>
          <div className="perk-bar-body">
            <b> Direct Booking Perk</b>
            <p>
              Enjoy flexible cancellation policies and priority consideration for late check-out
              when you book directly on our website.
            </p>
          </div>
          <BookingButton className="btn btn-cream">Book direct</BookingButton>
        </div>
      </div>
    </section>
  );
}
