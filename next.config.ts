import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Enables Partial Prerendering: each route gets a static HTML shell served
   * from the edge, with dynamic parts streaming in. Without this, any route
   * that reads the session cookie renders dynamically in full, which would
   * include the public marketing pages.
   */
  cacheComponents: true,
  experimental: {
    /**
     * Enables the `forbidden()` and `unauthorized()` functions together with
     * `forbidden.tsx` / `unauthorized.tsx`, so authorisation failures render a
     * real 403/401 page instead of a generic error.
     */
    authInterrupts: true,
  },
  productionBrowserSourceMaps: false,
  images: {
    // Object-storage host for product images and documents. Tighten per environment.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Surfaces type errors at build time rather than silently shipping them.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
