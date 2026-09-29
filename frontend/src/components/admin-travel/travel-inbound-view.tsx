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
import { Button } from "@/components/ui/button";
import { useTravelStore } from "@/lib/storage/travel-store";
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
    togglePackageStatus,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  // Exact real statistics from actual database / API store
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
    toast.success(`Inbound package "${target.name}" deleted successfully.`);
  };

  const handleToggleStatus = (pkg: TravelPackage) => {
    const nextStatus = pkg.status === "Active" ? "Inactive" : "Active";
    togglePackageStatus(pkg.id, nextStatus);
    toast.success(
      nextStatus === "Active"
        ? `Package "${pkg.name}" is now Active & published.`
        : `Package "${pkg.name}" is now Inactive (hidden from public website).`
    );
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    const payload: TravelPackageFormData = {
      ...data,
      travelType: "Inbound",
      country: "Sri Lanka",
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
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy dark:text-foreground">
              Inbound Tours
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
              <Palmtree className="size-3.5" />
              Sri Lanka Itineraries
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Manage Sri Lanka inbound tour packages, pricing, offers, itineraries and customer-facing travel information.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 shadow-sm h-9 self-start sm:self-auto rounded-xl shrink-0"
        >
          <Plus className="size-4" />
          Add Inbound Package
        </Button>
      </div>

      {/* Real Statistics Overview Cards (0 if empty, no fake statistics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Packages"
          value={String(totalInboundCount)}
          icon={Palmtree}
          hint="All inbound Sri Lanka tour itineraries"
          accentColor="blue"
        />
        <AdminStatCard
          label="Active Packages"
          value={String(activeCount)}
          icon={CheckCircle2}
          hint="Published live on travel website"
          accentColor="navy"
        />
        <AdminStatCard
          label="Draft Packages"
          value={String(draftCount)}
          icon={FileEdit}
          hint="Unpublished drafts in preparation"
          accentColor="blue"
        />
        <AdminStatCard
          label="Inactive Packages"
          value={String(inactiveCount)}
          icon={Archive}
          hint="Archived / hidden from public"
          accentColor="navy"
        />
      </div>

      {/* Inbound Tour Packages Management Section */}
      <TravelPackagesTable
        packages={inboundPackages}
        travelType="Inbound"
        onViewPackage={handleView}
        onEditPackage={handleEdit}
        onDeletePackage={handleDelete}
        onAddPackage={handleOpenAdd}
        onToggleStatus={handleToggleStatus}
        title="Inbound Tour Packages"
        description="Manage Sri Lanka holiday packages, pricing in LKR / USD, itineraries, and publishing status."
        addLabel="Add Inbound Package"
      />

      {/* Package Add / Edit Modal (13 Sections) */}
      <TravelPackageDialog
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
        onSubmit={handleSubmitPackage}
        editingPackage={editingPackage}
        defaultTravelType="Inbound"
      />

      {/* View Package Details Modal */}
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
