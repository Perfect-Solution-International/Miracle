"use client";

import {
  Calendar,
  Clock,
  Eye,
  Inbox,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { TravelRequest, TravelRequestStatus, TravelType } from "./types";

interface TravelBookingsTableProps {
  bookings: TravelRequest[];
  onViewBooking: (request: TravelRequest) => void;
}

const ALL_STATUSES: TravelRequestStatus[] = [
  "Pending",
  "Reviewing",
  "Confirmed",
  "Rescheduled",
  "Completed",
  "Cancelled",
];

export function TravelBookingsTable({
  bookings,
  onViewBooking,
}: TravelBookingsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "ALL" || b.travelType === typeFilter;
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  function getStatusBadge(status: TravelRequestStatus) {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400">
            Pending
          </Badge>
        );
      case "Reviewing":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400">
            Reviewing
          </Badge>
        );
      case "Confirmed":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400">
            Confirmed
          </Badge>
        );
      case "Rescheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400">
            Rescheduled
          </Badge>
        );
      case "Completed":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300">
            Completed
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-zinc-100 text-zinc-500 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              Bookings &amp; Travel Requests
            </CardTitle>
            <span className="rounded-full bg-brand-blue-light px-2 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20">
              {filteredBookings.length} total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Customer inquiries, customized holiday packages, and tour reservations
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 pl-8 text-xs bg-muted/30 focus-visible:bg-card"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-muted/30">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="Inbound">Inbound</SelectItem>
              <SelectItem value="Outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8.5 w-[135px] text-xs bg-muted/30">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {ALL_STATUSES.map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  Package / Travel Type
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
                  Submitted Date
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-44 text-center">
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
                        <Inbox className="size-5 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-navy dark:text-foreground">
                        No travel requests yet.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                        {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL"
                          ? "No booking requests match the current filter criteria."
                          : "New customer travel inquiries and holiday bookings will appear here."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((b) => (
                  <TableRow
                    key={b.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Customer */}
                    <TableCell className="pl-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 rounded-lg bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30 font-semibold text-xs">
                          <AvatarFallback className="rounded-lg">
                            {getInitials(b.customerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-navy dark:text-foreground">
                            {b.customerName}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {b.customerEmail}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Package / Type */}
                    <TableCell className="py-3">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-foreground line-clamp-1">
                          {b.packageName}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {b.referenceNumber}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-[10px] text-brand-blue font-medium">
                            {b.travelType}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Travel Date */}
                    <TableCell className="py-3 text-xs text-muted-foreground font-mono">
                      {b.travelDate}
                    </TableCell>

                    {/* Travelers */}
                    <TableCell className="py-3 text-xs text-foreground">
                      {b.travelers}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3">
                      {getStatusBadge(b.status)}
                    </TableCell>

                    {/* Submitted Date */}
                    <TableCell className="py-3 text-xs text-muted-foreground">
                      {b.submittedDate}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-3 pr-6 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewBooking(b)}
                        className="h-8 text-xs font-medium gap-1 border-border/80 hover:border-brand-blue hover:bg-brand-blue-light/50 hover:text-brand-blue"
                      >
                        <Eye className="size-3.5" />
                        View
                      </Button>
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
            Showing <strong>{filteredBookings.length}</strong> booking requests
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
