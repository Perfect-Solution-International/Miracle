"use client";

import { useMemo, useState } from "react";

import { CustomizeTripModal, CustomizeTripSection } from "./customize-trip-section";
import { InboundTravelSection, OutboundTravelSection } from "./inbound-outbound-section";
import { TravelHero } from "./travel-hero";
import { TravelPackagesSection } from "./travel-packages-section";
import { TravelServicesSection } from "./travel-services-section";
import type { TravelPackageDetail } from "../types/travel-package-detail.types";

export function TravelLanding({
  initialPackages,
}: {
  initialPackages: readonly TravelPackageDetail[];
}) {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | undefined>();
  const [searchFilter, setSearchFilter] = useState<{ destination: string; travelType: string }>({
    destination: "",
    travelType: "all",
  });

  const filteredPackages = useMemo(() => {
    return initialPackages.filter((pkg) => {
      if (searchFilter.destination) {
        const destQuery = searchFilter.destination.toLowerCase().trim();
        const matchesLocation = pkg.location.toLowerCase().includes(destQuery);
        const matchesTitle = pkg.title.toLowerCase().includes(destQuery);
        const matchesTagline = pkg.tagline.toLowerCase().includes(destQuery);
        const matchesDestinations = pkg.destinations.some((d) =>
          d.toLowerCase().includes(destQuery),
        );
        if (!matchesLocation && !matchesTitle && !matchesTagline && !matchesDestinations) {
          return false;
        }
      }
      if (searchFilter.travelType && searchFilter.travelType !== "all") {
        if (pkg.travelType !== searchFilter.travelType) {
          return false;
        }
      }
      return true;
    });
  }, [initialPackages, searchFilter]);

  const handleExplore = (query: { destination: string; travelType: string }) => {
    setSearchFilter(query);
    const packagesElem = document.getElementById("packages");
    if (packagesElem) {
      packagesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCustomizeWithPackage = (pkg: TravelPackageDetail) => {
    setSelectedDestination(pkg.location);
    setIsCustomizeOpen(true);
  };

  const handleOpenCustomize = () => {
    setSelectedDestination(undefined);
    setIsCustomizeOpen(true);
  };

  return (
    <>
      <main>
        {/* 1. Hero Section with Light Background and Professional Search Bar */}
        <TravelHero onExplore={handleExplore} />

        {/* 2. Inbound Travel Section */}
        <InboundTravelSection />

        {/* 3. Outbound Travel Section */}
        <OutboundTravelSection />

        {/* 4. Travel Packages Section */}
        <TravelPackagesSection
          packages={filteredPackages}
          isFiltered={Boolean(searchFilter.destination || searchFilter.travelType !== "all")}
          onCustomizePackage={handleOpenCustomizeWithPackage}
        />

        {/* 5. Travel & Tourism Services Section (immediately after Travel Packages) */}
        <TravelServicesSection onOpenCustomize={handleOpenCustomize} />

        {/* 6. Customize Your Trip Section (feature card + modal trigger) */}
        <CustomizeTripSection onOpenModal={handleOpenCustomize} />
      </main>

      {/* Centered Trip Customization Modal */}
      <CustomizeTripModal
        open={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        initialDestination={selectedDestination}
      />
    </>
  );
}
