import { Stamp } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Visa & entry requirements for the package's destination. */
export function PackageVisaSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section tone="surface" aria-labelledby="visa-heading">
      <SectionHeading id="visa-heading" eyebrow="Entry Requirements" title="Visa Information" />

      <div className="mt-6 flex gap-4 rounded-2xl border bg-white p-6 sm:p-7">
        <Stamp aria-hidden="true" className="text-brand-blue mt-0.5 size-5 shrink-0" />
        <ul className="text-ink space-y-2 text-sm leading-relaxed">
          {detail.visaInformation.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
