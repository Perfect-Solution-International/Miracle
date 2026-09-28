"use client";

import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
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

export function TravelInboundView() {
  const {
    inboundPackages,
    inquiries,
    addPackage,
    updatePackage,
    deletePackage,
  } = useTravelStore();

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  const [viewPackage, setViewPackage] = useState<TravelPackage | null>(null);
  const [viewPackageModalOpen, setViewPackageModalOpen] = useState(false);

  const activeCount = inboundPackages.filter((p) => p.status === "Active").length;
  const draftCount = inboundPackages.filter((p) => p.status === "Draft").length;
  const inboundInquiries = inquiries.filter((i) => i.travelType === "Inbound");
  const pendingInquiriesCount = inboundInquiries.filter((i) => i.status === "New" || i.status === "Reviewing").length;

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
    toast.success(`Inbound package "${target.name}" deleted.`);
  };

  const handleSubmitPackage = (data: TravelPackageFormData, editId?: string) => {
    const payload: TravelPackageFormData = {
      ...data,
      travelType: "Inbound",
      country: data.country || "Sri Lanka",
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

      {/* Summary Stats for Inbound */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Inbound Packages"
          value={String(inboundPackages.length)}
          icon={Palmtree}
          hint="All Sri Lanka itineraries"
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
          label="Inbound Inquiries"
          value={String(inboundInquiries.length)}
          icon={Clock}
          hint={pendingInquiriesCount > 0 ? `${pendingInquiriesCount} awaiting review` : "All inquiries up to date"}
          highlight={pendingInquiriesCount > 0}
          accentColor={pendingInquiriesCount > 0 ? "red" : "navy"}
        />
      </div>

      {/* Inbound Packages Table */}
      <TravelPackagesTable
        packages={inboundPackages}
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
