import { Check, X } from "lucide-react";

import { Section } from "@/components/common/section";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Included / not-included lists, side by side. */
export function PackageInclusionsSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section aria-labelledby="inclusions-heading">
      <h2 id="inclusions-heading" className="sr-only">
        What&apos;s Included
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 sm:p-7">
          <p className="text-ink text-lg font-bold">What&apos;s Included</p>
          <ul className="mt-4 space-y-3">
            {detail.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check
                  aria-hidden="true"
                  className="text-brand-blue mt-0.5 size-4 shrink-0"
                />
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface rounded-3xl p-6 sm:p-7">
          <p className="text-ink text-lg font-bold">What&apos;s Not Included</p>
          <ul className="mt-4 space-y-3">
            {detail.notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <X
                  aria-hidden="true"
                  className="text-muted-foreground mt-0.5 size-4 shrink-0"
                />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
