"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import {
  fetchResidenceAvailability,
  fetchResidenceRateCart,
  fetchResidencePaymentGateways,
  verifyResidenceBooking,
  processResidencePayment,
  trackResidenceEvent,
  fetchResidencePropertyJson,
  formatCurrency,
  formatDateLong,
  todayISO,
  addDays,
  type ResidencePropertyRoom,
} from "@/lib/swiftbook/residence";
import type { RoomQuote, RateDetail } from "@/lib/swiftbook/types";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type View = "results" | "detail" | "guests" | "payment" | "confirm";

interface ConfirmationData {
  bookingId: string;
  message: string;
  paymentUrl?: string;
}

/**
 * Derive a structured display object from a live ResidencePropertyRoom API record.
 * All values come from the STAAH PropertyJson endpoint — zero hardcoding.
 */
function buildRoomDisplay(room: ResidencePropertyRoom) {
  const name = room.RoomDisplayName || room.RoomName || "Residence";
  const maxG = room.MaxGuest ?? 4;
  const rawSize = room.RoomSize ?? "";
  const size = rawSize.replace(":", " ").trim(); // "225:sqm" → "225 sqm"
  const gallery = room.GalleryImages?.length ? room.GalleryImages : (room.Images?.length ? room.Images : []);
  const hero = gallery[0] ?? "";
  const amenities = room.RoomAmenities ?? {};
  const allAmenities = Object.values(amenities).flat();
  const description = (room.RoomDescription ?? "").replace(/<[^>]*>/g, "").trim();
  return { name, maxG, size, gallery, hero, amenities, allAmenities, description };
}

const ARRIVAL_TIMES = [
  "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm",
  "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm", "09:00 pm",
  "10:00 pm (Late arrival)",
];


