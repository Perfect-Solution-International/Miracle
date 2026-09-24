import type { SiteImage } from "@/config/site-media";

export interface PackageItineraryDay {
  day: number;
  title: string;
  items: readonly string[];
}

export interface PackageLogistics {
  title: string;
  note: string;
}

/** Coarse trip type, used to match a package against the quick planner and
 * "Customize Your Trip" form's travel-type selection. */
export type TravelPackageType =
  | "leisure"
  | "family"
  | "honeymoon"
  | "adventure"
  | "business";

/**
 * Full content for a single travel package — both the summary shown on its
 * listing card and everything on its `/travel-tourism/packages/[slug]` page.
 * One model for both, so there is a single place to add or edit a package.
 */
export interface TravelPackageDetail {
  /** Route segment: `ROUTES.public.travelPackage(slug)`. */
  slug: string;
  title: string;
  tagline: string;
  /** Cover photo used on the card and the detail page hero. */
  image: SiteImage;
  /** Extra photos for the detail page's gallery, cover image excluded. */
  gallery: readonly SiteImage[];
  popular?: boolean;
  /** Country or region shown as the location badge, e.g. "Sri Lanka", "Dubai, UAE". */
  location: string;
  travelers: string;
  travelType: TravelPackageType;
  duration: {
    days: number;
    nights: number;
  };
  /** Indicative headline price, e.g. "From $650 per person". Placeholder until
   * a pricing engine exists — always paired with "final price on request". */
  startingPrice: string;
  /** Short bullet highlights shown on the listing card. */
  highlights: readonly string[];
  about: string;
  destinations: readonly string[];
  itinerary: readonly PackageItineraryDay[];
  included: readonly string[];
  notIncluded: readonly string[];
  accommodation: PackageLogistics;
  transportation: PackageLogistics;
  visaInformation: readonly string[];
  audience: readonly string[];
  importantInfo: readonly string[];
}
