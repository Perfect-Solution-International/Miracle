import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  BusinessTravelSection,
  CustomizeTripSection,
  filterTravelPackages,
  PopularDestinationsSection,
  QuickTravelPlanner,
  TravelCategoriesSection,
  TravelGuidesSection,
  TravelHero,
  TravelPackagesSection,
  TravelServicesSection,
  TRAVEL_PACKAGE_DETAILS,
  WhyChooseUsSection,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Travel & Tourism";
const DESCRIPTION =
  "Complete travel solutions for local & international journeys, tailored to your needs.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.travelTourism,
  image: SITE_MEDIA.businessTravel,
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
  const filters = {
    destination: firstValue(params.destination),
    type: firstValue(params.type),
    region: firstValue(params.region),
  };
  const hasFilters = Boolean(filters.destination || filters.type || filters.region);
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, filters);

  return (
    <>
      <TravelHero />
      <QuickTravelPlanner />
      <TravelServicesSection />
      <TravelPackagesSection packages={packages} isFiltered={hasFilters} />
      <CustomizeTripSection />
      <TravelCategoriesSection />
      <PopularDestinationsSection />
      <BusinessTravelSection />
      <WhyChooseUsSection />
      <TravelGuidesSection />

      <CtaBanner
        eyebrow="Start Planning"
        title="Ready to Start Your Journey?"
        description="Whether you need a complete travel package or a trip designed specifically for you, we're here to help."
        primary={{ label: "Explore Packages", href: "#packages" }}
        secondary={{ label: "Plan My Trip", href: "#customize-trip" }}
      />
    </>
  );
}
