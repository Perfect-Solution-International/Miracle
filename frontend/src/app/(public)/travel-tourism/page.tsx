import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelLanding } from "@/features/travel";
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

export default function Page() {
  return <TravelLanding />;
}

