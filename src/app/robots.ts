import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated areas and the BFF must never be crawled.
      disallow: ["/customer/", "/supplier/", "/staff/", "/admin/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", APP_CONFIG.url).toString(),
  };
}
