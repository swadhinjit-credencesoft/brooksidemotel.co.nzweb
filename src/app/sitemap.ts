import type { MetadataRoute } from "next";
import { SITE_URL, HEADER_LINKS } from "@/lib/site";
import { ROOMS } from "@/content/rooms";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...HEADER_LINKS.map((item) => ({
      url: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
      changeFrequency: item.href === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: item.href === "/" ? 1 : 0.8,
    })),
    { url: `${SITE_URL}/book`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/book-residence`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...ROOMS.map((room) => ({
      url: `${SITE_URL}/motel-rooms/${room.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
