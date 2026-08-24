"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/lib/site";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function SearchWidget() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  useEffect(() => {
    const today = new Date();
    const inD = new Date(today);
    inD.setDate(inD.getDate() + 7);
    const outD = new Date(inD);
    outD.setDate(outD.getDate() + 2);
    setCheckin(isoDate(inD));
    setCheckout(isoDate(outD));
  }, []);

  const onCheckin = (v: string) => {
    setCheckin(v);
    if (v && checkout && checkout <= v) {
      const next = new Date(v);
      next.setDate(next.getDate() + 1);
      setCheckout(isoDate(next));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = BOOKING_URL;
  };

  return (
    <div className="search" id="search">
      <div className="wrap">
        <form className="search-card" action={BOOKING_URL} method="get" onSubmit={submit}>
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
                min={isoDate(new Date())}
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
                min={checkin || isoDate(new Date())}
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
