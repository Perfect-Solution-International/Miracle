"use client";

import {
  CheckCircle2,
  Compass,
  Globe2,
  Package,
  Palmtree,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminStatCard } from "@/components/admin-dashboard/admin-stat-card";
import { Button } from "@/components/ui/button";
import { useTravelStore } from "@/lib/storage/travel-store";
import { AdminTravelNavHeader } from "./admin-travel-nav-header";
import { TravelPackageDetailsDialog } from "./travel-package-details-dialog";
import { TravelPackageDialog } from "./travel-package-dialog";
import { TravelPackagesTable } from "./travel-packages-table";
import type { TravelPackage, TravelPackageFormData } from "./types";

export function TravelManagementView() {
  const {
    packages,
    inboundPackages,
    outboundPackages,
    inquiries,
    addPackage,
    updatePackage,
    deletePackage,
  } = useTravelStore();

  // Modal Dialog states
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  // Dynamic counts for Summary Cards
  const totalPackagesCount = packages.length;
  const activePackagesCount = packages.filter((p) => p.status === "Active").length;
  const draftPackagesCount = packages.filter((p) => p.status === "Draft").length;

  // Handlers for Packages
  const handleOpenAddPackage = () => {
    setEditingPackage(null);
    setPackageModalOpen(true);
  };

  const handleEditPackage = (pkg: TravelPackage) => {
    setEditingPackage(pkg);
    setPackageModalOpen(true);
  };

  const handleViewPackage = (pkg: TravelPackage) => {
    setViewPackage(pkg);
    setViewPackageModalOpen(true);
  };

  const handleDeletePackage = (id: string) => {
    const target = packages.find((p) => p.id === id);
    if (!target) return;
    deletePackage(id);
    toast.success(`Package "${target.name}" has been deleted.`);
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    if (editId) {
      updatePackage(editId, data);
      toast.success(`Travel package "${data.name}" updated successfully.`);
    } else {
      addPackage(data);
      toast.success(`Travel package "${data.name}" created successfully.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Nav Header */}
      <AdminTravelNavHeader onAddPackage={handleOpenAddPackage} addPackageLabel="+ Add Travel Package" />

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Packages */}
        <AdminStatCard
          label="Total Packages"
          value={String(totalPackagesCount)}
          icon={Package}
          hint="All created itineraries"
          accentColor="blue"
        />

        {/* Inbound Packages */}
        <AdminStatCard
          label="Inbound Packages"
          value={String(inboundPackages.length)}
          icon={Palmtree}
          hint="Sri Lanka itineraries"
          accentColor="navy"
        />

        {/* Outbound Packages */}
        <AdminStatCard
          label="Outbound Packages"
          value={String(outboundPackages.length)}
          icon={Globe2}
          hint="International holidays"
          accentColor="blue"
        />

        {/* Active Published */}
        <AdminStatCard
          label="Active Packages"
          value={String(activePackagesCount)}
          icon={CheckCircle2}
          hint="Live on website"
          accentColor="navy"
        />
      </div>

      {/* 3. Packages Table */}
      <TravelPackagesTable
        packages={packages}
        onViewPackage={handleViewPackage}
        onEditPackage={handleEditPackage}
        onDeletePackage={handleDeletePackage}
        onAddPackage={handleOpenAddPackage}
      />

      {/* 4. Modals and Dialogs */}
      <TravelPackageDialog
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
        onSubmit={handleSubmitPackage}
        editingPackage={editingPackage}
      />

      <TravelPackageDetailsDialog
        packageItem={viewPackage}
        open={viewPackageModalOpen}
        onOpenChange={setViewPackageModalOpen}
        onEdit={(pkg) => {
          setViewPackageModalOpen(false);
          handleEditPackage(pkg);
        }}
      />
    </div>
  );
}
