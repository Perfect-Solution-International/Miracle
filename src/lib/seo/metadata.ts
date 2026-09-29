import type { Metadata } from "next";

import { APP_CONFIG } from "@/config/app";
import type { SiteImage } from "@/config/site-media";

/**
 * Metadata for public marketing pages.
 *
 * One builder keeps title, description, canonical URL, Open Graph, and Twitter
 * fields in step, so no page ships a canonical without matching social tags.
 * Portal pages do not use this; they are `noindex` and excluded from the sitemap.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
}: {
  /** Plain string uses the root "%s | brand" template. */
  title: string | { absolute: string };
  description: string;
  /** Route path from `ROUTES.public`; resolved against `metadataBase`. */
  path: string;
  image?: SiteImage;
}): Metadata {
  const socialTitle =
    typeof title === "string" ? `${title} | ${APP_CONFIG.name}` : title.absolute;
  const images = image ? [{ url: image.src, alt: image.alt }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: APP_CONFIG.name,
      title: socialTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images?.map((entry) => entry.url),
    },
  };
}
