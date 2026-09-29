import { Section } from "@/components/common/section";

import { COMPANY_STATS } from "../data/about.content";

/** Full-width navy trust band beneath the "Who We Are" introduction. */
export function CompanyStatsBand() {
  return (
    <Section tone="navy" spacing="compact" aria-label="Miracle International at a glance">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {COMPANY_STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 lg:justify-center">
            <span className="text-brand-blue-muted inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <dd className="text-2xl font-extrabold text-white">{value}</dd>
              <dt className="text-sm font-medium text-white/65">{label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