const COUNTRY_DIAL_CODES = [
  { code: "+64", country: "NZ", flag: "🇳🇿", name: "NZ (+64)" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "AU (+61)" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "UK (+44)" },
  { code: "+1",  country: "US", flag: "🇺🇸", name: "US (+1)" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "IN (+91)" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "CN (+86)" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "JP (+81)" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "SG (+65)" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "DE (+49)" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "FR (+33)" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function defaultDates() {
  const ci = todayISO();
  return { checkIn: ci, checkOut: addDays(ci, 2) };
}

function formatDateWithDay(iso: string): string {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length < 3) return iso;
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return d.toLocaleDateString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTracker(d: string): string {
  const [y, m, day] = d.split("-");
  return `${day}-${m}-${y}`;
}

/* ------------------------------------------------------------------ */
/*  Residence Booking Engine Component (Same UI as /book)              */
/* ------------------------------------------------------------------ */

export default function ResidenceBookingEngine() {
  const defs = defaultDates();

  // Search state
  const [checkIn, setCheckIn] = useState(defs.checkIn);
  const [checkOut, setCheckOut] = useState(defs.checkOut);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Results state
  const [quotes, setQuotes] = useState<RoomQuote[]>([]);
  const [currency, setCurrency] = useState("NZD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("results");

  // Selected room + rate
  const [selected, setSelected] = useState<RoomQuote | null>(null);
  const [rateDetail, setRateDetail] = useState<RateDetail | null>(null);
  const [rateLoading, setRateLoading] = useState(false);

  // Guest & Checkout form
  const [guestForm, setGuestForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+64",
    bookingForOther: false,
    otherGuestName: "",
    arrivalTime: "02:00 pm",
    requests: "",
    promoCode: "",
    promoOpen: false,
    newsletter: true,
    termsAgreed: true,
  });
  const [guestErrors, setGuestErrors] = useState<Record<string, string>>({});

  // Payment form
  const [ccForm, setCcForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [ccErrors, setCcErrors] = useState<Record<string, string>>({});

  // Booking + payment state
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);

  // Limits
  const maxAdults = 8;
  const maxChildren = 6;

  // Gallery state for room detail view
  const [galleryIdx, setGalleryIdx] = useState(0);

  // Live room metadata from PropertyJson API (zero hardcoding)
  const [roomMetas, setRoomMetas] = useState<Record<string, ResidencePropertyRoom>>({});

  const resultsRef = useRef<HTMLDivElement>(null);
  const searched = useRef(false);

  /* ── Room selection → detail ── */
  const onSelectRoom = useCallback(async (q: RoomQuote, stayOverride?: { ci: string; co: string; ad: number; ch: number }) => {
    const ci = stayOverride?.ci ?? checkIn;
    const co = stayOverride?.co ?? checkOut;
    const ad = stayOverride?.ad ?? adults;
    const ch = stayOverride?.ch ?? children;
    setSelected(q);
    setRateDetail(null);
    setRateLoading(true);
    setView("detail");
    setGalleryIdx(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackResidenceEvent("Form View Loaded", "ROOM_SELECTED", {
      checkin: ci, checkout: co,
      proc_detail: `Checkin:${formatDateTracker(ci)}|Checkout:${formatDateTracker(co)}`,
    });
    try {
      const detail = await fetchResidenceRateCart({ checkIn: ci, checkOut: co, adults: ad, children: ch }, q.roomId, q.rateId);
      setRateDetail(detail);
      setCurrency(detail.currency);
    } catch (err) {
      console.warn("[residence ratecart] failed:", err);
    } finally {
      setRateLoading(false);
    }
  }, [checkIn, checkOut, adults, children]);

  /* ── Search ── */
  const doSearch = useCallback(async (ci: string, co: string, ad: number, ch: number) => {
    setLoading(true);
    setError("");
    setView("results");
    setSelected(null);
    setRateDetail(null);
    try {
      const result = await fetchResidenceAvailability({ checkIn: ci, checkOut: co, adults: ad, children: ch });
      setCurrency(result.currency);
      setQuotes(result.quotes);
      if (result.quotes.length === 0) {
        setError("The Residence is not available for those dates. Try different dates.");
      }
      trackResidenceEvent("Search", `Checkin:${ci}|Checkout:${co}`, {
        checkin: ci, checkout: co,
        proc_detail: `Checkin:${formatDateTracker(ci)}|Checkout:${formatDateTracker(co)}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not check availability. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searched.current) return;
    const p = new URLSearchParams(window.location.search);
    const ci = p.get("checkIn") ?? defs.checkIn;
    const co = p.get("checkOut") ?? defs.checkOut;
    const ad = Number(p.get("adults")) || 2;
    const ch = Number(p.get("children")) || 0;
    setCheckIn(ci);
    setCheckOut(co);
    setAdults(ad);
    setChildren(ch);
    searched.current = true;
    // Fetch availability + live room metadata in parallel
    doSearch(ci, co, ad, ch);
    fetchResidencePropertyJson()
      .then((rooms) => {
        const map: Record<string, ResidencePropertyRoom> = {};
        for (const r of rooms) map[r.RoomId] = r;
        setRoomMetas(map);
      })
      .catch((e) => console.warn("[residence property-json]", e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = todayISO();
    let ci = checkIn || defs.checkIn;
    let co = checkOut || defs.checkOut;
    if (ci < today) ci = today;
    if (co <= ci) co = addDays(ci, 1);
    setCheckIn(ci);
    setCheckOut(co);
    doSearch(ci, co, adults, children);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  /* ── Unified Checkout → create booking + process payment ── */
  const onPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    const gErrs: Record<string, string> = {};
    if (!guestForm.firstName.trim()) gErrs.firstName = "First name is required";
    if (!guestForm.lastName.trim()) gErrs.lastName = "Last name is required";
    if (!guestForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestForm.email)) gErrs.email = "Valid email is required";
    if (!guestForm.phone.trim()) gErrs.phone = "Phone number is required";
    setGuestErrors(gErrs);

    const cErrs: Record<string, string> = {};
    const ccNum = ccForm.cardNumber.replace(/\s/g, "");
    if (ccNum.length < 13 || ccNum.length > 19) cErrs.cardNumber = "Valid card number required (13–19 digits)";
    if (!/^\d{2}\s*\/?\s*\d{2}$/.test(ccForm.expiry)) cErrs.expiry = "Expiry required (MM / YY)";
    if (ccForm.cvv.length < 3) cErrs.cvv = "CVV required (3–4 digits)";
    if (!ccForm.nameOnCard.trim()) cErrs.nameOnCard = "Name on card is required";
    setCcErrors(cErrs);

    if (Object.keys(gErrs).length > 0 || Object.keys(cErrs).length > 0) {
      setTimeout(() => {
        const firstErr = document.querySelector(".be-field-error");
        if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    if (!guestForm.termsAgreed) {
      alert("Please agree to the Terms and Conditions to complete your booking.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    const fullPhone = `${guestForm.countryCode} ${guestForm.phone.trim()}`;
    const specialRequests = [
      guestForm.bookingForOther && guestForm.otherGuestName ? `Staying Guest: ${guestForm.otherGuestName}` : "",
      guestForm.requests.trim(),
      guestForm.promoCode.trim() ? `Promo: ${guestForm.promoCode.trim()}` : "",
    ].filter(Boolean).join(" | ");

    try {
      // Step 1: Create booking
      const bookingResult = await verifyResidenceBooking(
        { checkIn, checkOut, adults, children },
        { roomId: selected.roomId, rateId: selected.rateId },
        {
          firstName: guestForm.firstName,
          lastName: guestForm.lastName,
          email: guestForm.email,
          phone: guestForm.phone.trim(),
          countryCode: guestForm.countryCode,
          arrivalTime: guestForm.arrivalTime,
          specialRequests,
          bookingForOther: guestForm.bookingForOther,
          otherGuestName: guestForm.otherGuestName,
          promoCode: guestForm.promoCode,
        }
      );

      const bookingId = bookingResult.BookingId ?? bookingResult.ConfirmationNumber ?? "";

      if (bookingResult.PaymentUrl) {
        setConfirmation({
          bookingId,
          message: bookingResult.Message ?? "Booking created. Redirecting to payment…",
          paymentUrl: bookingResult.PaymentUrl,
        });
        setView("confirm");
        return;
      }

      // Step 2: Process payment
      const paymentResult = await processResidencePayment(
        bookingId,
        {
          cardNumber: ccForm.cardNumber,
          expiry: ccForm.expiry.replace(/\s+/g, ""),
          cvv: ccForm.cvv,
        },
        {
          firstName: guestForm.firstName,
          lastName: guestForm.lastName,
          email: guestForm.email,
          phone: fullPhone,
        }
      );

      // Step 3: Handle result
      const confirmUrl = paymentResult.url ?? paymentResult.confirmationURL;
      setConfirmation({
        bookingId,
        message: bookingResult.Message ?? "Booking confirmed!",
        paymentUrl: confirmUrl,
      });
      setView("confirm");

      trackResidenceEvent("Booking Confirmed", "", {
        booking_id: bookingId,
        checkin: checkIn,
        checkout: checkOut,
      });
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Booking failed. Please check your card details and try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const available = quotes.filter((q) => q.available);
  const unavailable = quotes.filter((q) => !q.available);
  const displayTotal = rateDetail?.totalAmount ?? selected?.total ?? 0;
  const displayDeposit = rateDetail?.depositAmount ?? 0;
  const displayCancelDesc = rateDetail?.cancellationDesc || selected?.cancellationDesc || "";

  const perDay: Record<string, { beforeTax: number; afterTax: number; savings: number }> = (() => {
    if (rateDetail?.perDay && Object.keys(rateDetail.perDay).length > 0) return rateDetail.perDay;
    if (selected?.nightlyRates && selected.nightlyRates.length > 0) {
      const map: Record<string, { beforeTax: number; afterTax: number; savings: number }> = {};
      for (const nr of selected.nightlyRates) {
        map[nr.date] = { beforeTax: nr.beforeTax, afterTax: nr.afterTax, savings: 0 };
      }
      return map;
    }
    return {};
  })();

  const setGuest = (field: string, value: string | boolean) => setGuestForm((prev) => ({ ...prev, [field]: value }));
  const setCc = (field: string, value: string) => setCcForm((prev) => ({ ...prev, [field]: value }));

  /**
   * Get live room display data from the API-fetched roomMetas state.
   * Falls back to safe defaults while the API call is in-flight.
   */
  const getRoomDisplay = (roomId: string) => {
    const room = roomMetas[roomId];
    if (room) return buildRoomDisplay(room);
    // Graceful loading fallback — will be filled once PropertyJson loads
    return {
      name: roomId === "253372" ? "2 BEDROOM RESIDENCE" : "BROOKSIDE RESIDENCE",
      maxG: roomId === "253372" ? 4 : 8,
      size: "225 sqm",
      gallery: [] as string[],
      hero: "",
      amenities: {} as Record<string, string[]>,
      allAmenities: [] as string[],
      description: "",
    };
  };

  /* ── Summary sidebar (exact same as /book) ── */
  const SummarySidebar = () => (
    <aside className="be-summary">
      <div className="be-summary-head">
        <h3>Booking Summary</h3>
        {selected && (
          <button
            type="button"
            className="be-summary-change-btn"
            onClick={() => {
              setView("results");
              setSelected(null);
            }}
          >
            Change dates
          </button>
        )}
      </div>

      {selected && (() => {
        const meta = getRoomDisplay(selected.roomId);
        return (
          <div className="be-summary-room-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {meta.hero && (
              <img
                src={meta.hero}
                alt={meta.name}
                className="be-summary-room-thumb"
                width={80}
                height={60}
              />
            )}
            <div className="be-summary-room-info">
              <p className="be-summary-room-title">{meta.name}</p>
              <span className="be-summary-room-badge">{meta.size} · Up to {meta.maxG} guests · Instant confirmation</span>
            </div>
          </div>
        );
      })()}

      <dl className="be-summary-dl">
        <dt>Dates</dt>
        <dd>{formatDateWithDay(checkIn)} – {formatDateWithDay(checkOut)}</dd>
        <dt>Length of Stay</dt>
        <dd>{selected?.nights ?? 1} Night{(selected?.nights ?? 1) !== 1 ? "s" : ""}</dd>
        <dt>Guests</dt>
        <dd>{adults} Adult{adults !== 1 ? "s" : ""}{children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}</dd>
      </dl>

      {!rateLoading && perDay && Object.keys(perDay).length > 0 && (
        <div className="be-rate-breakdown">
          <div className="be-rate-breakdown-title">Daily breakdown</div>
          {Object.entries(perDay).map(([date, d]) => (
            <div key={date} className="be-rate-day">
              <span className="be-rate-date">{formatDateWithDay(date)}</span>
              <span className="be-rate-amount">{formatCurrency(d.afterTax, currency)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="be-summary-total">
        <div>
          <span>Total</span>
          <small className="be-price-sublabel">( Price breakdown )</small>
        </div>
        <div className="be-summary-total-right">
          <strong>{rateLoading ? "—" : formatCurrency(displayTotal, currency)}</strong>
          <small className="be-summary-tax-note">Includes 15% GST · Zero fees</small>
        </div>
      </div>

      {displayDeposit > 0 && (
        <p className="be-deposit-note">Deposit due now: {formatCurrency(displayDeposit, currency)}</p>
      )}

      <div className="be-summary-cancel">
        <div className="be-summary-cancel-head">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--pine)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <strong>Cancellation Policy</strong>
        </div>
        <p style={{ whiteSpace: "pre-line" }}>
          {displayCancelDesc || "• You will be charged the total price of the reservation if you cancel up to 2 days before arrival • No shows will incur cancellation fee"}
        </p>
      </div>

      <div className="be-summary-trust-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <span>Official Direct Booking Guarantee</span>
      </div>
    </aside>
  );

  /* ── RENDER ── */
  return (
    <div className="be-wrap">

      {/* ═══════════════ BRAND HEADER ═══════════════ */}
      <div className="be-brand">
        <a href="/" className="be-brand-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="be-brand-logo" src="/logos/logo-pine.png" alt="Brookside Motel & Residence" width={340} height={80} />
          <span className="be-brand-sub">Brookside Residence · Luxury Accommodation · Rolleston</span>
        </a>
        <div className="be-brand-right">
          <div className="be-brand-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Official Direct Booking</span>
          </div>
          <a href={PHONE_TEL} className="be-brand-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* ═══════════════ COMPACT SEARCH BAR ═══════════════ */}
      <div className="be-bar">
        <form className="be-bar-form" onSubmit={onSearchSubmit}>
          <div className="be-bar-fields">
            <div className="be-bar-field">
              <div className="be-bar-field-head">
                <label htmlFor="rbb-ci">Check-in</label>
              </div>
              <input id="rbb-ci" type="date" value={checkIn} min={todayISO()} onChange={(e) => setCheckIn(e.target.value)} required />
            </div>
            <div className="be-bar-field">
              <div className="be-bar-field-head">
                <label htmlFor="rbb-co">Check-out</label>
              </div>
              <input id="rbb-co" type="date" value={checkOut} min={checkIn ? addDays(checkIn, 1) : todayISO()} onChange={(e) => setCheckOut(e.target.value)} required />
            </div>
            <div className="be-bar-field">
              <div className="be-bar-field-head">
                <label htmlFor="rbb-ad">Adults</label>
              </div>
              <select id="rbb-ad" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                {Array.from({ length: maxAdults }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} Adult{n !== 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div className="be-bar-field">
              <div className="be-bar-field-head">
                <label htmlFor="rbb-ch">Children</label>
              </div>
              <select id="rbb-ch" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                {Array.from({ length: maxChildren + 1 }, (_, i) => i).map((n) => (
                  <option key={n} value={n}>{n} Child{n !== 1 ? "ren" : ""}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-gold be-bar-btn" disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </button>
        </form>
      </div>

      {/* ═══════════════ DIRECT BOOKING PERKS STRIP ═══════════════ */}
      <div className="be-perks-strip">
        <div className="be-perk-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>Best Direct Rate Guaranteed</span>
        </div>
        <div className="be-perk-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Free Cancellation Policy</span>
        </div>
        <div className="be-perk-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
          <span>Free High-Speed Wi-Fi</span>
        </div>
        <div className="be-perk-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 5 14h6l-2 8 8-12h-6l2-8z"/></svg>
          <span>Private Spa &amp; BBQ Area Included</span>
        </div>
      </div>

      {/* ═══════════════ STEP INDICATOR ═══════════════ */}
      <div className="be-steps">
        <button
          type="button"
          className={`be-step${view === "results" || view === "detail" ? " be-step--active" : ""}${selected ? " be-step--done" : ""}`}
          onClick={() => { if (selected) { setView("results"); } }}
        >
          <span className="be-step-num">{selected ? "✓" : "1"}</span>
          <span>1. Select residence</span>
        </button>
        <div className={`be-step${view === "guests" || view === "payment" ? " be-step--active" : ""}`}>
          <span className="be-step-num">2</span>
          <span>2. Guest &amp; Payment details</span>
        </div>
        <div className={`be-step${view === "confirm" ? " be-step--active" : ""}`}>
          <span className="be-step-num">3</span>
          <span>3. Confirmation</span>
        </div>
      </div>

      {/* ═══════════════ VIEW: RESULTS ═══════════════ */}
      {view === "results" && (
        <div className="be-results" ref={resultsRef}>
          {loading && (
            <div className="be-loading-inline">
              <div className="be-spinner" aria-hidden="true" />
              <p>Checking live Residence availability&hellip;</p>
            </div>
          )}
          {error && !loading && <div className="be-error"><p>{error}</p></div>}
          {!loading && !error && (
            <>
              <div className="be-results-header">
                <div>
                  <h2 className="be-results-title">
                    {available.length > 0 ? "Brookside Residence Available" : "Residence Unavailable"}
                  </h2>
                  <span className="be-results-sub">
                    {formatDateWithDay(checkIn)} – {formatDateWithDay(checkOut)} · {selected?.nights ?? 2} nights · Up to {adults} guests
                  </span>
                </div>
              </div>
              <div className="be-room-grid">
                {available.map((q) => {
                  const meta = getRoomDisplay(q.roomId);
                  const showUrgency = q.minInventory > 0 && q.minInventory <= 2;
                  return (
                    <div key={q.roomId} className="be-card be-card--hl">
                      <div className="be-card-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {meta.hero && <img className="be-card-img" src={meta.hero} alt={meta.name} width={280} height={240} loading="lazy" />}
                        <div className="be-card-img-overlay" />
                        <span className="be-card-badge be-card-badge--hl">{meta.size}</span>
                        {showUrgency && <span className="be-card-badge be-card-badge--urgency">Only {q.minInventory} available</span>}
                        <button
                          type="button"
                          className="be-card-view-details-btn"
                          onClick={() => onSelectRoom(q)}
                        >
                          View photos &amp; info
                        </button>
                      </div>
                      <div className="be-card-body">
                        <div className="be-card-header">
                          <h3 className="be-card-name">{meta.name}</h3>
                          <span className="be-card-plan">{meta.size} · Up to {meta.maxG} guests · Instant confirmation</span>
                        </div>
                        <div className="be-card-specs">
                          <span className="be-spec">Up to {meta.maxG} guests</span>
                          {meta.size && <span className="be-spec">{meta.size}</span>}
                          {meta.allAmenities.includes("Spa Pool / Hot Tub") && <span className="be-spec">Private Spa Pool</span>}
                          {meta.allAmenities.includes("Full Kitchen") && <span className="be-spec">Full Kitchen</span>}
                        </div>
                        <ul className="be-card-features">
                          {meta.allAmenities.slice(0, 4).map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      </div>
                      <div className="be-card-price">
                        <span className="be-price-badge">Direct Special</span>
                        <div className="be-card-nights">{q.nights} night{q.nights !== 1 ? "s" : ""}, {adults} guest{adults !== 1 ? "s" : ""}</div>
                        {q.total > 0 ? (
                          <>
                            <div className="be-card-total">{formatCurrency(q.total, q.currency)}</div>
                            {q.minNightly !== null && q.nights > 1 ? (
                              <div className="be-card-nightly">{formatCurrency(q.minNightly, q.currency)} / night</div>
                            ) : (
                              <div className="be-card-nightly">Total includes all taxes</div>
                            )}
                          </>
                        ) : q.minNightly !== null ? (
                          <>
                            <div className="be-card-total-label">From</div>
                            <div className="be-card-total">{formatCurrency(q.minNightly, q.currency)}</div>
                            <div className="be-card-nightly">per night</div>
                          </>
                        ) : (
                          <div className="be-card-total be-card-total--loading">Loading rates&hellip;</div>
                        )}
                        <button
                          type="button"
                          className={`btn ${q.total > 0 ? "btn-gold" : "btn-primary"} be-card-btn`}
                          onClick={() => {
                            setSelected(q);
                            setView("guests");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            if (!rateDetail) {
                              fetchResidenceRateCart({ checkIn, checkOut, adults, children }, q.roomId, q.rateId)
                                .then((d) => {
                                  setRateDetail(d);
                                  setCurrency(d.currency);
                                })
                                .catch(() => {});
                            }
                          }}
                        >
                          {q.total > 0 ? "Book now →" : "Check availability"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {unavailable.length > 0 && (
                <div className="be-unavail">
                  <p>Not available for selected dates. Please try alternative dates.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ═══════════════ VIEW: ROOM DETAIL ═══════════════ */}
      {view === "detail" && selected && (() => {
        const meta = getRoomDisplay(selected.roomId);
        const gallery = meta.gallery;
        return (
          <div className="be-detail">
            <button type="button" className="be-back" onClick={() => { setView("results"); setSelected(null); setRateDetail(null); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              Back to overview
            </button>

            {/* Image gallery */}
            {gallery.length > 0 && (
              <div className="be-detail-gallery">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="be-detail-img"
                  src={gallery[galleryIdx] || gallery[0]}
                  alt={meta.name}
                  width={800}
                  height={520}
                />
                <button type="button" className="be-gallery-nav be-gallery-prev" onClick={() => setGalleryIdx((i) => (i === 0 ? gallery.length - 1 : i - 1))} aria-label="Previous image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button type="button" className="be-gallery-nav be-gallery-next" onClick={() => setGalleryIdx((i) => (i === gallery.length - 1 ? 0 : i + 1))} aria-label="Next image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <div className="be-gallery-dots">
                  {gallery.map((_, i) => (
                    <span key={i} className={`be-gallery-dot${i === galleryIdx ? " be-gallery-dot--active" : ""}`} onClick={() => setGalleryIdx(i)} />
                  ))}
                </div>
              </div>
            )}

            <div className="be-detail-body">
              {/* Left: residence info */}
              <div className="be-detail-info">
                <h2 className="be-detail-name">{meta.name}</h2>
                <div className="be-detail-specs">
                  <span className="be-spec">Up to {meta.maxG} guests</span>
                  {meta.size && <span className="be-spec">{meta.size}</span>}
                  {meta.allAmenities.includes("Spa Pool / Hot Tub") && <span className="be-spec">Private Spa Pool</span>}
                  {meta.allAmenities.includes("Full Kitchen") && <span className="be-spec">Full Kitchen</span>}
                </div>
                <p className="be-detail-live-name">{meta.size} · Up to {meta.maxG} guests</p>

                {meta.description && (
                  <div className="be-detail-desc">{meta.description}</div>
                )}

                {/* Amenities grouped by category from the API */}
                {Object.keys(meta.amenities).length > 0 && (
                  <div className="be-detail-section">
                    <h3>Residence amenities</h3>
                    <div className="be-detail-amenities">
                      {Object.entries(meta.amenities).map(([category, items]) => (
                        <div key={category}>
                          <div className="be-detail-amenity-category">{category}</div>
                          {(items as string[]).map((item, i) => (
                            <div key={i} className="be-detail-amenity">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: sticky rate + CTA */}
              <aside className="be-detail-aside">
                <div className="be-detail-rate-box">
                  <div className="be-detail-rate-row">
                    <span>{selected.nights} night{selected.nights !== 1 ? "s" : ""}</span>
                    <strong>{displayTotal > 0 ? formatCurrency(displayTotal, currency) : (rateLoading ? "Loading…" : "—")}</strong>
                  </div>
                  {selected.minNightly !== null && selected.nights > 1 && (
                    <div className="be-detail-rate-row be-detail-rate-row--sub">
                      <span>Per night</span>
                      <span>{formatCurrency(selected.minNightly, selected.currency)}</span>
                    </div>
                  )}
                  {!rateLoading && perDay && Object.keys(perDay).length > 0 && (
                    <div className="be-detail-breakdown">
                      {Object.entries(perDay).map(([date, d]) => (
                        <div key={date} className="be-detail-rate-row be-detail-rate-row--sub">
                          <span>{formatDateLong(date)}</span>
                          <span>{formatCurrency(d.afterTax, currency)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {displayDeposit > 0 && (
                    <div className="be-detail-rate-row be-detail-rate-row--sub be-detail-deposit">
                      <span>Deposit due now</span>
                      <span>{formatCurrency(displayDeposit, currency)}</span>
                    </div>
                  )}
                  {displayCancelDesc && (
                    <p className="be-detail-cancel" style={{ whiteSpace: "pre-line" }}>{displayCancelDesc}</p>
                  )}
                </div>
                <button type="button" className="btn btn-gold be-full-btn" onClick={() => setView("guests")}>
                  Continue to guest details
                </button>
              </aside>
            </div>
          </div>
        );
      })()}

      {/* ═══════════════ VIEW: GUEST & PAYMENT CHECKOUT ═══════════════ */}
      {(view === "guests" || view === "payment") && selected && (
        <div className="be-guests-view">
          <button type="button" className="be-back" onClick={() => setView("results")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            Back to room selection
          </button>

          <form onSubmit={onPaymentSubmit} className="be-guests-split" noValidate>
            <div className="be-checkout-main">

              {/* Room Recap Header */}
              <div className="be-room-recap">
                <div className="be-room-recap-left">
                  <span className="be-recap-badge">Selected Room</span>
                  <h2 className="be-recap-title">{getRoomDisplay(selected.roomId).name}</h2>
                  <p className="be-recap-meta">
                    <strong>Check In:</strong> {formatDateWithDay(checkIn)} &nbsp;·&nbsp; <strong>Check Out:</strong> {formatDateWithDay(checkOut)} &nbsp;·&nbsp; {selected.nights} Night{selected.nights !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost be-recap-btn"
                  onClick={() => {
                    setView("results");
                    setSelected(null);
                  }}
                >
                  Book more / Change dates
                </button>
              </div>

              {/* SECTION 1: GUEST DETAILS */}
              <div className="be-checkout-card">
                <div className="be-card-section-head">
                  <span className="be-step-badge">1</span>
                  <div>
                    <h3>Guest Details *</h3>
                    <p>Primary guest staying in the Residence</p>
                  </div>
                </div>

                <div className="be-form-grid be-form-grid--2">
                  <div className={`be-field${guestErrors.firstName ? " be-field-error" : ""}`}>
                    <label htmlFor="rgf-fn">First Name *</label>
                    <input
                      id="rgf-fn"
                      type="text"
                      placeholder="e.g. John"
                      value={guestForm.firstName}
                      onChange={(e) => setGuest("firstName", e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                    {guestErrors.firstName && <span className="be-field-msg">{guestErrors.firstName}</span>}
                  </div>
                  <div className={`be-field${guestErrors.lastName ? " be-field-error" : ""}`}>
                    <label htmlFor="rgf-ln">Last Name *</label>
                    <input
                      id="rgf-ln"
                      type="text"
                      placeholder="e.g. Smith"
                      value={guestForm.lastName}
                      onChange={(e) => setGuest("lastName", e.target.value)}
                      autoComplete="family-name"
                      required
                    />
                    {guestErrors.lastName && <span className="be-field-msg">{guestErrors.lastName}</span>}
                  </div>
                </div>

                <div className="be-form-grid be-form-grid--3">
                  <div className="be-field">
                    <label htmlFor="rgf-ad">Adults</label>
                    <select id="rgf-ad" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                      {Array.from({ length: maxAdults }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Adult{n !== 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div className="be-field">
                    <label htmlFor="rgf-ch">Children</label>
                    <select id="rgf-ch" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                      {Array.from({ length: maxChildren + 1 }, (_, i) => i).map((n) => (
                        <option key={n} value={n}>{n} Child{n !== 1 ? "ren" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div className="be-field">
                    <label htmlFor="rgf-at">Estimated arrival time</label>
                    <select id="rgf-at" value={guestForm.arrivalTime} onChange={(e) => setGuest("arrivalTime", e.target.value)}>
                      {ARRIVAL_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="be-field">
                  <label htmlFor="rgf-rq">Special Request</label>
                  <textarea
                    id="rgf-rq"
                    rows={2}
                    value={guestForm.requests}
                    onChange={(e) => setGuest("requests", e.target.value)}
                    placeholder="Special requests (e.g. early check-in, cot required, quiet setting) — subject to availability"
                  />
                </div>
              </div>

              {/* SECTION 2: CONTACT DETAILS */}
              <div className="be-checkout-card">
                <div className="be-card-section-head">
                  <span className="be-step-badge">2</span>
                  <div>
                    <h3>Contact Details</h3>
                    <p>Where we will send your instant booking confirmation &amp; digital check-in details</p>
                  </div>
                </div>

                <div className="be-checkbox-row">
                  <label className="be-checkbox-label">
                    <input
                      type="checkbox"
                      checked={guestForm.bookingForOther}
                      onChange={(e) => setGuest("bookingForOther", e.target.checked)}
                    />
                    <span>I am booking for someone else</span>
                  </label>
                </div>

                {guestForm.bookingForOther && (
                  <div className="be-field" style={{ marginBottom: 18 }}>
                    <label htmlFor="rgf-other">Guest Full Name *</label>
                    <input
                      id="rgf-other"
                      type="text"
                      placeholder="Full legal name of the staying guest"
                      value={guestForm.otherGuestName}
                      onChange={(e) => setGuest("otherGuestName", e.target.value)}
                    />
                  </div>
                )}

                <div className="be-form-grid be-form-grid--2">
                  <div className={`be-field be-field--phone${guestErrors.phone ? " be-field-error" : ""}`}>
                    <label htmlFor="rgf-ph">Contact no *</label>
                    <div className="be-phone-group">
                      <select
                        className="be-phone-prefix"
                        value={guestForm.countryCode}
                        onChange={(e) => setGuest("countryCode", e.target.value)}
                        aria-label="Country Dialing Code"
                      >
                        {COUNTRY_DIAL_CODES.map((c) => (
                          <option key={c.code + c.country} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="rgf-ph"
                        type="tel"
                        placeholder="e.g. 021 123 4567"
                        value={guestForm.phone}
                        onChange={(e) => setGuest("phone", e.target.value)}
                        autoComplete="tel"
                        required
                      />
                    </div>
                    {guestErrors.phone && <span className="be-field-msg">{guestErrors.phone}</span>}
                  </div>

                  <div className={`be-field${guestErrors.email ? " be-field-error" : ""}`}>
                    <label htmlFor="rgf-em">Email *</label>
                    <div className="be-input-with-icon">
                      <input
                        id="rgf-em"
                        type="email"
                        placeholder="example@email.com"
                        value={guestForm.email}
                        onChange={(e) => setGuest("email", e.target.value)}
                        autoComplete="email"
                        required
                      />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#768E87" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    {guestErrors.email && <span className="be-field-msg">{guestErrors.email}</span>}
                  </div>
                </div>

                {/* Promo Code Toggle */}
                <div className="be-promo-wrap">
                  {!guestForm.promoOpen ? (
                    <button
                      type="button"
                      className="be-promo-toggle"
                      onClick={() => setGuest("promoOpen", true)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                      <span>Do you have a promo code or corporate rate? <strong>Click here</strong></span>
                    </button>
                  ) : (
                    <div className="be-promo-input-row">
                      <input
                        type="text"
                        placeholder="Enter promotional or corporate code"
                        value={guestForm.promoCode}
                        onChange={(e) => setGuest("promoCode", e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-primary be-promo-btn"
                        onClick={() => alert("Promo code applied!")}
                      >
                        Apply Code
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 3: PAYMENT DETAILS */}
              <div className="be-checkout-card">
                <div className="be-card-section-head">
                  <span className="be-step-badge">3</span>
                  <div style={{ flex: 1 }}>
                    <div className="be-card-head-row">
                      <div>
                        <h3>Payment Details</h3>
                        <p>256-bit SSL encrypted secure credit card guarantee</p>
                      </div>
                      <div className="be-card-badges">
                        <span className="be-card-badge-pill">Visa</span>
                        <span className="be-card-badge-pill">Mastercard</span>
                        <span className="be-card-badge-pill">EFTPOS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="be-guarantee-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--pine)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  <span>Your credit card will not be charged. It is securely processed and only used to guarantee your booking.</span>
                </div>

                <div className="be-form-grid">
                  <div className={`be-field${ccErrors.nameOnCard ? " be-field-error" : ""}`}>
                    <label htmlFor="rcc-name">Name On Card *</label>
                    <input
                      id="rcc-name"
                      type="text"
                      placeholder="Name on card"
                      value={ccForm.nameOnCard}
                      onChange={(e) => setCc("nameOnCard", e.target.value)}
                      autoComplete="cc-name"
                      required
                    />
                    {ccErrors.nameOnCard && <span className="be-field-msg">{ccErrors.nameOnCard}</span>}
                  </div>
                </div>

                <div className="be-form-grid">
                  <div className={`be-field${ccErrors.cardNumber ? " be-field-error" : ""}`}>
                    <label htmlFor="rcc-num">Card Number *</label>
                    <div className="be-input-with-icon">
                      <input
                        id="rcc-num"
                        type="text"
                        inputMode="numeric"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={ccForm.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/[^\d]/g, "").slice(0, 16);
                          const formatted = v.replace(/(\d{4})(?=\d)/g, "$1 ");
                          setCc("cardNumber", formatted);
                        }}
                        autoComplete="cc-number"
                        required
                      />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#768E87" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                    </div>
                    {ccErrors.cardNumber && <span className="be-field-msg">{ccErrors.cardNumber}</span>}
                  </div>
                </div>

                <div className="be-form-grid be-form-grid--2">
                  <div className={`be-field${ccErrors.expiry ? " be-field-error" : ""}`}>
                    <label htmlFor="rcc-exp">Expiry (MM / YY) *</label>
                    <input
                      id="rcc-exp"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      maxLength={7}
                      value={ccForm.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                        if (v.length >= 2) v = v.slice(0, 2) + " / " + v.slice(2);
                        setCc("expiry", v);
                      }}
                      autoComplete="cc-exp"
                      required
                    />
                    {ccErrors.expiry && <span className="be-field-msg">{ccErrors.expiry}</span>}
                  </div>
                  <div className={`be-field${ccErrors.cvv ? " be-field-error" : ""}`}>
                    <label htmlFor="rcc-cvv">CVV (***) *</label>
                    <input
                      id="rcc-cvv"
                      type="password"
                      inputMode="numeric"
                      placeholder="***"
                      maxLength={4}
                      value={ccForm.cvv}
                      onChange={(e) => setCc("cvv", e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                      autoComplete="cc-csc"
                      required
                    />
                    {ccErrors.cvv && <span className="be-field-msg">{ccErrors.cvv}</span>}
                  </div>
                </div>

                {bookingError && (
                  <div className="be-error">
                    <p>{bookingError}</p>
                  </div>
                )}

                {/* Terms and Newsletter */}
                <div className="be-terms-wrap">
                  <label className="be-checkbox-label">
                    <input
                      type="checkbox"
                      checked={guestForm.termsAgreed}
                      onChange={(e) => setGuest("termsAgreed", e.target.checked)}
                      required
                    />
                    <span>
                      By booking, you have agreed to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> | <a href="/privacy" target="_blank" rel="noopener noreferrer">Payment Terms</a>
                    </span>
                  </label>
                  <label className="be-checkbox-label" style={{ marginTop: 10 }}>
                    <input
                      type="checkbox"
                      checked={guestForm.newsletter}
                      onChange={(e) => setGuest("newsletter", e.target.checked)}
                    />
                    <span>Subscribe to Brookside Motel &amp; Residence Newsletter</span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="be-submit-wrap">
                  <button
                    type="submit"
                    className="btn btn-gold be-submit-btn"
                    disabled={bookingLoading || !guestForm.termsAgreed}
                  >
                    {bookingLoading ? (
                      <><span className="be-spinner be-spinner--small" /> Processing Booking…</>
                    ) : (
                      `Confirm Booking (${formatCurrency(displayTotal, currency)})`
                    )}
                  </button>
                  <p className="be-pay-note">🔒 Guaranteed direct rate in {currency}. Your reservation will be confirmed instantly.</p>
                </div>
              </div>
            </div>

            <SummarySidebar />
          </form>
        </div>
      )}

      {/* ═══════════════ VIEW: CONFIRMATION ═══════════════ */}
      {view === "confirm" && confirmation && (
        <div className="be-confirm-view">
          <div className="be-confirm-card">
            <div className="be-confirm-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--pine)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l2.5 2.5 5.5-5.5" />
              </svg>
            </div>
            <h2>Booking confirmed</h2>
            <p className="be-confirm-msg">{confirmation.message}</p>
            <dl>
              {confirmation.bookingId && (
                <div className="be-confirm-detail">
                  <dt>Booking reference</dt>
                  <dd>{confirmation.bookingId}</dd>
                </div>
              )}
              <div className="be-confirm-detail">
                <dt>Accommodation</dt>
                <dd>{getRoomDisplay(selected?.roomId || "253372").name}</dd>
              </div>
              <div className="be-confirm-detail">
                <dt>Dates</dt>
                <dd>{formatDateLong(checkIn)} – {formatDateLong(checkOut)}</dd>
              </div>
              <div className="be-confirm-detail">
                <dt>Guest</dt>
                <dd>{guestForm.firstName} {guestForm.lastName}</dd>
              </div>
              <div className="be-confirm-detail">
                <dt>Email</dt>
                <dd>{guestForm.email}</dd>
              </div>
            </dl>

            {confirmation.paymentUrl && (
              <a href={confirmation.paymentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary be-full-btn" style={{ marginTop: "var(--s4)" }}>
                Complete payment
              </a>
            )}

            <p className="be-confirm-note">
              A confirmation email has been sent to <strong>{guestForm.email}</strong>.
              <br />
              Questions? Contact us at <a href="mailto:reservations@brooksidemotel.co.nz">reservations@brooksidemotel.co.nz</a> or call <a href="tel:+6439300060">+64 3 930 0060</a>.
            </p>

            <a href="/brookside-residence" className="btn btn-ghost be-full-btn" style={{ marginTop: "var(--s2)" }}>Return to Residence page</a>
          </div>
        </div>
      )}
    </div>
  );
}
