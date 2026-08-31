"use client";

import { useEffect } from "react";

export default function BookingRedirect({
  to,
  fallbackText,
}: {
  to: string;
  fallbackText?: string;
}) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="be-wrap">
      <div className="be-loading-inline" role="status">
        <div className="be-spinner" aria-hidden="true" />
        <p>{fallbackText ?? "Redirecting to our secure booking engine&hellip;"}</p>
      </div>
    </div>
  );
}