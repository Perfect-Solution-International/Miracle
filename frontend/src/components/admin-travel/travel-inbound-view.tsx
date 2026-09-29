"use client";

import {
  Archive,
  CheckCircle2,
  FileEdit,
  Palmtree,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminStatCard } from "@/components/admin-dashboard/admin-stat-card";
import { useTravelStore } from "@/lib/storage/travel-store";
import { AdminTravelNavHeader } from "./admin-travel-nav-header";
import { TravelPackageDetailsDialog } from "./travel-package-details-dialog";
import { TravelPackageDialog } from "./travel-package-dialog";
import { TravelPackagesTable } from "./travel-packages-table";
import type { TravelPackage, TravelPackageFormData } from "./types";

export function TravelInboundView() {
  const {
    inboundPackages,
    addPackage,
    updatePackage,
    deletePackage,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  // Exact real statistics from actual package data
  const totalInboundCount = inboundPackages.length;
  const activeCount = inboundPackages.filter((p) => p.status === "Active").length;
  const draftCount = inboundPackages.filter((p) => p.status === "Draft").length;
  const inactiveCount = inboundPackages.filter((p) => p.status === "Inactive").length;

  const handleOpenAdd = () => {
    setEditingPackage(null);
    setPackageModalOpen(true);
  };

  const handleEdit = (pkg: TravelPackage) => {
    setEditingPackage(pkg);
    setPackageModalOpen(true);
  };

  const handleView = (pkg: TravelPackage) => {
    setViewPackage(pkg);
    setViewPackageModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const target = inboundPackages.find((p) => p.id === id);
    if (!target) return;
    deletePackage(id);
    toast.success(`Inbound package "${target.name}" removed.`);
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    const payload: TravelPackageFormData = {
      ...data,
      travelType: "Inbound",
      country: data.country || "Sri Lanka",
      currency: "LKR",
    };

    if (editId) {
      updatePackage(editId, payload);
      toast.success(`Inbound package "${payload.name}" updated successfully.`);
    } else {
      addPackage(payload);
      toast.success(`Inbound package "${payload.name}" created successfully.`);
    }
  };

  return (
    <div className="space-y-6">
      <AdminTravelNavHeader onAddPackage={handleOpenAdd} addPackageLabel="+ Add Inbound Package" />

      {/* Real Statistics from actual package data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Inbound Packages"
          value={String(totalInboundCount)}
          icon={Palmtree}
          hint="All Sri Lanka itineraries"
          accentColor="blue"
        />
        <AdminStatCard
          label="Active Packages"
          value={String(activeCount)}
          icon={CheckCircle2}
          hint="Publicly live on website"
          accentColor="navy"
        />
        <AdminStatCard
          label="Draft Packages"
          value={String(draftCount)}
          icon={FileEdit}
          hint="Unpublished drafts"
          accentColor="blue"
        />
        <AdminStatCard
          label="Inactive Packages"
          value={String(inactiveCount)}
          icon={Archive}
          hint="Archived / hidden"
          accentColor="navy"
        />
      </div>

      {/* Inbound Packages Table */}
      <TravelPackagesTable
        packages={inboundPackages}
        onViewPackage={handleView}
        onEditPackage={handleEdit}
        onDeletePackage={handleDelete}
        onAddPackage={handleOpenAdd}
        title="Inbound Tour Packages"
        description="Manage Sri Lanka holiday packages, itineraries, pricing, and publishing status."
      />

      {/* Modals */}
      <TravelPackageDialog
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
        onSubmit={handleSubmitPackage}
        editingPackage={editingPackage}
        defaultTravelType="Inbound"
      />

      <TravelPackageDetailsDialog
        packageItem={viewPackage}
        open={viewPackageModalOpen}
        onOpenChange={setViewPackageModalOpen}
        onEdit={(pkg) => {
          setViewPackageModalOpen(false);
          handleEdit(pkg);
        }}
      />
    </div>
  );
}
