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
import { Button } from "@/components/ui/button";
import { useTravelStore } from "@/lib/storage/travel-store";
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
    togglePackageStatus,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  // Exact real statistics from actual database / API store
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
    toast.success(`Outbound package "${target.name}" deleted successfully.`);
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
      travelType: "Outbound",
      currency: "USD",
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
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy">
              Outbound Tours
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue border border-blue-100">
              <Globe2 className="size-3.5" />
              International Itineraries
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Manage international outbound tour packages, pricing, offers, itineraries and customer-facing travel information.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 shadow-2xs h-9 self-start sm:self-auto rounded-xl shrink-0"
        >
          <Plus className="size-4" />
          Add Outbound Package
        </Button>
      </div>

      {/* Real Statistics Overview Cards (0 if empty, no fake statistics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Packages"
          value={String(totalOutboundCount)}
          icon={Globe2}
          hint="All international tour itineraries"
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

      {/* Outbound Tour Packages Management Section */}
      <TravelPackagesTable
        packages={outboundPackages}
        travelType="Outbound"
        onViewPackage={handleView}
        onEditPackage={handleEdit}
        onDeletePackage={handleDelete}
        onAddPackage={handleOpenAdd}
        onToggleStatus={handleToggleStatus}
        title="Outbound Tour Packages"
        description="Manage international holiday packages, pricing in USD, visa details, itineraries, and publishing status."
        addLabel="Add Outbound Package"
      />

      {/* Package Add / Edit Modal (13 Sections) */}
      <TravelPackageDialog
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
        onSubmit={handleSubmitPackage}
        editingPackage={editingPackage}
        defaultTravelType="Outbound"
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
