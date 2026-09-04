export interface AboutReason {
  icon: "hotel" | "map" | "home";
  title: string;
  description: string;
}

export const ABOUT_REASONS: AboutReason[] = [
  {
    icon: "hotel",
    title: "Brand-new standards",
    description: " modern architecture, double glazing, heat pumps, and luxury Super King beds.",
  },
  {
    icon: "map",
    title: "Effortless location",
    description: "Located right by the Motorway, 2 minutes from Rolleston Square, and 20 minutes from Christchurch Airport.",
  },
  {
    icon: "home",
    title: "Versatile accommodation",
    description: "Offering ground-floor motel units for short stays and our 4-bedroom private residence for larger families or long-stay corporate teams.",
  },
];

export const PHILOSOPHY_POINTS = [
  {
    eyebrow: "Quiet & private",
    title: "Built for restful nights",
    text: "Engineered acoustic separation and double glazing ensure peace and quiet, whether you are arriving late from the airport or preparing for an early morning.",
  },
  {
    eyebrow: "Spotlessly clean",
    title: "High housekeeping standards",
    text: "Brand-new bathrooms, pristine bedding, and daily housekeeping care so you always step into a spotless space.",
  },
  {
    eyebrow: "Modern convenience",
    title: "Everything within reach",
    text: "From in-room kitchenettes and ultra-fast Fibre Wi-Fi to on-site EV charging and doorstep parking.",
  },
];
