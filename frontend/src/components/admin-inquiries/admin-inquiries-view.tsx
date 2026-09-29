"use client";

import {
  Briefcase,
  Building2,
  Calendar,
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
  RefreshCw,
  Reply,
  Search,
  SlidersHorizontal,
  Stamp,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminStatCard } from "@/components/admin-dashboard/admin-stat-card";
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
  InquiryReply,
  InquiryStatus,
  InquiryType,
  TravelInquiry,
} from "@/components/admin-travel/types";

const INQUIRY_TYPES = [
  { value: "ALL", label: "All Inquiries" },
  { value: "Inbound Tour", label: "Inbound Tours" },
  { value: "Outbound Tour", label: "Outbound Tours" },
  { value: "Customize Trip", label: "Customize Trip Requests" },
  { value: "Flight Tickets", label: "Flight Ticket Inquiries" },
  { value: "Visa Services", label: "Visa Inquiries" },
  { value: "Work Visa", label: "Work Visa Inquiries" },
  { value: "Import & Export", label: "Import & Export Inquiries" },
  { value: "Trading & Sourcing", label: "Trading & Sourcing" },
  { value: "Business Solutions", label: "Business Solutions" },
  { value: "General Inquiry", label: "Other Requirements" },
];

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "ALL", label: "All Statuses" },
  { value: "New", label: "New" },
  { value: "Reviewing", label: "Reviewing" },
  { value: "In Progress", label: "In Progress" },
  { value: "Replied", label: "Replied" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export function AdminInquiriesView() {
  const {
    inquiries,
    updateInquiryStatus,
    addInquiryReply,
    deleteInquiry,
  } = useTravelStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");

  const [activeInquiry, setActiveInquiry] = useState<TravelInquiry | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Summary counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const reviewingCount = inquiries.filter((i) => i.status === "Reviewing").length;
  const inProgressCount = inquiries.filter(
    (i) => i.status === "In Progress" || i.status === "Replied",
  ).length;
  const completedCount = inquiries.filter(
    (i) => i.status === "Completed" || i.status === "Confirmed",
  ).length;

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      inq.customerName.toLowerCase().includes(q) ||
      inq.customerEmail.toLowerCase().includes(q) ||
      inq.customerPhone.toLowerCase().includes(q) ||
      (inq.packageName && inq.packageName.toLowerCase().includes(q)) ||
      (inq.destination && inq.destination.toLowerCase().includes(q)) ||
      inq.referenceNumber.toLowerCase().includes(q) ||
      (inq.additionalRequirements && inq.additionalRequirements.toLowerCase().includes(q));

    const matchesType =
      typeFilter === "ALL" ||
      inq.inquiryType.toLowerCase().includes(typeFilter.toLowerCase()) ||
      (typeFilter === "General Inquiry" &&
        !inq.inquiryType.includes("Tour") &&
        !inq.inquiryType.includes("Visa") &&
        !inq.inquiryType.includes("Flight") &&
        !inq.inquiryType.includes("Import"));

    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;

    let matchesDate = true;
    if (dateFilter === "TODAY") {
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      matchesDate = inq.submittedDate.includes(today);
    }

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const handleView = (inq: TravelInquiry) => {
    setActiveInquiry(inq);
    setInquiryModalOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSendReply = (
    id: string,
    replyData: {
      sender: string;
      senderEmail: string;
      recipientEmail: string;
      subject: string;
      message: string;
    },
  ) => {
    const newReply = addInquiryReply(id, replyData);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry((prev) => {
        if (!prev) return null;
        const history = prev.replyHistory || [];
        return {
          ...prev,
          status: "Replied",
          replyHistory: [...history, newReply],
        };
      });
    }
  };

  const handleDelete = (id: string) => {
    const target = inquiries.find((i) => i.id === id);
    if (!target) return;
    deleteInquiry(id);
    toast.success(`Inquiry #${target.referenceNumber} has been deleted.`);
  };

  const getTypeBadge = (type: string) => {
    if (type.includes("Inbound")) {
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-[11px] gap-1">
          <Palmtree className="size-3 text-emerald-600" />
          Inbound Tour
        </Badge>
      );
    }
    if (type.includes("Outbound")) {
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold text-[11px] gap-1">
          <Globe2 className="size-3 text-blue-600" />
          Outbound Tour
        </Badge>
      );
    }
    if (type.includes("Flight")) {
      return (
        <Badge className="bg-sky-50 text-sky-700 border-sky-200 font-semibold text-[11px] gap-1">
          <Plane className="size-3 text-sky-600" />
          Flight Tickets
        </Badge>
      );
    }
    if (type.includes("Visa")) {
      return (
        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold text-[11px] gap-1">
          <Stamp className="size-3 text-indigo-600" />
          Visa Service
        </Badge>
      );
    }
    if (type.includes("Import") || type.includes("Export") || type.includes("Trading")) {
      return (
        <Badge className="bg-amber-50 text-amber-800 border-amber-200 font-semibold text-[11px] gap-1">
          <Package className="size-3 text-amber-600" />
          Import &amp; Trade
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-semibold text-[11px] gap-1">
        <Briefcase className="size-3 text-purple-600" />
        {type || "General Inquiry"}
      </Badge>
    );
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return <Badge className="bg-brand-red text-white text-[11px] font-bold">New</Badge>;
      case "Reviewing":
        return <Badge className="bg-amber-500 text-white text-[11px] font-bold">Reviewing</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-600 text-white text-[11px] font-bold">In Progress</Badge>;
      case "Replied":
        return <Badge className="bg-sky-600 text-white text-[11px] font-bold">Replied</Badge>;
      case "Completed":
      case "Confirmed":
        return <Badge className="bg-emerald-600 text-white text-[11px] font-bold">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-slate-400 text-white text-[11px] font-bold">Cancelled</Badge>;
      default:
        return <Badge className="bg-slate-600 text-white text-[11px] font-bold">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-navy dark:text-foreground">
              Inquiries Management
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900">
              <Inbox className="size-3.5" />
              Central Inquiries Desk
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Centralized hub for all customer inquiries submitted across Miracle International (Tours, Flights, Visa, Trade &amp; Business).
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <AdminStatCard
          label="Total Inquiries"
          value={String(totalCount)}
          icon={Inbox}
          hint="All customer submissions"
          accentColor="blue"
        />
        <AdminStatCard
          label="New Requests"
          value={String(newCount)}
          icon={Clock}
          hint={newCount > 0 ? "Requires immediate response" : "No pending new requests"}
          highlight={newCount > 0}
          accentColor={newCount > 0 ? "red" : "navy"}
        />
        <AdminStatCard
          label="Under Review"
          value={String(reviewingCount)}
          icon={SlidersHorizontal}
          hint="Being quoted / analyzed"
          accentColor="blue"
        />
        <AdminStatCard
          label="In Progress &amp; Replied"
          value={String(inProgressCount)}
          icon={Reply}
          hint="Customer communication logged"
          accentColor="navy"
        />
        <AdminStatCard
          label="Completed"
          value={String(completedCount)}
          icon={CheckCircle2}
          hint="Finalized customer requests"
          accentColor="blue"
        />
      </div>

      {/* Filter & Search Card */}
      <Card className="rounded-2xl border-border/70 shadow-xs bg-white">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-navy">
                Customer Inquiries List
              </CardTitle>
              <Badge className="bg-brand-blue/10 text-brand-blue text-xs font-bold">
                {filteredInquiries.length} of {totalCount}
              </Badge>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, ref, package..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-10 w-[160px] text-xs bg-slate-50 border-slate-200 rounded-xl font-medium">
                  <SelectValue placeholder="All Inquiries" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {INQUIRY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10 w-[140px] text-xs bg-slate-50 border-slate-200 rounded-xl font-medium">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="h-10 w-[120px] text-xs bg-slate-50 border-slate-200 rounded-xl font-medium">
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="ALL">All Time</SelectItem>
                  <SelectItem value="TODAY">Today</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 border-y border-slate-200">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700 py-3.5 pl-6">
                    Ref / Date
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Customer
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Inquiry Type
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Service / Destination
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Party &amp; Date
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-700 text-right pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-44 text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                        <Inbox className="size-10 text-slate-300" />
                        <p className="text-sm font-semibold text-ink">No customer inquiries found</p>
                        <p className="text-xs">
                          {inquiries.length === 0
                            ? "Customer inquiries submitted through the public website will appear here in real-time."
                            : "No inquiries matched your search or active filter criteria."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((inq) => (
                    <TableRow
                      key={inq.id}
                      className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 cursor-pointer"
                      onClick={() => handleView(inq)}
                    >
                      {/* Ref & Submitted Date */}
                      <TableCell className="pl-6 py-4">
                        <div className="font-mono text-xs font-bold text-ink">
                          #{inq.referenceNumber}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="size-3" />
                          {inq.submittedDate}
                        </div>
                      </TableCell>

                      {/* Customer Info */}
                      <TableCell>
                        <div className="font-bold text-xs text-navy">
                          {inq.customerName}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Mail className="size-3 text-brand-blue" />
                          <span className="truncate max-w-[170px]">{inq.customerEmail}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="size-3 text-slate-400" />
                          <span>{inq.customerPhone}</span>
                        </div>
                      </TableCell>

                      {/* Inquiry Type */}
                      <TableCell>{getTypeBadge(inq.inquiryType)}</TableCell>

                      {/* Package / Destination */}
                      <TableCell>
                        <div className="font-semibold text-xs text-ink line-clamp-1 max-w-[200px]">
                          {inq.packageName || inq.destination || "Custom Request"}
                        </div>
                        {inq.destination && inq.destination !== inq.packageName ? (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1 max-w-[200px]">
                            <MapPin className="size-3 text-sky-500 shrink-0" />
                            <span>{inq.destination}</span>
                          </div>
                        ) : null}
                      </TableCell>

                      {/* Schedule & Travelers */}
                      <TableCell>
                        <div className="text-xs text-slate-700 flex items-center gap-1 font-medium">
                          <Calendar className="size-3 text-brand-blue" />
                          {inq.travelDate || "Flexible"}
                        </div>
                        {inq.travelers ? (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Users className="size-3" />
                            <span>{inq.travelers} Pax</span>
                          </div>
                        ) : null}
                      </TableCell>

                      {/* Status */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={inq.status}
                          onValueChange={(val) => handleStatusChange(inq.id, val as InquiryStatus)}
                        >
                          <SelectTrigger className="h-8 w-28 text-[11px] font-bold bg-white border-slate-200 rounded-lg shadow-2xs">
                            <SelectValue>{getStatusBadge(inq.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200">
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Reviewing">Reviewing</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Replied">Replied</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(inq)}
                            className="h-8 px-2.5 text-xs text-brand-blue hover:bg-brand-blue/10 rounded-lg font-bold gap-1"
                          >
                            <Eye className="size-3.5" />
                            View
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border-slate-200 text-xs">
                              <DropdownMenuLabel>Manage Inquiry</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleView(inq)}>
                                <Eye className="size-3.5 mr-2" /> View Details &amp; Reply
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(inq.id)}
                                className="text-brand-red focus:text-brand-red"
                              >
                                <Trash2 className="size-3.5 mr-2" /> Delete Inquiry
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Full Inquiry Details & Email Modal */}
      <AdminInquiryDetailsDialog
        inquiry={activeInquiry}
        open={inquiryModalOpen}
        onOpenChange={setInquiryModalOpen}
        onUpdateStatus={handleStatusChange}
        onSendReply={handleSendReply}
      />
    </div>
  );
}
