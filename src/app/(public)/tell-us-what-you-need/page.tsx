import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { TellUsWhatYouNeedView } from "@/features/requirements";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Tell Us What You Need | Miracle International";
const DESCRIPTION =
  "Submit any business, product, travel, or service requirement to Miracle International. Get customized end-to-end solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.tellUsWhatYouNeed,
});

/**
 * Professional, modern, clean white "Tell Us What You Need" page.
 * Features 5 core sections:
 * 1. Hero Section (Clean white, no images)
 * 2. What Can We Help You With? (11 category cards with simple icons)
 * 3. Requirement Form (Full intake form with file upload & confirmation)
 * 4. How It Works (4-step process)
 * 5. Final CTA
 */
 Imasha
export default function Page() {
  return <TellUsWhatYouNeedView />;

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
      <Section aria-labelledby="process-heading" className="relative isolate overflow-hidden bg-white">
        {/* Liquid Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 h-96 w-full max-w-5xl rounded-full bg-gradient-to-tr from-brand-blue/25 via-indigo-500/15 to-brand-red/15 blur-[100px]"
        />

        <div className="flex flex-col items-center text-center">
          <p className="text-brand-blue text-xs font-bold tracking-[0.2em] uppercase">
            Transparent Workflow
          </p>
          <h2
            id="process-heading"
            className="text-ink mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            How We Deliver Your Requirement
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base">
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
develop
}

