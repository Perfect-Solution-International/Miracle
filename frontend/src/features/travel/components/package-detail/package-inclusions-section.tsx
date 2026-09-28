import { BedDouble, Car, Check } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/**
 * Included features and services, with Accommodation & Transportation
 * integrated directly inside the Included section.
 */
export function PackageInclusionsSection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section aria-labelledby="inclusions-heading">
      <SectionHeading
        id="inclusions-heading"
        eyebrow="Package Inclusions"
        title="What's Included"
        description="All experiences, stays, private transport, and services included in this package."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left / Main Column: Included Services & Experiences */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft lg:col-span-7">
          <h3 className="text-ink text-base font-bold sm:text-lg">
            Included Services &amp; Amenities
          </h3>
          <ul className="mt-5 space-y-3.5">
            {detail.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="bg-brand-blue text-white mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full shadow-xs">
                  <Check aria-hidden="true" className="size-3.5 stroke-[2.5]" />
                </span>
                <span className="text-ink font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Accommodation & Transportation */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Accommodation */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft transition-all hover:border-brand-blue/30">
            <div className="flex items-center gap-3">
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-2xl">
                <BedDouble aria-hidden="true" className="size-5.5" />
              </span>
              <div>
                <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                  Included Stay
                </span>
                <h3 className="text-ink text-base font-bold">Accommodation</h3>
              </div>
            </div>
            <p className="text-ink mt-3 text-sm font-semibold">{detail.accommodation.title}</p>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
              {detail.accommodation.note}
            </p>
          </div>

          {/* Transportation */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft transition-all hover:border-brand-blue/30">
            <div className="flex items-center gap-3">
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-2xl">
                <Car aria-hidden="true" className="size-5.5" />
              </span>
              <div>
                <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                  Included Transport
                </span>
                <h3 className="text-ink text-base font-bold">Transportation</h3>
              </div>
            </div>
            <p className="text-ink mt-3 text-sm font-semibold">{detail.transportation.title}</p>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
              {detail.transportation.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
