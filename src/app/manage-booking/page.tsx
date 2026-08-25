import type { Metadata } from "next";
import { Suspense } from "react";
import ManageBookingClient from "@/components/booking/ManageBookingClient";

export const metadata: Metadata = {
  title: "Manage Your Booking — Brookside Motel",
  description:
    "View, modify, or cancel your reservation at Brookside Motel, Rolleston.",
};

export default function ManageBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="be-wrap">
          <div className="be-loading-inline" role="status">
            <div className="be-spinner" aria-hidden="true" />
            <p>Loading&hellip;</p>
          </div>
        </div>
      }
    >
      <ManageBookingClient />
    </Suspense>
  );
}
