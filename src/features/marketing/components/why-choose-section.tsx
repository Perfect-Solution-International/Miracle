import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { StatHighlight } from "@/components/common/stat-highlight";

import { COMPANY_HIGHLIGHTS, WHY_CHOOSE_ITEMS } from "../data/home.content";

/**
 * Differentiators and company highlights on a light section.
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
    <Section className="bg-white" aria-labelledby="why-heading">
      <div
        aria-hidden="true"
        className="bg-brand-blue absolute -top-48 right-0 -z-10 size-[36rem] rounded-full opacity-25 blur-3xl"
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Miracle"
          title="A Better Way to Handle Complex Business Requirements"
          description="Complex requirements usually mean many suppliers, many conversations, and little visibility. We replace that with one coordinated process."
          className="lg:col-span-5"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group rounded-2xl public-card-clickable p-6 sm:p-7"
            >
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl shadow-xs transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Icon
                  aria-hidden="true"
                  className="size-5.5"
                />
              </span>
              <h3 className="text-ink mt-4 text-lg font-bold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
            </li>
          ))}
        </ul>
      </div>

      <dl
        aria-label="Company highlights"
        className="mt-16 grid gap-10 border-t border-slate-200 pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
      >
        {highlights.map((stat) => (
          <StatHighlight key={stat.label} stat={stat} />
        ))}
      </dl>
    </Section>
  );
}
