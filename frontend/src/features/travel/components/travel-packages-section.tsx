import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { TravelPackageCard } from "./travel-package-card";
import type { TravelPackageDetail } from "../types/travel-package-detail.types";

/**
 * "Explore Our Travel Packages" grid. Takes an already-filtered list so the
 * page can apply the quick planner's `destination` / `type` / `region`
 * search params server-side before rendering.
 */
export function TravelPackagesSection({
  packages,
  isFiltered,
}: {
  packages: readonly TravelPackageDetail[];
  isFiltered: boolean;
}) {
  return (
    <Section
      id="packages"
      tone="surface"
      aria-labelledby="packages-heading"
      className="scroll-mt-24"
    >
      <SectionHeading
        id="packages-heading"
        align="center"
        eyebrow="Featured Packages"
        title="Explore Our Travel Packages"
        description="Ready-made itineraries across Sri Lanka and popular international destinations — every one can be adjusted to fit your trip."
      />

      {packages.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {packages.map((pkg) => (
            <TravelPackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center lg:mt-16">
          <p className="text-ink font-semibold">
            {isFiltered
              ? "No packages match that search."
              : "No packages are available right now."}
          </p>
          <p className="text-muted-foreground text-sm">
            Tell us what you have in mind and our travel desk will put together an itinerary
            for you.
          </p>
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Tell Us What You Need
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
