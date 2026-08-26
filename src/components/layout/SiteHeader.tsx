"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookingButton from "@/components/ui/BookingButton";
import { HEADER_LINKS } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header id="hdr" className={`site-header${stuck ? " stuck" : ""}`}>
      <div className="wrap">
        <Link href="/" aria-label="Brookside Motel — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo logo-cream" src="/logos/logo-cream.png" alt="Brookside Motel" width={350} height={80} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo logo-pine" src="/logos/logo-pine.png" alt="Brookside Motel" width={350} height={80} />
        </Link>
        <nav className="nav" aria-label="Primary">
          {HEADER_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-cta" style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
          {/* <BookingButton className="btn btn-gold">Book direct</BookingButton> */}
          <button
            className={`burger${open ? " open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`nav-panel${open ? " open" : ""}`}>
        <div className="nav-panel-head">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Brookside Motel — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nav-panel-logo" src="/logos/logo-cream.png" alt="Brookside Motel" width={200} height={40} />
          </Link>
          <button
            type="button"
            className="nav-panel-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul>
          {HEADER_LINKS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            </li>
          ))}
          <li>
            <BookingButton className="btn btn-gold">Book direct</BookingButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
