import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  CustomizeTripSection,
  filterTravelPackages,
  InboundHighlightSection,
  TravelHero,
  TravelPackagesSection,
  TravelServicesSection,
  TRAVEL_PACKAGE_DETAILS,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Travel & Tourism";
const DESCRIPTION =
  "Discover Sri Lanka with thoughtfully designed tours, complete travel support and personalized trip planning.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.travelTourism,
  image: SITE_MEDIA.travelPackagesFull.sriLankaHighlights,
});

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hasExplicitFilters = Boolean(params.destination || params.type || params.region);
  const filters = {
    destination: firstValue(params.destination),
    type: firstValue(params.type),
    region: firstValue(params.region),
  };
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, filters);

  return (
    <>
      <TravelHero />
      <TravelServicesSection />
      <InboundHighlightSection />
      <TravelPackagesSection packages={packages} isFiltered={hasExplicitFilters} />
      <CustomizeTripSection />

      <CtaBanner
        eyebrow="Start Planning"
        title="Your Sri Lankan Journey Starts Here."
        description="Choose a package or tell us what kind of journey you want. We'll help you plan the rest."
        primary={{ label: "Explore Sri Lanka Tours", href: "#packages" }}
        secondary={{ label: "Build Your Own Trip", href: "#customize-trip" }}
      />
    </>
  );
}
