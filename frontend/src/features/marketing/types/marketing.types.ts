import type { LucideIcon } from "lucide-react";

import type { SiteImage } from "@/config/site-media";

/**
 * Shapes for public-site content. They intentionally mirror what a CMS entry
 * would return (plus a resolved icon), so moving copy out of the repository
 * changes the data source, not the components.
 */

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export interface ServiceSummary {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Featured services get the large image tile in the services grid. */
  image?: SiteImage;
  featured?: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ServicePromo {
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
  items: readonly string[];
  cta: { label: string; href: string };
}
