import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { DRIVE_DESTINATIONS } from "@/content";

export default function LocationSection() {
  return (
    <section className="section bg-paper" id="location">
      <div className="wrap">
        <div className="loc-grid">
          <div className="rv">
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d261477.3042636744!2d172.28803824716857!3d-43.607720937249276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d3203007b582e1b%3A0x78adb1054c7e9e22!2sBrookside%20Motel!5e0!3m2!1sen!2sbd!4v1787899286315!5m2!1sen!2sbd"
                width="600"
                height="450"
                style={{ border: 0, width: "100%", height: "100%", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Brookside Motel Google Maps Location"
              />
            </div>
          </div>
          <div className="rv">
            <p className="eyebrow">Location</p>
            <h2 className="h1">Minutes From Everywhere You Need to Be</h2>
            <ul className="drive">
              {DRIVE_DESTINATIONS.map((dest) => (
                <li key={dest.name}>
                  <span className="d-time">
                    {dest.time}<sup>{dest.unit}</sup>
                  </span>
                  <span className="d-place">
                    <b>{dest.name}</b>
                    <span>{dest.distance}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="dining">
              <p>
                <b>Hungry?</b> Walk or drive minutes to over 15 local eateries, including
                Joe&apos;s Garage, Origami, and Black &amp; White Coffee Cartel.
              </p>
            </div>
            <p style={{ marginTop: "var(--s4)" }}>
              <Link className="link-brook" href="/local-guide">
                Explore the local guide <ArrowIcon />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

