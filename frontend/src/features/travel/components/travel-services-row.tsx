import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_CATEGORIES } from "../data/travel.content";

/** Compact service overview. Each chip carries the category's anchor id, so
 * nav and footer links that target a specific service still resolve here. */
export function TravelServicesRow() {
  return (
    <Section aria-labelledby="travel-services-heading">
      <SectionHeading
        id="travel-services-heading"
        align="center"
        eyebrow="What We Arrange"
        title="Our Travel Services"
      />

      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3 lg:mt-14">
        {TRAVEL_CATEGORIES.map(({ id, icon: Icon, title }) => {
          // "business-travel" has its own dedicated section further down the
          // page, which owns that anchor id — this chip only links to it.
          const ownsAnchor = id !== "business-travel";
          return (
            <li key={id} id={ownsAnchor ? id : undefined} className="scroll-mt-24">
              <a
                href={`#${id}`}
                className="border-border bg-card text-ink hover:border-brand-blue hover:text-brand-blue inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                <Icon aria-hidden="true" className="text-brand-blue size-4" />
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
