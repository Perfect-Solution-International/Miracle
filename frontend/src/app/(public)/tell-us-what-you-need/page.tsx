import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import {
  IntakeIndustryGallery,
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

const TITLE = "Tell Us What You Need | Miracle International";
const DESCRIPTION =
  "Submit your requirements for global product sourcing, enterprise software engineering, industrial machinery, or bespoke travel solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.tellUsWhatYouNeed,
});

/**
 * Professional, high-converting public requirement intake page
 * Featuring rich sector imagery, visual category selectors, 24h SLA guarantees,
 * and a direct executive consultation workflow.
 */
export default async function Page() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      {/* 1. Hero with visual category cards with real imagery */}
      <TellUsWhatYouNeedHero />

      {/* 2. Global Sourcing visual showcase */}
      <SourcingCtaSection />

      {/* 3. Main Requirement Submission Form */}
      <section id="intake-form" className="scroll-mt-12 bg-surface py-14 lg:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            <RequirementInquiryForm />

            <div className="flex flex-col gap-6">
              <WhyShareCard />
              <NeedHelpCard />
              <SidebarTestimonialCard testimonials={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Industry Capabilities Gallery with real photos */}
      <IntakeIndustryGallery />

      {/* 5. 4-Stage Executive Workflow Roadmap */}
      <Section tone="navy" aria-labelledby="process-heading" className="relative isolate overflow-hidden">
        {/* Liquid Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 h-96 w-full max-w-5xl rounded-full bg-gradient-to-tr from-brand-blue/25 via-indigo-500/15 to-brand-red/15 blur-[100px]"
        />
        <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-60" />

        <div className="flex flex-col items-center text-center">
          <p className="text-brand-blue-muted text-xs font-bold tracking-[0.2em] uppercase">
            Transparent Workflow
          </p>
          <h2
            id="process-heading"
            className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            How We Deliver Your Requirement
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/70">
            From initial submission to verified delivery, our 4-stage process ensures total
            clarity, price certainty, and quality control.
          </p>
        </div>

        <RequirementProcessSteps className="mt-12 lg:mt-16" />
      </Section>

      {/* 6. FAQ & Common Examples */}
      <Section tone="surface">
        <RequestExamplesFaqSection />
      </Section>

      {/* 7. Bottom CTA Banner */}
      <CtaBanner
        title="Ready to Transform Your Sourcing & Business Needs?"
        description="Our senior international trade directors and technical architects are standing by to review your project."
        primary={{
          label: "Submit Your Request",
          href: "#intake-form",
        }}
        secondary={{
          label: "Contact Advisors Directly",
          href: ROUTES.public.contact,
        }}
      />
    </>
  );
}
