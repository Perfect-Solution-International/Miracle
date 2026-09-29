import { BedDouble, Car } from "lucide-react";

import { Section } from "@/components/common/section";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Accommodation and transportation, as a pair of icon cards. */
export function PackageLogisticsSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section tone="surface" aria-labelledby="logistics-heading">
      <h2 id="logistics-heading" className="sr-only">
        Accommodation &amp; Transportation
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 sm:p-7">
          <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-full">
            <BedDouble aria-hidden="true" className="size-5" />
          </span>
          <p className="text-ink mt-4 text-base font-bold">Accommodation</p>
          <p className="text-ink mt-1 text-sm font-semibold">
            {detail.accommodation.title}
          </p>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {detail.accommodation.note}
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 sm:p-7">
          <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-full">
            <Car aria-hidden="true" className="size-5" />
          </span>
          <p className="text-ink mt-4 text-base font-bold">Transportation</p>
          <p className="text-ink mt-1 text-sm font-semibold">
            {detail.transportation.title}
          </p>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {detail.transportation.note}
          </p>
        </div>
      </div>
    </Section>
  );
}
