"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  Eye,
  Filter,
  Inbox,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Palmtree,
  Phone,
  Plane,
  Reply,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

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
import type {
  InquiryStatus,
  InquiryType,
  TravelInquiry,
} from "./types";

interface TravelInquiriesTableProps {
  inquiries: TravelInquiry[];
  onViewInquiry: (inquiry: TravelInquiry) => void;
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
  onDeleteInquiry: (id: string) => void;
}

export function TravelInquiriesTable({
  inquiries,
  onViewInquiry,
  onUpdateStatus,
  onDeleteInquiry,
}: TravelInquiriesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      inq.customerName.toLowerCase().includes(q) ||
      inq.customerEmail.toLowerCase().includes(q) ||
      inq.customerPhone.toLowerCase().includes(q) ||
      inq.packageName.toLowerCase().includes(q) ||
      inq.destination.toLowerCase().includes(q) ||
      inq.referenceNumber.toLowerCase().includes(q);

    const matchesType =
      typeFilter === "ALL" || inq.inquiryType === typeFilter;

    const matchesStatus =
      statusFilter === "ALL" || inq.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      inq.submittedDate.includes(dateFilter) ||
      inq.travelDate.includes(dateFilter);

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return <Badge className="bg-brand-red text-white text-[11px]">New</Badge>;
      case "Reviewing":
        return <Badge className="bg-amber-600 text-white text-[11px]">Reviewing</Badge>;
      case "Replied":
        return <Badge className="bg-blue-600 text-white text-[11px]">Replied</Badge>;
      case "Confirmed":
        return <Badge className="bg-emerald-600 text-white text-[11px]">Confirmed</Badge>;
      case "Rescheduled":
        return <Badge className="bg-purple-600 text-white text-[11px]">Rescheduled</Badge>;
      case "Completed":
        return <Badge className="bg-slate-700 text-white text-[11px]">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-slate-400 text-white text-[11px]">Cancelled</Badge>;
    }
  };

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              Customer Travel Inquiries
            </CardTitle>
            <span className="rounded-full bg-brand-blue-light px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20">
              {filteredInquiries.length} total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Central inquiry hub for customer tour requests, custom itinerary inquiries, and email correspondence.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-52">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search customer, email, package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 pl-8 text-xs bg-muted/30 focus-visible:bg-card"
            />
          </div>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-muted/30">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Inquiries</SelectItem>
              <SelectItem value="Inbound Tour">Inbound Tours</SelectItem>
              <SelectItem value="Outbound Tour">Outbound Tours</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-muted/30">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Reviewing">Reviewing</SelectItem>
              <SelectItem value="Replied">Replied</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Rescheduled">Rescheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-8.5 w-[130px] text-xs bg-muted/30"
          />

          {dateFilter || searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setTypeFilter("ALL");
                setStatusFilter("ALL");
                setDateFilter("");
              }}
              className="h-8.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset Filters
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground pl-6">
                  Customer
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Inquiry Type
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Package / Destination
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Travel Date
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Travelers
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Submitted
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-44 text-center">
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
                        <Inbox className="size-5 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-navy dark:text-foreground">
                        No travel inquiries available yet.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                        {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL" || dateFilter
                          ? "No inquiries match the current filter criteria."
                          : "Customer inquiries submitted through public Inbound and Outbound tour pages will appear here in real time."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inq) => (
                  <TableRow key={inq.id} className="group transition-colors hover:bg-muted/30">
                    {/* Customer */}
                    <TableCell className="pl-6 py-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-navy dark:text-foreground">
                          <User className="size-3 text-brand-blue" />
                          <span>{inq.customerName}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="size-2.5" />
                          {inq.customerEmail}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                          <Phone className="size-2.5" />
                          {inq.customerPhone}
                        </p>
                      </div>
                    </TableCell>

                    {/* Inquiry Type */}
                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className={
                          inq.travelType === "Inbound"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                            : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]"
                        }
                      >
                        {inq.inquiryType}
                      </Badge>
                    </TableCell>

                    {/* Package / Destination */}
                    <TableCell className="py-3 text-xs">
                      <p className="font-semibold text-foreground line-clamp-1">
                        {inq.packageName || "Custom Tour"}
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-2.5 text-brand-blue" />
                        {inq.destination}
                      </p>
                    </TableCell>

                    {/* Travel Date */}
                    <TableCell className="py-3 text-xs text-muted-foreground font-mono">
                      {inq.travelDate || "Flexible"}
                    </TableCell>

                    {/* Travelers */}
                    <TableCell className="py-3 text-xs font-semibold text-navy dark:text-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="size-3 text-muted-foreground" />
                        {inq.travelers}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3">
                      {getStatusBadge(inq.status)}
                    </TableCell>

                    {/* Submitted Date */}
                    <TableCell className="py-3 text-xs text-muted-foreground font-mono">
                      {inq.submittedDate}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewInquiry(inq)}
                          className="h-8 text-xs font-medium gap-1 border-border/80 hover:border-brand-blue hover:bg-brand-blue-light/50 hover:text-brand-blue"
                        >
                          <Eye className="size-3.5" />
                          View
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="size-8 p-0 text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "New")}>
                              Mark as New
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "Reviewing")}>
                              Mark as Reviewing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "Replied")}>
                              Mark as Replied
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "Confirmed")}>
                              Mark as Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "Completed")}>
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(inq.id, "Cancelled")}>
                              Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onDeleteInquiry(inq.id)}
                              className="text-brand-red focus:text-brand-red"
                            >
                              <Trash2 className="size-3.5 mr-1" />
                              Delete Inquiry
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

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/60 px-6 py-3 bg-muted/10 text-xs text-muted-foreground">
          <span>
            Showing <strong>{filteredInquiries.length}</strong> inquiries
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
