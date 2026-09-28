import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  filterTravelPackages,
  TravelLanding,
  TRAVEL_PACKAGE_DETAILS,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Travel & Tourism | Miracle International";
const DESCRIPTION =
  "Travel beyond boundaries. Explore destinations, plan customized journeys, arrange flights, and get travel support with Miracle International.";

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
  const filters = {
    destination: firstValue(params.destination),
    type: firstValue(params.type),
    region: firstValue(params.region),
  };
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, filters);

  return <TravelLanding initialPackages={packages} />;
}
