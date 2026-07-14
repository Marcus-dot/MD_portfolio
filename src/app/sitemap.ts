import type { MetadataRoute } from "next";
import { CONFIG } from "@/content/config";
import { STORIES } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...STORIES.map((s) => ({
      url: `${CONFIG.siteUrl}/work/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
