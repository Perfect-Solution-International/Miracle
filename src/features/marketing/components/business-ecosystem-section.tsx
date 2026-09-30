import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { BUSINESS_ECOSYSTEM } from "../data/home.content";

/** Compact audience grid: who the platform serves. */
export function BusinessEcosystemSection() {
  return (
    <Section aria-labelledby="ecosystem-heading">
      <SectionHeading
        id="ecosystem-heading"
        eyebrow="Who We Serve"
        title="One Platform. A Complete Business Ecosystem."
        description="Different goals, one coordinated partner."
        align="center"
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {BUSINESS_ECOSYSTEM.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="group flex items-center gap-5 rounded-2xl public-card-clickable p-6 sm:p-7"
          >
            <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue inline-flex size-12 shrink-0 items-center justify-center rounded-xl shadow-xs transition-colors duration-300 group-hover:text-white">
              <Icon aria-hidden="true" className="size-5.5" />
            </span>
            <div>
              <h3 className="text-ink font-bold text-base">{title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

