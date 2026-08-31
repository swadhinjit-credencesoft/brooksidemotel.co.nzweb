import type { Metadata } from "next";
import { Suspense } from "react";
import { RESIDENCE_BOOKING_URL } from "@/lib/site";
import BookingRedirect from "@/components/booking/BookingRedirect";

export const metadata: Metadata = {
  title: "Book the Brookside Residence — Direct | Rolleston, Canterbury",
  description:
    "Book the Brookside Residence directly — our flagship 4-bedroom luxury home with private outdoor spa, BBQ area, 3 bathrooms and 85\" Smart TV lounge. Sleeps up to 8 adults. Best rate guaranteed.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Book the Brookside Residence — Direct | Rolleston, Canterbury",
    description:
      "Book the Brookside Residence directly — our flagship 4-bedroom luxury home with private outdoor spa, BBQ area, 3 bathrooms and 85-inch Smart TV lounge. Sleeps up to 8 adults. Best rate guaranteed.",
    url: "/book-residence",
  },
};

export default function BookResidencePage() {
  return (
    <Suspense
      fallback={
        <div className="be-wrap">
          <div className="be-loading-inline" role="status">
            <div className="be-spinner" aria-hidden="true" />
            <p>Loading booking engine&hellip;</p>
          </div>
        </div>
      }
    >
      <BookingRedirect to={RESIDENCE_BOOKING_URL} />
    </Suspense>
  );
}
