import type { IconName } from "@/lib/types";

const PATHS: Record<IconName, React.ReactNode> = {
  guests: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    </>
  ),
  bed: (
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  ),
  bedbar: (
    <>
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 20h20" />
    </>
  ),
  washer: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M8 6h.01M12 6h.01" />
    </>
  ),
  building: (
    <>
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  tv: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M6 12V6a2 2 0 0 1 4 0" />
    </>
  ),
  bathtaps: (
    <>
      <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M6 12V6a2 2 0 0 1 4 0" />
      <path d="M6 20l-1 2M18 20l1 2" />
    </>
  ),
  coffee: (
    <>
      <path d="M7 2v9a3 3 0 0 0 6 0V2M10 11v11" />
      <path d="M18 2c-1.5 2-2 4-2 7v4h3V2z" />
    </>
  ),
  bbq: (
    <>
      <path d="M4 13h16a8 8 0 0 1-16 0z" />
      <path d="M12 13V9M9 4c0 1.5 3 1.5 3 3M15 5c0 1-1.5 1.5-1.5 2.5" />
      <path d="M8 21l1.5-4M16 21l-1.5-4" />
    </>
  ),
  spa: <path d="M12 3v3M8 8c0 2 4 2 4 4M4 14h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />,
  door: (
    <>
      <path d="M3 9h18M9 21V9" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  corner: (
    <>
      <path d="m6 15 6-6 6 6" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  accessible: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M8 8h8M12 8v6M12 14h4l2 5M12 14H9l-2 5" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" />
    </>
  ),
  car: (
    <>
      <path d="M3 17h18M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8M7 21h2M15 21h2" />
      <circle cx="8" cy="13" r="1" />
      <circle cx="16" cy="13" r="1" />
    </>
  ),
  sun: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3.6" />
    </>
  ),
  kitchen: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M4 11h16M8 6v1M8 15v1" />
    </>
  ),
  bolt: <path d="M13 2 5 14h6l-2 8 8-12h-6l2-8z" />,
  toiletries: (
    <>
      <path d="M6 3h12l-1 7H7z" />
      <path d="M8 10c0 4-2 5-2 8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3c0-3-2-4-2-8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Ico({
  name,
  size = 14,
  sw = 1.7,
  className,
}: {
  name: IconName;
  size?: number;
  sw?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
