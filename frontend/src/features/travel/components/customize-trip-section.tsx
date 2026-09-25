import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TripPlannerForm } from "./trip-planner-form";

/** "Make Your Trip, Your Way" — the full customization form, inline rather
 * than hidden behind a dialog, so it reads as a real part of the page. */
export function CustomizeTripSection() {
  return (
    <Section id="customize-trip" aria-labelledby="customize-trip-heading" className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          id="customize-trip-heading"
          eyebrow="Build Your Own Trip"
          title="Build Your Own Sri Lanka Trip"
          description="Choose where you want to go, what you want to experience and how you want to travel. We'll help create a journey around your preferences."
        />

        <div className="shadow-lift rounded-3xl border bg-white p-6 sm:p-8">
          <TripPlannerForm />
        </div>
      </div>
    </Section>
  );
}
