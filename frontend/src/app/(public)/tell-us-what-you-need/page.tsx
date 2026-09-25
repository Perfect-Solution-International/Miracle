import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import {
  NeedHelpCard,
  RequestExamplesFaqSection,
  RequirementInquiryForm,
  RequirementProcessSteps,
  SidebarTestimonialCard,
  SourcingCtaSection,
  TellUsWhatYouNeedHero,
  WhyShareCard,
} from "@/features/requirements";
import { getPublishedTestimonials } from "@/features/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Tell Us What You Need";
const DESCRIPTION =
  "Share your requirements with us, and our expert team will provide or coordinate the right solution from A to Z.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.tellUsWhatYouNeed,
});

/** Public entry point to the sourcing funnel: a single lead-capture form open
 * to every visitor, no account required to get in touch. */
export default async function Page() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <TellUsWhatYouNeedHero />

      <SourcingCtaSection />

      <Section spacing="compact">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <RequirementInquiryForm />

          <div className="flex flex-col gap-6">
            <WhyShareCard />
            <NeedHelpCard />
            <SidebarTestimonialCard testimonials={testimonials} />
          </div>
        </div>
      </Section>

      <Section tone="navy" aria-labelledby="process-heading">
        <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />
        <p className="text-brand-blue-muted text-center text-xs font-bold tracking-[0.18em] uppercase">
          How It Works
        </p>
        <h2
          id="process-heading"
          className="mx-auto mt-2 max-w-xl text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          A Simple Process for Your Needs
        </h2>
        <RequirementProcessSteps className="mt-12 lg:mt-16" />
      </Section>

      <Section tone="surface">
        <RequestExamplesFaqSection />
      </Section>
    </>
  );
}
