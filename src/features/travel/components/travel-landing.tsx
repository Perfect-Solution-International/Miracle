"use client";

import { useState } from "react";

import landingStyles from "@/app/(public)/landing-surfaces.module.css";
import { PublicTravelInquiryModal } from "@/components/travel/public-travel-inquiry-modal";

import { TravelHero } from "./travel-hero";
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

  const allPackages = initialPackages ?? storePackages.filter((p) => p.status !== "Inactive");

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
        {/* 1. Hero Section with Inbound & Outbound Tour Buttons */}
        <TravelHero />

        {/* 2. Travel & Tourism Services Section ("Explore Solutions / Travel & Tourism Services") */}
        <TravelServicesSection onOpenCustomize={handleOpenCustomize} />

        {/* 3. Travel Packages Section */}
        <TravelPackagesSection
          packages={allPackages}
          onCustomizePackage={handleOpenCustomizeWithPackage}
        />
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
