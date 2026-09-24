import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { VISA_BENEFITS } from "../data/visa-services.content";

/** "Why Choose Our Visa Assistance?" — kept short by design. */
export function VisaBenefitsSection() {
  return (
    <Section tone="surface" aria-labelledby="visa-benefits-heading">
      <SectionHeading
        id="visa-benefits-heading"
        align="center"
        eyebrow="Why Miracle International"
        title="Why Choose Our Visa Assistance?"
      />

      <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {VISA_BENEFITS.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="flex flex-col items-center gap-3 rounded-2xl border bg-white p-6 text-center"
          >
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-full">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <p className="text-ink text-sm font-bold">{title}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
