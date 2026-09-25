import { Info } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Who the package suits, and the fine print on customization and pricing. */
export function PackageAudienceSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section aria-labelledby="audience-heading">
      <SectionHeading id="audience-heading" eyebrow="Who Is This For" title="Great For" />

      <ul className="mt-6 flex flex-wrap gap-3">
        {detail.audience.map((group) => (
          <li
            key={group}
            className="border-border text-ink rounded-full border px-4 py-2 text-sm font-semibold"
          >
            {group}
          </li>
        ))}
      </ul>

      <div className="bg-brand-blue-light mt-10 flex gap-3 rounded-2xl p-5 sm:p-6">
        <Info aria-hidden="true" className="text-brand-blue mt-0.5 size-5 shrink-0" />
        <div>
          <p className="text-ink text-sm font-bold">Important Information</p>
          <ul className="text-ink/80 mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed">
            {detail.importantInfo.map((info) => (
              <li key={info}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
