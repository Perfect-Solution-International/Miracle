"use client";

import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Globe2,
  Package,
  Plane,
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

export function TravelOutboundView() {
  const {
    outboundPackages,
    inquiries,
    addPackage,
    updatePackage,
    deletePackage,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  const activeCount = outboundPackages.filter((p) => p.status === "Active").length;
  const draftCount = outboundPackages.filter((p) => p.status === "Draft").length;
  const outboundInquiries = inquiries.filter((i) => i.travelType === "Outbound");
  const pendingInquiriesCount = outboundInquiries.filter((i) => i.status === "New" || i.status === "Reviewing").length;

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
    toast.success(`Outbound package "${target.name}" deleted.`);
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    const payload: TravelPackageFormData = {
      ...data,
      travelType: "Outbound",
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

      {/* Summary Stats for Outbound */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Outbound Packages"
          value={String(outboundPackages.length)}
          icon={Globe2}
          hint="All international tour packages"
          accentColor="blue"
        />
        <AdminStatCard
          label="Active Packages"
          value={String(activeCount)}
          icon={CheckCircle2}
          hint="Publicly visible on website"
          accentColor="navy"
        />
        <AdminStatCard
          label="Draft Itineraries"
          value={String(draftCount)}
          icon={Package}
          hint="Unpublished packages"
          accentColor="blue"
        />
        <AdminStatCard
          label="Outbound Inquiries"
          value={String(outboundInquiries.length)}
          icon={Clock}
          hint={pendingInquiriesCount > 0 ? `${pendingInquiriesCount} awaiting review` : "All inquiries up to date"}
          highlight={pendingInquiriesCount > 0}
          accentColor={pendingInquiriesCount > 0 ? "red" : "navy"}
        />
      </div>

      {/* Outbound Packages Table */}
      <TravelPackagesTable
        packages={outboundPackages}
        onViewPackage={handleView}
        onEditPackage={handleEdit}
        onDeletePackage={handleDelete}
        onAddPackage={handleOpenAdd}
      />

      {/* Modals */}
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
          handleEdit(pkg);
        }}
      />
    </div>
  );
}
