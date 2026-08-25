"use client";

import { useState } from "react";
import { manageBooking, formatCurrency, formatDateLong } from "@/lib/swiftbook";

export default function ManageBookingClient() {
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Awaited<ReturnType<typeof manageBooking>> | null>(null);
  const [lookupDone, setLookupDone] = useState(false);

  const onLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBooking(null);
    setLookupDone(false);

    if (!confirmation.trim()) { setError("Confirmation number required"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Valid email required"); return; }

    setLoading(true);
    try {
      const result = await manageBooking(confirmation.trim(), email.trim());
      setBooking(result);
      setLookupDone(true);
      if (!result.Booking) {
        setError(result.Message ?? "No booking found. Check your details and try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not look up booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const b = booking?.Booking;

  return (
    <div className="be-wrap">
      <div className="be-manage">
        <h1 className="be-manage-title">Manage your booking</h1>
        <p className="be-manage-sub">
          Enter your confirmation number and email address to view your reservation.
        </p>

        <form className="be-manage-form" onSubmit={onLookup}>
          <div className="be-form-row">
            <div className="be-field">
              <label htmlFor="mb-conf">Confirmation number</label>
              <input
                id="mb-conf"
                type="text"
                value={confirmation}
                onChange={e => setConfirmation(e.target.value)}
                placeholder="e.g. 123456"
                autoComplete="off"
              />
            </div>
            <div className="be-field">
              <label htmlFor="mb-email">Email address</label>
              <input
                id="mb-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary be-full-btn" disabled={loading}>
            {loading ? "Looking up…" : "Find booking"}
          </button>
        </form>

        {error && (
          <div className="be-manage-error">
            <p>{error}</p>
          </div>
        )}

        {lookupDone && b && (
          <div className="be-manage-result">
            <div className="be-manage-card">
              <div className="be-manage-card-header">
                <h2>Reservation details</h2>
                <span className={`be-manage-status be-manage-status--${(b.Status ?? "").toLowerCase()}`}>
                  {b.Status ?? "Unknown"}
                </span>
              </div>

              <dl className="be-manage-dl">
                <dt>Confirmation</dt>
                <dd>{b.ConfirmationNumber ?? confirmation}</dd>
                <dt>Guest</dt>
                <dd>{b.GuestName ?? "—"}</dd>
                <dt>Room</dt>
                <dd>{b.RoomName ?? "—"}</dd>
                <dt>Check-in</dt>
                <dd>{b.CheckInDate ? formatDateLong(b.CheckInDate) : "—"}</dd>
                <dt>Check-out</dt>
                <dd>{b.CheckOutDate ? formatDateLong(b.CheckOutDate) : "—"}</dd>
                {b.TotalAmount && (
                  <>
                    <dt>Total</dt>
                    <dd>{formatCurrency(Number(b.TotalAmount), b.Currency ?? "NZD")}</dd>
                  </>
                )}
                {b.CancellationPolicy && (
                  <>
                    <dt>Cancellation</dt>
                    <dd>{b.CancellationPolicy}</dd>
                  </>
                )}
              </dl>

              <p className="be-manage-note">
                Need to make changes? Please{" "}
                <a href="mailto:reservations@brooksidemotel.co.nz">contact our front desk</a>{" "}
                or call <a href="tel:+6439300060">+64 3 930 0060</a>.
              </p>
            </div>
          </div>
        )}

        {lookupDone && !b && !error && (
          <div className="be-manage-empty">
            <p>No booking found with those details. Please double-check and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
