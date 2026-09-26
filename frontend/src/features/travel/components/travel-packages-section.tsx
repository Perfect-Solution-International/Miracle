"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import { TravelPackageCard } from "./travel-package-card";
import type { TravelPackageDetail } from "../types/travel-package-detail.types";

const FILTER_TABS = [
  { id: "all", label: "All Packages" },
  { id: "sri-lanka", label: "Sri Lanka (Inbound)" },
  { id: "international", label: "International (Outbound)" },
] as const;

export function TravelPackagesSection({
  packages,
  isFiltered = false,
  showTabs = true,
  eyebrow,
  title,
  description,
  onCustomizePackage,
}: {
  packages: readonly TravelPackageDetail[];
  isFiltered?: boolean;
  showTabs?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  onCustomizePackage?: (pkg: TravelPackageDetail) => void;
}) {
  const [activeTab, setActiveTab] = useState<"all" | "sri-lanka" | "international">("all");

  const displayedPackages = useMemo(() => {
    if (!showTabs || activeTab === "all") return packages;
    if (activeTab === "sri-lanka") {
      return packages.filter((p) => p.location.toLowerCase().includes("sri lanka"));
    }
    return packages.filter((p) => !p.location.toLowerCase().includes("sri lanka"));
  }, [packages, activeTab, showTabs]);

  return (
    <Section
      id="packages"
      tone="surface"
      aria-label="Travel Packages"
      className="scroll-mt-24 py-10 lg:py-14"
    >
      {title ? (
        <SectionHeading
          id="packages-heading"
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      ) : null}

      {/* Filter Tabs */}
      {showTabs ? (
        <div className={cn("flex justify-center", title ? "mt-8" : "mt-0")}>
          <div className="bg-slate-200/70 inline-flex rounded-xl p-1 shadow-inner">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm",
                  activeTab === tab.id
                    ? "bg-white text-brand-blue shadow-sm"
                    : "text-muted-foreground hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {displayedPackages.length > 0 ? (
        <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", showTabs || title ? "mt-8 lg:mt-10" : "mt-0")}>
          {displayedPackages.map((pkg) => (
            <TravelPackageCard
              key={pkg.slug}
              pkg={pkg}
              onCustomize={onCustomizePackage}
            />
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center lg:mt-16">
          <p className="text-ink font-semibold">
            {isFiltered
              ? "No packages match that search filter."
              : "No packages available in this view."}
          </p>
          <p className="text-muted-foreground text-sm">
            Tell us what you have in mind and our travel specialists will build a custom
            itinerary for you.
          </p>
          <Button asChild variant="accent" size="lg">
            <Link href={`${ROUTES.public.travelTourism}#customize-trip`}>
              Customize a Trip Instead
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
