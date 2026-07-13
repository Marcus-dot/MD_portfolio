import type { MetadataRoute } from "next";
import { CONFIG } from "@/content/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
