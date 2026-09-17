import type { SiteImage } from "@/config/site-media";

/** A wholesale catalogue category. Mirrors the planned category API resource. */
export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: SiteImage;
}
