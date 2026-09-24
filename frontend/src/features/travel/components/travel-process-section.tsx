import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

import { TRAVEL_PROCESS_STEPS } from "../data/travel-process.content";

/** "How It Works" — four-step timeline, navy tone to match the requirements
 * page's equivalent section. */
export function TravelProcessSection() {
  return (
    <Section id="how-it-works" tone="navy" aria-labelledby="travel-process-heading" className="scroll-mt-24">
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />

      <SectionHeading
        id="travel-process-heading"
        align="center"
        tone="inverse"
        eyebrow="How It Works"
        title="From Idea to Itinerary"
      />

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
        {TRAVEL_PROCESS_STEPS.map(({ step, icon: Icon, title, description, accent }, index) => (
          <li key={step} className="relative flex flex-col items-center text-center">
            {index < TRAVEL_PROCESS_STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-8 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-white/20 lg:block"
              />
            ) : null}
            <span
              className={cn(
                "relative flex size-16 shrink-0 items-center justify-center rounded-full text-white",
                accent === "red" ? "bg-brand-red" : "bg-brand-blue",
              )}
            >
              <Icon aria-hidden="true" className="size-6" />
              <span className="border-navy text-navy absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-2 bg-white text-xs font-extrabold">
                {step}
              </span>
            </span>
            <p className="mt-4 text-base font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-white/70">{description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
