"use client";

import {
  Archive,
  ArrowUpDown,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Globe2,
  Inbox,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Package,
  Palmtree,
  Phone,
  Plane,
  Plus,
  RefreshCw,
  Reply,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTravelStore } from "@/lib/storage/travel-store";
import { AdminInquiryDetailsDialog } from "./admin-inquiry-details-dialog";
import type {
  InquiryStatus,
  PackageReview,
  ReviewStatus,
  TravelInquiry,
} from "@/components/admin-travel/types";

const INQUIRY_TYPES = [
  { value: "ALL", label: "All Inquiry Types" },
  { value: "Inbound Tour", label: "Inbound Tours (Sri Lanka)" },
  { value: "Outbound Tour", label: "Outbound Tours (International)" },
  { value: "Customize Trip", label: "Customize Trip" },
  { value: "Flight Tickets", label: "Flight Tickets" },
  { value: "Visa Services", label: "Visa Services" },
  { value: "Work Visa", label: "Work Visa Support" },
  { value: "Import & Export", label: "Import & Export" },
  { value: "Trading & Sourcing", label: "Trading & Sourcing" },
  { value: "Business Solutions", label: "Business Solutions" },
  { value: "General Inquiry", label: "Other Requirements" },
];

const REVIEWS_STORAGE_KEY = "miracle_travel_package_reviews";

