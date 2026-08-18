export default function Placeholder({
  label,
  sub,
  dark = false,
  size = 28,
}: {
  label?: string;
  sub?: string;
  dark?: boolean;
  size?: number;
}) {
  return (
    <div className={`ph${dark ? " ph-dark" : ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.6" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      {label && <b>{label}</b>}
      {sub && <span>{sub}</span>}
    </div>
  );
}
