"use client";

import { useMemo, useState } from "react";

import landingStyles from "@/app/(public)/landing-surfaces.module.css";

import { CustomizeTripModal, CustomizeTripSection } from "./customize-trip-section";
import { InboundTravelSection, OutboundTravelSection } from "./inbound-outbound-section";
import { TravelHero } from "./travel-hero";
import { TravelCinematicBackground } from "./travel-cinematic-background";
import { TravelPackagesSection } from "./travel-packages-section";
import { TravelServicesSection } from "./travel-services-section";
import { useTravelStore } from "@/lib/storage/travel-store";
import type { TravelPackage } from "@/components/admin-travel/types";

export function TravelLanding({
  initialPackages,
}: {
  initialPackages?: readonly TravelPackage[];
}) {
  const { packages: storePackages } = useTravelStore();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | undefined>();
  const [searchFilter, setSearchFilter] = useState<{
    destination: string;
    travelType: string;
  }>({
    destination: "",
    travelType: "all",
  });

  const allPackages = initialPackages ?? storePackages.filter((p) => p.status !== "Inactive");

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const title = pkg.name;
      const destination = pkg.destination;
      const tagline = pkg.shortDescription || pkg.description || "";
      const country = pkg.country || "";

      if (searchFilter.destination) {
        const destQuery = searchFilter.destination.toLowerCase().trim();
        const matchesLocation = pkg.location.toLowerCase().includes(destQuery);
        const matchesTitle = pkg.title.toLowerCase().includes(destQuery);
        const matchesTagline = pkg.tagline.toLowerCase().includes(destQuery);
        const matchesDestinations = pkg.destinations.some((d) =>
          d.toLowerCase().includes(destQuery),
        );
        if (
          !matchesLocation &&
          !matchesTitle &&
          !matchesTagline &&
          !matchesDestinations
        ) {
          return false;
        }
      }
      if (searchFilter.travelType && searchFilter.travelType !== "all") {
        if (searchFilter.travelType === "Inbound" && pkg.travelType !== "Inbound") {
          return false;
        }
        if (searchFilter.travelType === "Outbound" && pkg.travelType !== "Outbound") {
          return false;
        }
      }
      return true;
    });
  }, [allPackages, searchFilter]);

  const handleExplore = (query: { destination: string; travelType: string }) => {
    setSearchFilter(query);
    const packagesElem = document.getElementById("packages");
    if (packagesElem) {
      packagesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCustomizeWithPackage = (pkg: TravelPackage) => {
    setSelectedDestination(pkg.destination);
    setIsCustomizeOpen(true);
  };

  const handleOpenCustomize = () => {
    setSelectedDestination(undefined);
    setIsCustomizeOpen(true);
  };

  return (
    <>
      <main className={`${landingStyles.page} ${landingStyles.solutionPage}`}>
        <TravelCinematicBackground />
        {/* 1. Hero Section with Light Background and Professional Search Bar */}
        <TravelHero onExplore={handleExplore} />

        {/* 2. Inbound Travel Section */}
        <InboundTravelSection />

        {/* 3. Outbound Travel Section */}
        <OutboundTravelSection />

        {/* 4. Travel Packages Section */}
        <TravelPackagesSection
          packages={filteredPackages}
          isFiltered={Boolean(
            searchFilter.destination || searchFilter.travelType !== "all",
          )}
          onCustomizePackage={handleOpenCustomizeWithPackage}
        />

        {/* 5. Travel & Tourism Services Section (immediately after Travel Packages) */}
        <TravelServicesSection onOpenCustomize={handleOpenCustomize} />

        {/* 6. Customize Your Trip Section (feature card + modal trigger) */}
        <CustomizeTripSection onOpenModal={handleOpenCustomize} />
      </main>

      {/* Unified Trip Customization / Inquiry Modal */}
      <PublicTravelInquiryModal
        open={isCustomizeOpen}
        onOpenChange={setIsCustomizeOpen}
        defaultDestination={selectedDestination}
        mode="customize"
      />
    </>
  );
}
