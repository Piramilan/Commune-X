import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const lastmod = new Date().toISOString();

  const routes: string[] = [
    "/",
    "/how-it-works",
    "/categories",
    "/search",
    "/onboarding",
    "/dashboard",
    "/provider",
    "/settings",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: lastmod,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
