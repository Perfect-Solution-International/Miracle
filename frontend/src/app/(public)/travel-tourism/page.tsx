import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  BusinessTravelSection,
  TravelHero,
  TravelPackagesSection,
  TravelServicesRow,
  TravelTypeSection,
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

export default function Page() {
  return (
    <>
      <TravelHero />
      <TravelTypeSection />
      <TravelServicesRow />
      <TravelPackagesSection />
      <BusinessTravelSection />

      <CtaBanner
        eyebrow="Plan Your Perfect Trip"
        title="Can't Find the Package You're Looking For?"
        description="Tell us what you need and we'll help you create a suitable travel solution."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
      />
    </>
  );
}
