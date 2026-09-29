"use client";

import {
  Archive,
  CheckCircle2,
  FileEdit,
  Globe2,
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

export function TravelOutboundView() {
  const {
    outboundPackages,
    addPackage,
    updatePackage,
    deletePackage,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  // Exact real statistics from actual package data
  const totalOutboundCount = outboundPackages.length;
  const activeCount = outboundPackages.filter((p) => p.status === "Active").length;
  const draftCount = outboundPackages.filter((p) => p.status === "Draft").length;
  const inactiveCount = outboundPackages.filter((p) => p.status === "Inactive").length;

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
    const target = outboundPackages.find((p) => p.id === id);
    if (!target) return;
    deletePackage(id);
    toast.success(`Outbound package "${target.name}" removed.`);
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    const payload: TravelPackageFormData = {
      ...data,
      travelType: "Outbound",
      currency: data.currency || "USD",
    };

    if (editId) {
      updatePackage(editId, payload);
      toast.success(`Outbound package "${payload.name}" updated successfully.`);
    } else {
      addPackage(payload);
      toast.success(`Outbound package "${payload.name}" created successfully.`);
    }
  };

  return (
    <div className="space-y-6">
      <AdminTravelNavHeader onAddPackage={handleOpenAdd} addPackageLabel="+ Add Outbound Package" />

      {/* Real Statistics from actual package data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Outbound Packages"
          value={String(totalOutboundCount)}
          icon={Globe2}
          hint="All international tour packages"
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

      {/* Outbound Packages Table */}
      <TravelPackagesTable
        packages={outboundPackages}
        onViewPackage={handleView}
        onEditPackage={handleEdit}
        onDeletePackage={handleDelete}
        onAddPackage={handleOpenAdd}
        title="Outbound Tour Packages"
        description="Manage international holiday packages, flight itineraries, Dubai/Maldives tours, and status."
      />

      {/* Modals */}
      <TravelPackageDialog
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
        onSubmit={handleSubmitPackage}
        editingPackage={editingPackage}
        defaultTravelType="Outbound"
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
