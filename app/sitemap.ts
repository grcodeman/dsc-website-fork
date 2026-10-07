import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/calendar", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/join", priority: 0.8, changeFrequency: "monthly" as const },
    // /discord is left out: it only redirects to the Discord invite, and
    // sitemaps should list pages that load directly.
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
