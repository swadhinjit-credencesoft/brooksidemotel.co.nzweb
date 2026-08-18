import type { ContourVariant } from "@/lib/types";

const PATHS: Record<ContourVariant, string[]> = {
  a: [
    "M-60 470 C 220 400, 340 520, 610 452 S 1090 350, 1460 424",
    "M-60 545 C 245 472, 385 595, 655 522 S 1125 412, 1460 495",
    "M-60 618 C 262 548, 418 660, 692 596 S 1152 492, 1460 565",
  ],
  b: [
    "M-60 470 C 220 400, 340 520, 610 452 S 1090 350, 1460 424",
    "M-60 512 C 240 444, 370 560, 640 494 S 1110 396, 1460 466",
    "M-60 556 C 250 492, 390 600, 660 538 S 1130 442, 1460 508",
  ],
  c: [
    "M-60 470 C 220 400, 340 520, 610 452 S 1090 350, 1460 424",
    "M-60 540 C 240 470, 380 590, 650 520 S 1120 415, 1460 492",
    "M-60 612 C 260 545, 415 655, 690 592 S 1150 490, 1460 560",
  ],
};

export default function ContourArt({ variant = "a" }: { variant?: ContourVariant }) {
  return (
    <svg className="contour-art" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="#3A4E48" strokeWidth="1.4">
        {PATHS[variant].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
