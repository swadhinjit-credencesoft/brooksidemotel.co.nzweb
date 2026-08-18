import type { MetadataRoute } from "next";
import { SITE_URL, HEADER_LINKS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return HEADER_LINKS.map((item) => ({
    url: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
