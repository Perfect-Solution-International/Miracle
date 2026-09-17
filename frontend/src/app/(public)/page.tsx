import type { Metadata } from "next";
import { Suspense } from "react";

import { CtaBanner } from "@/components/common/cta-banner";
import { JsonLd } from "@/components/common/json-ld";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { BusinessPathwaySection } from "@/features/business";
import {
  BusinessEcosystemSection,
  CompanyIntroSection,
  CoreServicesSection,
  HomeHero,
  HowItWorksSection,
  InternationalValueSection,
  TravelItSection,
  TrustStrip,
  WhyChooseSection,
} from "@/features/marketing";
import {
  FeaturedOpportunitiesSection,
  FeaturedOpportunitiesSkeleton,
} from "@/features/opportunities";
import { WholesaleCategoriesSection } from "@/features/products";
import { GlobalSourcingSection } from "@/features/sourcing";
import { TestimonialsSection } from "@/features/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  // The root page uses the full brand title rather than the "%s | brand" template.
  title: { absolute: `${APP_CONFIG.name} | Global Trade, Sourcing & Business Solutions` },
  description:
    "Miracle International connects businesses with global suppliers, wholesale products, logistics, business setup, technology, and travel services — coordinated by one partner.",
  path: ROUTES.public.home,
  image: SITE_MEDIA.heroPort,
});

/**
 * Homepage. Composes feature sections only; each section owns its layout and
 * content. Server-rendered throughout, with client JavaScript limited to the
 * header islands.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: APP_CONFIG.name,
          url: APP_CONFIG.url,
          logo: new URL("/brand/miracle-logo.svg", APP_CONFIG.url).toString(),
          description: APP_CONFIG.description,
          email: APP_CONFIG.support.email,
          telephone: APP_CONFIG.support.phone,
          sameAs: [
            APP_CONFIG.social.facebook,
            APP_CONFIG.social.instagram,
            APP_CONFIG.social.linkedin,
          ],
        }}
      />

      <HomeHero />
      <TrustStrip />
      <CompanyIntroSection />
      <CoreServicesSection />
      <GlobalSourcingSection />
      <WholesaleCategoriesSection />
      <BusinessPathwaySection />
      <HowItWorksSection />
      <InternationalValueSection />
      <BusinessEcosystemSection />
      <WhyChooseSection />

      <Suspense fallback={<FeaturedOpportunitiesSkeleton />}>
        <FeaturedOpportunitiesSection />
      </Suspense>

      <TravelItSection />

      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>

      <CtaBanner
        eyebrow="Start Today"
        title="Have a Business Requirement?"
        description="Tell us what you need and let our team coordinate the right solution — from suppliers and quotations to delivery and support."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Our Team", href: ROUTES.public.contact }}
      />
    </>
  );
}
