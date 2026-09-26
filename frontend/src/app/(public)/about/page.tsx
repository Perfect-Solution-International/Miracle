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
import { CoreServicesSection, HowItWorksSection, WhyChooseSection } from "@/features/marketing";
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

      <div id="services" className="scroll-mt-24">
        <CoreServicesSection />
      </div>
      <div id="how-we-work" className="scroll-mt-24">
        <HowItWorksSection />
      </div>
      <div id="why-choose-us" className="scroll-mt-24">
        <WhyChooseSection />
      </div>

      <GlobalPresenceSection />
    </>
  );
}
