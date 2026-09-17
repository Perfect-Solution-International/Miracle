import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";

const BUILD_DATE = new Date();

/**
 * Public routes only. Portal pages are behind authentication and are excluded
 * from the sitemap and marked `noindex` in their own metadata.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time constant: calling `new Date()` inside the handler is a
  // request-time value and would opt the sitemap out of static generation.
  const lastModified = BUILD_DATE;

  return Object.values(ROUTES.public).map((path) => ({
    url: new URL(path, APP_CONFIG.url).toString(),
    lastModified,
    changeFrequency: path === ROUTES.public.home ? "weekly" : "monthly",
    priority: path === ROUTES.public.home ? 1 : 0.7,
  }));
}
