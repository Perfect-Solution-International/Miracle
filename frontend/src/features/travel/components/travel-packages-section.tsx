"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import { useTravelStore } from "@/lib/storage/travel-store";
import type { TravelPackage } from "@/components/admin-travel/types";
import { PublicTravelInquiryModal } from "@/components/travel/public-travel-inquiry-modal";
import { TravelPackageCard } from "./travel-package-card";

const FILTER_TABS = [
  { id: "all", label: "All Packages" },
  { id: "sri-lanka", label: "Sri Lanka (Inbound)" },
  { id: "international", label: "International (Outbound)" },
] as const;

export function TravelPackagesSection({
  packages: propPackages,
  isFiltered = false,
  showTabs = true,
  eyebrow,
  title,
  description,
  onCustomizePackage,
}: {
  packages?: readonly TravelPackage[];
  isFiltered?: boolean;
  showTabs?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  onCustomizePackage?: (pkg: TravelPackage) => void;
}) {
  const { packages: storePackages } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"all" | "sri-lanka" | "international">("all");
  const [plannerModal, setPlannerModal] = useState<{
    open: boolean;
    package: TravelPackage | null;
    mode: "inquiry" | "customize";
  }>({
    open: false,
    package: null,
    mode: "customize",
  });

  const activePackagesList = propPackages ?? storePackages.filter((p) => p.status !== "Inactive");

  const displayedPackages = useMemo(() => {
    if (!showTabs || activeTab === "all") return activePackagesList;
    if (activeTab === "sri-lanka") {
      return activePackagesList.filter((p) => p.travelType === "Inbound");
    }
    return activePackagesList.filter((p) => p.travelType === "Outbound");
  }, [activePackagesList, activeTab, showTabs]);

  const handleCustomize = (pkg: TravelPackage) => {
    if (onCustomizePackage) {
      onCustomizePackage(pkg);
    } else {
      setPlannerModal({
        open: true,
        package: pkg,
        mode: "customize",
      });
    }
  };

  return (
    <Section
      id="packages"
      aria-label="Travel Packages"
      className="bg-white scroll-mt-24 py-10 lg:py-14 border-t border-slate-100"
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
              onCustomize={handleCustomize}
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

      {/* Trip & Package Planner Modal */}
      <PublicTravelInquiryModal
        open={plannerModal.open}
        onOpenChange={(open) => setPlannerModal((prev) => ({ ...prev, open }))}
        defaultPackage={plannerModal.package}
        mode={plannerModal.mode}
      />
    </Section>
  );
}
