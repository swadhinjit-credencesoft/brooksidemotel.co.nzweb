import type { Metadata } from "next";
import { Suspense } from "react";
import { BOOKING_URL } from "@/lib/site";
import BookingRedirect from "@/components/booking/BookingRedirect";

export const metadata: Metadata = {
  title: "Book Direct — Brookside Motel, Rolleston",
  description:
    "Check availability and book your stay at Brookside Motel, Rolleston. Secure online booking with best-rate guarantee and flexible cancellation.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Book Direct — Brookside Motel, Rolleston",
    description:
      "Check availability and book your stay at Brookside Motel, Rolleston. Secure online booking with best-rate guarantee and flexible cancellation.",
    url: "/book",
  },
};

export default function BookPage() {
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
      <BookingRedirect to={BOOKING_URL} />
    </Suspense>
  );
}