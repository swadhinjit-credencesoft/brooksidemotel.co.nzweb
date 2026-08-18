import { imgExists } from "@/lib/img";
import Placeholder from "@/components/ui/Placeholder";

export default function SlotImage({
  src,
  alt = "",
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
  if (imgExists(src)) {
    return <img className="ph-img" src={src} alt={alt} />;
  }
  return <Placeholder label={label} sub={sub} dark={dark} size={size} />;
}
