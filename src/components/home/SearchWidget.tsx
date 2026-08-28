"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL, bookPageUrl } from "@/lib/site";

/** Get today's date in NZ timezone as YYYY-MM-DD */
function nzTodayISO(): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = parts.find((p) => p.type === "year")?.value ?? String(now.getFullYear());
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

/** Add N days to a YYYY-MM-DD string using UTC arithmetic */
function addDaysNZ(dateISO: string, days: number): string {
  const [y, m, day] = dateISO.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, day + days, 0, 0, 0));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function defaultDates(): { checkIn: string; checkOut: string } {
  const ci = nzTodayISO();
  return { checkIn: ci, checkOut: addDaysNZ(ci, 1) };
}

export default function SearchWidget() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  useEffect(() => {
    const { checkIn, checkOut } = defaultDates();
    setCheckin(checkIn);
    setCheckout(checkOut);
  }, []);

  const onCheckin = (v: string) => {
    setCheckin(v);
    if (v && checkout && checkout <= v) {
      setCheckout(addDaysNZ(v, 1));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    let ci = checkin;
    let co = checkout;
    const today = nzTodayISO();
    if (!ci || !co || ci < today || co <= ci) {
      const fallback = defaultDates();
      ci = fallback.checkIn;
      co = fallback.checkOut;
    }

    window.location.href = bookPageUrl({ checkIn: ci, checkOut: co, adults: Number(adults), children: Number(children) });
  };

  return (
    <div className="search" id="search">
      <div className="wrap">
        <form
          className="search-card"
          action={BOOKING_URL}
          method="get"
          onSubmit={submit}
        >
          <div className="sf">
            <label htmlFor="sw-checkin">Check-in date</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <input
                id="sw-checkin"
                type="date"
                value={checkin}
                min={nzTodayISO()}
                onChange={(e) => onCheckin(e.target.value)}
              />
            </div>
          </div>
          <div className="sf">
            <label htmlFor="sw-checkout">Check-out date</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <input
                id="sw-checkout"
                type="date"
                value={checkout}
                min={checkin || nzTodayISO()}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </div>
          </div>
          <div className="sf sw-guests">
            <label htmlFor="sw-adults">Guests</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <select
                id="sw-adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                aria-label="Adults"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "adult" : "adults"}
                  </option>
                ))}
              </select>
              <select
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                aria-label="Children"
              >
                {[0, 1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "child" : "children"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="search-go">
            <button type="submit" className="btn btn-primary">
              Search availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
