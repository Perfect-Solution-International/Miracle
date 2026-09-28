import {
  ArrowUpDown,
  CheckCircle2,
  ClipboardList,
  Clock,
  Eye,
  Filter,
  Inbox,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { AdminStatusBadge } from "./status-badge";
import type { RequestStatus, ServiceRequest, ServiceType } from "./types";

interface RecentRequestsTableProps {
  requests: ServiceRequest[];
  onViewRequest: (request: ServiceRequest) => void;
  onUpdateStatus?: (id: string, status: RequestStatus) => void;
  selectedServiceFilter?: ServiceType | "ALL";
  onFilterServiceChange?: (service: ServiceType | "ALL") => void;
}

const ALL_SERVICES: ServiceType[] = [
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

const ALL_STATUSES: RequestStatus[] = [
  "Pending",
  "Reviewing",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rescheduled",
];

export function RecentRequestsTable({
  requests,
  onViewRequest,
  onUpdateStatus,
  selectedServiceFilter = "ALL",
  onFilterServiceChange,
}: RecentRequestsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showAll, setShowAll] = useState(false);

  // Filtering
  const filteredRequests = requests.filter((req) => {
    // Search query matches customer name, email, ref number, request type, or service
    const matchesSearch =
      searchQuery.trim() === "" ||
      req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.service.toLowerCase().includes(searchQuery.toLowerCase());

    // Service filter
    const matchesService =
      selectedServiceFilter === "ALL" || req.service === selectedServiceFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "ALL" || req.status === statusFilter;

    return matchesSearch && matchesService && matchesStatus;
  });

  const displayedRequests = showAll
    ? filteredRequests
    : filteredRequests.slice(0, 6);

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              Recent Requests
            </CardTitle>
            <span className="rounded-full bg-brand-blue-light px-2 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20">
              {filteredRequests.length} total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational client inquiries, bookings, visas, and trade requirements
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 pl-8 text-xs bg-muted/30 focus-visible:bg-card"
            />
          </div>

          <Select
            value={selectedServiceFilter}
            onValueChange={(val) => onFilterServiceChange?.(val as ServiceType | "ALL")}
          >
            <SelectTrigger className="h-8.5 w-[140px] text-xs bg-muted/30">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Services</SelectItem>
              {ALL_SERVICES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8.5 w-[125px] text-xs bg-muted/30">
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
                  Request Type
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Service
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-44 text-center">
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
                        <Inbox className="size-5 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-navy dark:text-foreground">
                        No requests yet
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                        {searchQuery || selectedServiceFilter !== "ALL" || statusFilter !== "ALL"
                          ? "No matching requests found for the selected filters."
                          : "Customer inquiries, visa applications, and trade requests will appear here."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayedRequests.map((req) => (
                  <TableRow
                    key={req.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Customer */}
                    <TableCell className="pl-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 rounded-lg bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30 font-semibold text-xs">
                          <AvatarFallback className="rounded-lg">
                            {getInitials(req.customerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-navy dark:text-foreground">
                            {req.customerName}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {req.customerCompany || req.customerEmail}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Request Type */}
                    <TableCell className="py-3">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-foreground">
                          {req.requestType}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {req.referenceNumber}
                        </p>
                      </div>
                    </TableCell>

                    {/* Service */}
                    <TableCell className="py-3">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border/50">
                        {req.service}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-3 text-xs text-muted-foreground">
                      {req.date}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3">
                      <AdminStatusBadge status={req.status} />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewRequest(req)}
                          className="h-8 text-xs font-medium gap-1 border-border/80 hover:border-brand-blue hover:bg-brand-blue-light/50 hover:text-brand-blue dark:hover:bg-brand-blue/20"
                        >
                          <Eye className="size-3.5" />
                          View
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              aria-label="More actions"
                            >
                              <MoreHorizontal className="size-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel className="text-xs">
                              Quick Status Change
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {ALL_STATUSES.map((st) => (
                              <DropdownMenuItem
                                key={st}
                                onClick={() => onUpdateStatus?.(req.id, st)}
                                className="text-xs gap-2"
                              >
                                <span
                                  className={
                                    req.status === st ? "font-bold text-brand-blue" : ""
                                  }
                                >
                                  {req.status === st ? "✓ " : ""}
                                  {st}
                                </span>
                              </DropdownMenuItem>
                            ))}
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

        {/* View All Button Footer */}
        <div className="flex items-center justify-between border-t border-border/60 px-6 py-3 bg-muted/10">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>{Math.min(displayedRequests.length, filteredRequests.length)}</strong> of{" "}
            <strong>{filteredRequests.length}</strong> requests
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            {showAll ? "Show Less" : "View All Requests"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
