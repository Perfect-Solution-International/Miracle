import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { StatHighlight } from "@/components/common/stat-highlight";

import { COMPANY_HIGHLIGHTS, WHY_CHOOSE_ITEMS } from "../data/home.content";

/**
 * Differentiators on a dark navy band, closed by the highlights row.
 *
 * `highlights` is a prop so verified figures from the reporting API can replace
 * the qualitative defaults without changing this component.
 */
export function WhyChooseSection({
  highlights = COMPANY_HIGHLIGHTS,
}: {
  highlights?: typeof COMPANY_HIGHLIGHTS;
}) {
  return (
    <Section tone="navy" aria-labelledby="why-heading">
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-brand-blue absolute -top-48 right-0 -z-10 size-[36rem] rounded-full opacity-25 blur-3xl"
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="why-heading"
          tone="inverse"
          eyebrow="Why Choose Miracle"
          title="A Better Way to Handle Complex Business Requirements"
          description="Complex requirements usually mean many suppliers, many conversations, and little visibility. We replace that with one coordinated process."
          className="lg:col-span-5"
        />

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group bg-navy hover:bg-navy-light p-6 transition-colors duration-300 sm:p-7"
            >
              <Icon
                aria-hidden="true"
                className="text-brand-blue-muted size-6 transition-colors group-hover:text-white"
              />
              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
            </li>
          ))}
        </ul>
      </div>

      <dl
        aria-label="Company highlights"
        className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
      >
        {highlights.map((stat) => (
          <StatHighlight key={stat.label} stat={stat} tone="inverse" />
        ))}
      </dl>
    </Section>
  );
}
