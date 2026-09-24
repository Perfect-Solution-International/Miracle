import type { Metadata } from "next";

import {
  AboutHero,
  CompanyStatsBand,
  GlobalPresenceSection,
  OurStorySection,
  WhoWeAreSection,
} from "@/features/about";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "About Us";
const DESCRIPTION =
  "Connecting businesses with global opportunities through trusted sourcing, trading and business solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.about,
  image: SITE_MEDIA.heroPort,
});

export default function Page() {
  return (
    <>
      <AboutHero />
      <WhoWeAreSection />
      <CompanyStatsBand />
      <OurStorySection />
      <GlobalPresenceSection />
    </>
  );
}
