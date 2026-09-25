import { ArrowRight } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** About copy plus the destination chain shown as a left-to-right route. */
export function PackageOverviewSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section aria-labelledby="about-package-heading">
      <SectionHeading
        id="about-package-heading"
        eyebrow="About This Package"
        title="What to Expect"
        description={detail.about}
      />

      <ul className="mt-8 flex flex-wrap items-center gap-3">
        {detail.destinations.map((destination, index) => (
          <li key={destination} className="flex items-center gap-3">
            <span className="bg-brand-blue-light text-brand-blue-dark rounded-full px-4 py-2 text-sm font-bold">
              {destination}
            </span>
            {index < detail.destinations.length - 1 ? (
              <ArrowRight aria-hidden="true" className="text-muted-foreground size-4" />
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
