"use client";

import {
  ArrowLeftRight,
  Briefcase,
  Clock,
  FileCheck2,
  Plane,
  Receipt,
  Ship,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminStatCard } from "./admin-stat-card";
import { QuickActions } from "./quick-actions";
import { ServiceOverview } from "./service-overview";
import { RecentRequestsTable } from "./recent-requests-table";
import { RecentTravelBookings } from "./recent-travel-bookings";
import { RequestDetailsDialog } from "./request-details-dialog";
import { BookingDetailsDialog } from "./booking-details-dialog";
import { AddTravelPackageDialog } from "./add-travel-package-dialog";
import { useTravelStore } from "@/lib/storage/travel-store";
import {
  INITIAL_RECENT_REQUESTS,
  INITIAL_SERVICE_OVERVIEW,
  INITIAL_SUMMARY_STATS,
  INITIAL_TRAVEL_BOOKINGS,
} from "./data";
import type {
  RequestStatus,
  ServiceOverviewItem,
  ServiceRequest,
  ServiceType,
  TravelBooking,
  TravelPackageFormData,
} from "./types";

interface AdminDashboardViewProps {
  adminEmail?: string;
  adminName?: string;
}

export function AdminDashboardView({
  adminEmail = "admin@miracleinternational.com",
  adminName = "Administrator",
}: AdminDashboardViewProps) {
  const { inquiries, inboundPackages, outboundPackages } = useTravelStore();

  // State management - initialized cleanly with empty arrays
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_RECENT_REQUESTS);
  const [bookings, setBookings] = useState<TravelBooking[]>(INITIAL_TRAVEL_BOOKINGS);
  const [selectedServiceFilter, setSelectedServiceFilter] =
    useState<ServiceType | "ALL">("ALL");

  // Derive service overview dynamically from actual requests
  const serviceOverview = useMemo<ServiceOverviewItem[]>(() => {
    const total = requests.length;
    const services: ServiceType[] = [
      "Travel",
      "Flight Tickets",
      "Work Visa",
      "Visa & Passport",
      "Import & Export",
      "Trading",
      "Business Solutions",
      "Investment",
      "Franchise",
    ];

    return services.map((service) => {
      const matching = requests.filter((r) => r.service === service);
      const count = matching.length;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      const pendingCount = matching.filter((r) => r.status === "Pending").length;
      const reviewingCount = matching.filter((r) => r.status === "Reviewing").length;
      const activeCount = matching.filter((r) => r.status === "Confirmed").length;
      const completedCount = matching.filter((r) => r.status === "Completed").length;

      return {
        service,
        count,
        percentage,
        pendingCount,
        reviewingCount,
        activeCount,
        completedCount,
      };
    });
  }, [requests]);

  // Modal dialog states
  const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const [activeBooking, setActiveBooking] = useState<TravelBooking | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [addPackageModalOpen, setAddPackageModalOpen] = useState(false);

  // Dynamic counts derived purely from real state
  const totalPendingCount = requests.filter((r) => r.status === "Pending").length;
  const travelBookingsCount = bookings.length;
  const flightTicketCount = requests.filter((r) => r.service === "Flight Tickets").length;
  const workVisaCount = requests.filter((r) => r.service === "Work Visa").length;
  const importExportCount = requests.filter((r) => r.service === "Import & Export").length;
  const tradingCount = requests.filter((r) => r.service === "Trading").length;
  const businessCount = requests.filter((r) => r.service === "Business Solutions").length;

  // Handlers
  const handleViewRequest = (req: ServiceRequest) => {
    setActiveRequest(req);
    setRequestModalOpen(true);
  };

  const handleViewBooking = (booking: TravelBooking) => {
    setActiveBooking(booking);
    setBookingModalOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
    if (activeRequest && activeRequest.id === id) {
      setActiveRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Request status updated to ${newStatus}`);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: RequestStatus) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
    if (activeBooking && activeBooking.id === id) {
      setActiveBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Travel booking status updated to ${newStatus}`);
  };

  const handleAddPackage = (data: TravelPackageFormData) => {
    toast.success(`Travel Package "${data.title}" successfully created!`);
  };

  const handleSelectService = (service: ServiceType | "ALL") => {
    setSelectedServiceFilter(service);
  };

  return (
    <div className="space-y-6">
      {/* 1. System Status / Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy dark:text-foreground">
              Admin Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Operations
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Miracle International centralized management overview • Welcome back, {adminName}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border border-border/70 bg-card px-2.5 py-1 font-mono">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* 2. Summary Cards (8 cards in responsive grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.totalCustomers.label}
          value={INITIAL_SUMMARY_STATS.totalCustomers.value}
          icon={Users}
          hint={INITIAL_SUMMARY_STATS.totalCustomers.hint}
          accentColor="blue"
        />

        {/* Pending Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.pendingRequests.label}
          value={String(totalPendingCount)}
          icon={Clock}
          hint={INITIAL_SUMMARY_STATS.pendingRequests.hint}
          highlight={totalPendingCount > 0}
          accentColor="red"
        />

        {/* Travel Inquiries */}
        <AdminStatCard
          label="Travel Inquiries"
          value={String(inquiries.length)}
          icon={Plane}
          hint={inquiries.filter((i) => i.status === "New").length > 0 ? `${inquiries.filter((i) => i.status === "New").length} new inquiries` : "Customer tour requests"}
          highlight={inquiries.filter((i) => i.status === "New").length > 0}
          accentColor="blue"
        />

        {/* Flight Ticket Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.flightTicketRequests.label}
          value={String(flightTicketCount)}
          icon={Ticket}
          hint={INITIAL_SUMMARY_STATS.flightTicketRequests.hint}
          accentColor="blue"
        />

        {/* Work Visa Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.workVisaRequests.label}
          value={String(workVisaCount)}
          icon={FileCheck2}
          hint={INITIAL_SUMMARY_STATS.workVisaRequests.hint}
          accentColor="navy"
        />

        {/* Import & Export Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.importExportRequests.label}
          value={String(importExportCount)}
          icon={Ship}
          hint={INITIAL_SUMMARY_STATS.importExportRequests.hint}
          accentColor="navy"
        />

        {/* Trading Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.tradingRequests.label}
          value={String(tradingCount)}
          icon={ArrowLeftRight}
          hint={INITIAL_SUMMARY_STATS.tradingRequests.hint}
          accentColor="blue"
        />

        {/* Business Requests */}
        <AdminStatCard
          label={INITIAL_SUMMARY_STATS.businessRequests.label}
          value={String(businessCount)}
          icon={Briefcase}
          hint={INITIAL_SUMMARY_STATS.businessRequests.hint}
          accentColor="navy"
        />
      </div>

      {/* 3. Quick Actions Shortcuts */}
      <QuickActions
        onAddTravelPackage={() => setAddPackageModalOpen(true)}
        onFilterService={handleSelectService}
      />

      {/* 4. Service Request Overview */}
      <ServiceOverview
        items={serviceOverview}
        selectedService={selectedServiceFilter}
        onSelectService={handleSelectService}
      />

      {/* 5. Main Content Grid: Recent Requests Table & Recent Travel Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / 2-Columns: Recent Requests Table */}
        <div className="lg:col-span-2 space-y-6">
          <RecentRequestsTable
            requests={requests}
            onViewRequest={handleViewRequest}
            onUpdateStatus={handleUpdateStatus}
            selectedServiceFilter={selectedServiceFilter}
            onFilterServiceChange={setSelectedServiceFilter}
          />
        </div>

        {/* Right / 1-Column: Recent Travel Bookings */}
        <div className="space-y-6">
          <RecentTravelBookings
            bookings={bookings}
            onViewBooking={handleViewBooking}
          />
        </div>
      </div>

      {/* Modals & Dialogs */}
      <RequestDetailsDialog
        request={activeRequest}
        open={requestModalOpen}
        onOpenChange={setRequestModalOpen}
        onUpdateStatus={handleUpdateStatus}
      />

      <BookingDetailsDialog
        booking={activeBooking}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        onUpdateStatus={handleUpdateBookingStatus}
      />

      <AddTravelPackageDialog
        open={addPackageModalOpen}
        onOpenChange={setAddPackageModalOpen}
        onSubmitPackage={handleAddPackage}
      />
    </div>
  );
}
