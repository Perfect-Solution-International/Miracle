import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Day-by-day plan as a numbered vertical timeline. */
export function PackageItinerarySection({ detail }: { detail: TravelPackageDetail }) {
  return (
    <Section tone="surface" aria-labelledby="itinerary-heading">
      <SectionHeading
        id="itinerary-heading"
        eyebrow="Itinerary"
        title="Your Day-By-Day Plan"
      />

      <ol className="mt-10 space-y-6">
        {detail.itinerary.map((day) => (
          <li
            key={day.day}
            className="shadow-soft flex gap-4 rounded-2xl border bg-white p-5 sm:gap-6 sm:p-6"
          >
            <span className="bg-brand-blue flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white sm:size-12">
              {String(day.day).padStart(2, "0")}
            </span>
            <div>
              <p className="text-ink text-base font-bold sm:text-lg">
                Day {day.day} — {day.title}
              </p>
              <ul className="text-muted-foreground mt-2 space-y-1 text-sm leading-relaxed">
                {day.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