export function AdminInquiriesView() {
  const {
    inquiries,
    updateInquiryStatus,
    addInquiryReply,
    deleteInquiry,
    bulkUpdateInquiryStatus,
    bulkDeleteInquiries,
  } = useTravelStore();

  const [activeTab, setActiveTab] = useState<"inquiries" | "reviews">("inquiries");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [travelTypeFilter, setTravelTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dialog State
  const [activeInquiry, setActiveInquiry] = useState<TravelInquiry | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Reviews State (Tour packages only)
  const [reviews, setReviews] = useState<PackageReview[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>("ALL");

  // Summary counts for Status Cards
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const reviewingCount = inquiries.filter((i) => i.status === "Reviewing").length;
  const repliedCount = inquiries.filter((i) => i.status === "Replied").length;
  const inProgressCount = inquiries.filter((i) => i.status === "In Progress").length;
  const completedCount = inquiries.filter(
    (i) => i.status === "Completed" || i.status === "Confirmed"
  ).length;
  const cancelledCount = inquiries.filter((i) => i.status === "Cancelled").length;

  // Filter inquiries based on search, type, status, travel type, date
  const filteredInquiries = useMemo(() => {
    const now = new Date();
    return inquiries.filter((inq) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        inq.customerName.toLowerCase().includes(q) ||
        inq.customerEmail.toLowerCase().includes(q) ||
        inq.customerPhone.toLowerCase().includes(q) ||
        (inq.whatsappNumber && inq.whatsappNumber.toLowerCase().includes(q)) ||
        (inq.packageName && inq.packageName.toLowerCase().includes(q)) ||
        (inq.destination && inq.destination.toLowerCase().includes(q)) ||
        (inq.country && inq.country.toLowerCase().includes(q)) ||
        inq.referenceNumber.toLowerCase().includes(q) ||
        (inq.additionalRequirements && inq.additionalRequirements.toLowerCase().includes(q));

      const matchesType =
        typeFilter === "ALL" ||
        inq.inquiryType.toLowerCase().includes(typeFilter.toLowerCase()) ||
        (typeFilter === "General Inquiry" &&
          !inq.inquiryType.includes("Tour") &&
          !inq.inquiryType.includes("Flight") &&
          !inq.inquiryType.includes("Visa"));

      const matchesStatus =
        statusFilter === "ALL" ||
        inq.status === statusFilter ||
        (statusFilter === "Completed" && inq.status === "Confirmed");

      const matchesTravelType =
        travelTypeFilter === "ALL" || inq.travelType === travelTypeFilter;

      // Date filtering
      let matchesDate = true;
      if (dateFilter !== "ALL" && inq.submittedDate) {
        const itemDate = new Date(inq.submittedDate);
        if (!isNaN(itemDate.getTime())) {
          if (dateFilter === "today") {
            matchesDate = itemDate.toDateString() === now.toDateString();
          } else if (dateFilter === "7days") {
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(now.getDate() - 7);
            matchesDate = itemDate >= sevenDaysAgo;
          } else if (dateFilter === "30days") {
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
            matchesDate = itemDate >= thirtyDaysAgo;
          } else if (dateFilter === "thisMonth") {
            matchesDate =
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getFullYear() === now.getFullYear();
          }
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesTravelType && matchesDate;
    });
  }, [inquiries, searchQuery, typeFilter, statusFilter, travelTypeFilter, dateFilter]);

  // Bulk actions handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredInquiries.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: InquiryStatus) => {
    if (selectedIds.length === 0) return;
    bulkUpdateInquiryStatus(selectedIds, newStatus);
    toast.success(`Marked ${selectedIds.length} inquiries as "${newStatus}".`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    bulkDeleteInquiries(selectedIds);
    toast.success(`Deleted ${selectedIds.length} inquiries.`);
    setSelectedIds([]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setTravelTypeFilter("ALL");
    setDateFilter("ALL");
  };

  const handleViewInquiry = (inq: TravelInquiry) => {
    setActiveInquiry(inq);
    setInquiryModalOpen(true);
  };

  const handleQuickStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    toast.success(`Inquiry status updated to "${newStatus}".`);
  };

  const handleDeleteSingle = (id: string, refNum: string) => {
    deleteInquiry(id);
    toast.success(`Inquiry #${refNum} deleted.`);
  };

  // Reviews actions (strictly for tour packages)
  const handleUpdateReviewStatus = (reviewId: string, newStatus: ReviewStatus) => {
    const updated = reviews.map((r) =>
      r.id === reviewId ? { ...r, status: newStatus } : r
    );
    setReviews(updated);
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    toast.success(`Review marked as ${newStatus}.`);
  };

  const handleDeleteReview = (reviewId: string) => {
    const updated = reviews.filter((r) => r.id !== reviewId);
    setReviews(updated);
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    toast.success("Review removed.");
  };

  const filteredReviews = reviews.filter((r) => {
    if (reviewStatusFilter === "ALL") return true;
    return r.status === reviewStatusFilter;
  });

  return (
    <div className="space-y-6 pb-14">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy dark:text-foreground">
              Inquiries
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900">
              <MessageSquare className="size-3.5" />
              Customer Requests Desk
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Manage and respond to customer inquiries and requests from across Miracle International.
          </p>
        </div>

        {/* Real Count Pill & Navigation Tabs */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border/70">
            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "inquiries"
                  ? "bg-card text-brand-blue shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inquiries ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "reviews"
                  ? "bg-card text-brand-blue shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tour Reviews ({reviews.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "inquiries" ? (
        <>
          {/* ========================================================================= */}
          {/* 2. INQUIRY SUMMARY CARDS (Clickable Status Filters) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* All Inquiries */}
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "ALL"
                  ? "bg-blue-50/80 border-brand-blue text-brand-blue ring-1 ring-brand-blue shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                All Inquiries
              </span>
              <p className="text-xl font-extrabold text-navy dark:text-foreground mt-0.5 font-heading">
                {totalCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Total records</span>
            </button>

            {/* New */}
            <button
              type="button"
              onClick={() => setStatusFilter("New")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "New"
                  ? "bg-emerald-50 border-emerald-600 text-emerald-800 ring-1 ring-emerald-600 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  New
                </span>
                {newCount > 0 ? <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> : null}
              </div>
              <p className="text-xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-0.5 font-heading">
                {newCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Needs review</span>
            </button>

            {/* Reviewing */}
            <button
              type="button"
              onClick={() => setStatusFilter("Reviewing")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "Reviewing"
                  ? "bg-amber-50 border-amber-500 text-amber-800 ring-1 ring-amber-500 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Reviewing
              </span>
              <p className="text-xl font-extrabold text-amber-900 dark:text-amber-200 mt-0.5 font-heading">
                {reviewingCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Assessing</span>
            </button>

            {/* Replied */}
            <button
              type="button"
              onClick={() => setStatusFilter("Replied")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "Replied"
                  ? "bg-sky-50 border-sky-500 text-sky-800 ring-1 ring-sky-500 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                Replied
              </span>
              <p className="text-xl font-extrabold text-sky-900 dark:text-sky-200 mt-0.5 font-heading">
                {repliedCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Quote sent</span>
            </button>

            {/* In Progress */}
            <button
              type="button"
              onClick={() => setStatusFilter("In Progress")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "In Progress"
                  ? "bg-blue-50 border-blue-600 text-blue-800 ring-1 ring-blue-600 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                In Progress
              </span>
              <p className="text-xl font-extrabold text-blue-900 dark:text-blue-200 mt-0.5 font-heading">
                {inProgressCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Coordinating</span>
            </button>

            {/* Completed */}
            <button
              type="button"
              onClick={() => setStatusFilter("Completed")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "Completed"
                  ? "bg-emerald-50 border-emerald-700 text-emerald-900 ring-1 ring-emerald-700 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Completed
              </span>
              <p className="text-xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-0.5 font-heading">
                {completedCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Finalized</span>
            </button>

            {/* Cancelled */}
            <button
              type="button"
              onClick={() => setStatusFilter("Cancelled")}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                statusFilter === "Cancelled"
                  ? "bg-slate-100 border-slate-600 text-slate-900 ring-1 ring-slate-600 shadow-xs"
                  : "bg-card border-border/70 hover:border-border text-foreground"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Cancelled
              </span>
              <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 font-heading">
                {cancelledCount}
              </p>
              <span className="text-[10px] text-muted-foreground">Closed</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 3. SEARCH & FILTER BAR */}
          {/* ========================================================================= */}
          <Card className="rounded-2xl border-border/70 bg-card shadow-xs">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {/* Search Input */}
                <div className="relative sm:col-span-2 lg:col-span-2">
                  <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search name, email, phone, ID, destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 pl-8.5 text-xs bg-muted/30 focus-visible:bg-card"
                  />
                </div>

                {/* Inquiry Type Filter */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 text-xs bg-muted/30 font-medium">
                    <SelectValue placeholder="All Inquiry Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {INQUIRY_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 text-xs bg-muted/30 font-medium">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Reviewing">Reviewing</SelectItem>
                    <SelectItem value="Replied">Replied</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Filter */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-9 text-xs bg-muted/30 font-medium">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Type & Clear Filters Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-muted-foreground">Travel Type:</span>
                  <button
                    type="button"
                    onClick={() => setTravelTypeFilter("ALL")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      travelTypeFilter === "ALL"
                        ? "bg-brand-blue text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelTypeFilter("Inbound")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                      travelTypeFilter === "Inbound"
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Palmtree className="size-3" />
                    Inbound
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelTypeFilter("Outbound")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                      travelTypeFilter === "Outbound"
                        ? "bg-blue-600 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Globe2 className="size-3" />
                    Outbound
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {(searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL" || travelTypeFilter !== "ALL" || dateFilter !== "ALL") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="h-7 text-xs text-muted-foreground hover:text-brand-red gap-1 px-2"
                    >
                      <X className="size-3" />
                      Clear Filters
                    </Button>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Showing <strong>{filteredInquiries.length}</strong> of {totalCount} inquiries
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ========================================================================= */}
          {/* 4. BULK ACTIONS BAR (When items selected) */}
          {/* ========================================================================= */}
          {selectedIds.length > 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs">
              <div className="flex items-center gap-2 text-brand-blue font-bold">
                <CheckCircle2 className="size-4" />
                <span>{selectedIds.length} inquiries selected</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusChange("Reviewing")}
                  className="h-8 text-xs bg-white"
                >
                  Mark as Reviewing
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusChange("Completed")}
                  className="h-8 text-xs bg-white text-emerald-700"
                >
                  Mark as Completed
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkDelete}
                  className="h-8 text-xs bg-white text-brand-red border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="size-3.5 mr-1" />
                  Delete Selected
                </Button>
              </div>
            </div>
          ) : null}

          {/* ========================================================================= */}
          {/* 5. INQUIRIES TABLE */}
          {/* ========================================================================= */}
          <Card className="rounded-2xl border-border/70 bg-card shadow-xs overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-10 pl-6">
                        <input
                          type="checkbox"
                          checked={selectedIds.length > 0 && selectedIds.length === filteredInquiries.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="size-3.5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                        />
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground w-28">
                        Inquiry ID
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Customer
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Inquiry Type
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Service / Package
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Travel Type
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Destination
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Date Submitted
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Status
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right pr-6">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <Inbox className="size-8 text-muted-foreground/50 mb-2" />
                            <p className="text-sm font-semibold text-navy dark:text-foreground">
                              {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL"
                                ? "No inquiries match your filters."
                                : "No inquiries yet."}
                            </p>
                            <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                              {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL"
                                ? "Try resetting your search query or selecting a different status category."
                                : "Customer requests submitted through the website will appear here."}
                            </p>
                            {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleClearFilters}
                                className="mt-3 h-8 text-xs text-brand-blue"
                              >
                                Clear All Filters
                              </Button>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const isSelected = selectedIds.includes(inq.id);

                        return (
                          <TableRow
                            key={inq.id}
                            className={`group transition-colors hover:bg-muted/20 ${isSelected ? "bg-blue-50/40" : ""}`}
                          >
                            {/* Checkbox */}
                            <TableCell className="pl-6 py-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectOne(inq.id)}
                                className="size-3.5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                              />
                            </TableCell>

                            {/* Inquiry ID */}
                            <TableCell className="py-3 font-mono text-xs font-bold text-navy dark:text-foreground">
                              #{inq.referenceNumber}
                            </TableCell>

                            {/* Customer */}
                            <TableCell className="py-3 max-w-[190px]">
                              <div>
                                <p className="font-bold text-xs text-navy dark:text-foreground">{inq.customerName}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{inq.customerEmail}</p>
                                <p className="text-[10px] text-muted-foreground font-mono">{inq.customerPhone}</p>
                              </div>
                            </TableCell>

                            {/* Inquiry Type */}
                            <TableCell className="py-3">
                              <Badge variant="outline" className="text-[10px] font-semibold bg-background">
                                {inq.inquiryType}
                              </Badge>
                            </TableCell>

                            {/* Service / Package */}
                            <TableCell className="py-3 max-w-[200px]">
                              <div>
                                <p className="font-semibold text-xs text-foreground truncate">
                                  {inq.packageName || inq.destination || inq.referenceNumber}
                                </p>
                                {inq.country ? (
                                  <span className="text-[10px] text-muted-foreground block">{inq.country}</span>
                                ) : null}
                              </div>
                            </TableCell>

                            {/* Travel Type */}
                            <TableCell className="py-3">
                              {inq.travelType ? (
                                <Badge
                                  className={
                                    inq.travelType === "Inbound"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                                      : "bg-blue-50 text-blue-700 border-blue-200 text-[10px]"
                                  }
                                  variant="outline"
                                >
                                  {inq.travelType}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground text-xs">—</span>
                              )}
                            </TableCell>

                            {/* Destination */}
                            <TableCell className="py-3 text-xs text-foreground font-medium">
                              {inq.destination || inq.country || "—"}
                            </TableCell>

                            {/* Date Submitted */}
                            <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap font-mono text-[11px]">
                              {inq.submittedDate}
                            </TableCell>

                            {/* Status Badge */}
                            <TableCell className="py-3">
                              <Badge
                                className={
                                  inq.status === "New"
                                    ? "bg-emerald-600 text-white text-[10px] font-semibold"
                                    : inq.status === "Reviewing"
                                      ? "bg-amber-600 text-white text-[10px] font-semibold"
                                      : inq.status === "Replied"
                                        ? "bg-sky-600 text-white text-[10px] font-semibold"
                                        : inq.status === "In Progress"
                                          ? "bg-blue-600 text-white text-[10px] font-semibold"
                                          : inq.status === "Completed"
                                            ? "bg-emerald-700 text-white text-[10px] font-semibold"
                                            : "bg-slate-600 text-white text-[10px] font-semibold"
                                }
                              >
                                {inq.status}
                              </Badge>
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="py-3 pr-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  size="sm"
                                  onClick={() => handleViewInquiry(inq)}
                                  className="h-7 text-xs font-semibold px-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg shadow-2xs gap-1"
                                >
                                  <Eye className="size-3" />
                                  View
                                </Button>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="ghost" className="size-7 p-0 text-muted-foreground">
                                      <MoreHorizontal className="size-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="text-xs">
                                    <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">
                                      Quick Status Change
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "New")}>
                                      Mark as New
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "Reviewing")}>
                                      Mark as Reviewing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "Replied")}>
                                      Mark as Replied
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "In Progress")}>
                                      Mark as In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "Completed")}>
                                      Mark as Completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleQuickStatusChange(inq.id, "Cancelled")}>
                                      Mark as Cancelled
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteSingle(inq.id, inq.referenceNumber)}
                                      className="text-brand-red focus:text-brand-red"
                                    >
                                      <Trash2 className="size-3.5 mr-1.5" />
                                      Delete Inquiry
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between border-t border-border/60 px-6 py-3 bg-muted/10 text-xs text-muted-foreground">
                <span>
                  Showing <strong>{filteredInquiries.length}</strong> of {totalCount} total inquiries
                </span>
                <span className="text-[11px]">Miracle International Private CRM</span>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* ========================================================================= */
        /* 6. TOUR PACKAGE REVIEWS MANAGEMENT (Sections 11, 12, 13) */
        /* ========================================================================= */
        <div className="space-y-4">
          <Card className="rounded-2xl border-border/70 bg-card shadow-xs">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border/50">
              <div>
                <CardTitle className="text-base font-bold text-navy dark:text-foreground flex items-center gap-2">
                  <Star className="size-4 text-amber-500 fill-amber-500" />
                  Tour Package Reviews
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Reviews are strictly linked to tour packages. Only approved reviews appear on public package pages.
                </p>
              </div>

              {/* Status Filter for Reviews */}
              <div className="flex items-center gap-2">
                <Select value={reviewStatusFilter} onValueChange={setReviewStatusFilter}>
                  <SelectTrigger className="h-8.5 w-[140px] text-xs bg-muted/30">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Reviews ({reviews.length})</SelectItem>
                    <SelectItem value="Pending">Pending ({reviews.filter((r) => r.status === "Pending").length})</SelectItem>
                    <SelectItem value="Approved">Approved ({reviews.filter((r) => r.status === "Approved").length})</SelectItem>
                    <SelectItem value="Rejected">Rejected ({reviews.filter((r) => r.status === "Rejected").length})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredReviews.length === 0 ? (
                <div className="py-14 text-center text-muted-foreground">
                  <Star className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-navy dark:text-foreground">No customer reviews yet.</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    When customers submit reviews for tour packages, they will appear here for admin approval.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-xs text-navy dark:text-foreground">{rev.packageName}</span>
                          <span className="text-muted-foreground text-xs">•</span>
                          <span className="text-xs text-foreground font-medium">{rev.customerName}</span>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${
                                  i < rev.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge
                            className={
                              rev.status === "Approved"
                                ? "bg-emerald-600 text-white text-[10px]"
                                : rev.status === "Pending"
                                  ? "bg-amber-600 text-white text-[10px]"
                                  : "bg-slate-600 text-white text-[10px]"
                            }
                          >
                            {rev.status}
                          </Badge>
                        </div>
                        {rev.reviewTitle ? (
                          <p className="text-xs font-semibold text-foreground">{rev.reviewTitle}</p>
                        ) : null}
                        <p className="text-xs text-muted-foreground leading-relaxed">{rev.reviewText}</p>
                        <span className="text-[10px] text-muted-foreground font-mono block pt-0.5">
                          Submitted on {rev.createdAt}
                        </span>
                      </div>

                      {/* Review Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {rev.status !== "Approved" && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateReviewStatus(rev.id, "Approved")}
                            className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <Check className="size-3.5 mr-1" />
                            Approve
                          </Button>
                        )}
                        {rev.status !== "Rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateReviewStatus(rev.id, "Rejected")}
                            className="h-8 text-xs text-amber-700 hover:bg-amber-50"
                          >
                            Reject
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteReview(rev.id)}
                          className="h-8 text-xs text-muted-foreground hover:text-brand-red"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      <AdminInquiryDetailsDialog
        inquiry={activeInquiry}
        open={inquiryModalOpen}
        onOpenChange={setInquiryModalOpen}
        onUpdateStatus={handleQuickStatusChange}
        onSendReply={(id, reply) => {
          addInquiryReply(id, reply);
          toast.success(`Email reply dispatched to ${reply.recipientEmail}.`);
        }}
      />
    </div>
  );
}
