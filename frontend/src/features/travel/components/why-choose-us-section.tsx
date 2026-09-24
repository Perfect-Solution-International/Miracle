import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { WHY_CHOOSE_US_FEATURES } from "../data/why-choose-us.content";

/** "Travel With Confidence" feature grid. */
export function WhyChooseUsSection() {
  return (
    <Section aria-labelledby="why-choose-us-heading">
      <SectionHeading
        id="why-choose-us-heading"
        align="center"
        eyebrow="Why Miracle International"
        title="Travel With Confidence"
      />

      <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {WHY_CHOOSE_US_FEATURES.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-start gap-4 rounded-2xl border bg-white p-6">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 shrink-0 items-center justify-center rounded-full">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-ink text-base font-bold">{title}</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
