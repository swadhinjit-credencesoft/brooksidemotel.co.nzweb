import BookingButton from "@/components/ui/BookingButton";

export default function SearchWidget() {
  return (
    <div className="search" id="search">
      <div className="wrap">
        <div className="search-card">
          <div className="sf">
            <label>Check-in date</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Fri 14 Aug
            </div>
          </div>
          <div className="sf">
            <label>Check-out date</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Sun 16 Aug
            </div>
          </div>
          <div className="sf">
            <label>Guests</label>
            <div className="val">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              2 <small>adults</small>
            </div>
          </div>
          <div className="search-go">
            <BookingButton className="btn btn-primary">Search availability</BookingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
