import { Section } from "@/components/common/section";

import { COMPANY_STATS } from "../data/about.content";

/** Company highlights beneath the "Who We Are" introduction. */
export function CompanyStatsBand() {
  return (
    <Section className="bg-white" spacing="compact" aria-label="Miracle International at a glance">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {COMPANY_STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:justify-center">
            <span className="text-brand-blue bg-brand-blue-light inline-flex size-11 shrink-0 items-center justify-center rounded-full">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <dd className="text-ink text-2xl font-extrabold">{value}</dd>
              <dt className="text-muted-foreground text-sm font-medium">{label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
