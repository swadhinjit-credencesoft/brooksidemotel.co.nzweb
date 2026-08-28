import { imgExists } from "@/lib/img";
import Placeholder from "@/components/ui/Placeholder";

export default function SlotImage({
  src,
  alt,
  label,
  sub,
  dark = false,
  size = 28,
}: {
  src: string;
  alt?: string;
  label?: string;
  sub?: string;
  dark?: boolean;
  size?: number;
}) {
  const resolvedAlt = alt || label || "Brookside Motel Rolleston";
  if (imgExists(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="ph-img" src={src} alt={resolvedAlt} loading="lazy" />;
  }
  return <Placeholder label={label} sub={sub} dark={dark} size={size} />;
}

