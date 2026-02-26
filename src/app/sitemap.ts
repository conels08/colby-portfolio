import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://colbynelsen.com";
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/work", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ] as const;

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, BASE_URL).toString(),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
