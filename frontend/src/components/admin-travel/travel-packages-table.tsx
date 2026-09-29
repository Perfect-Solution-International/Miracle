"use client";

import {
  ArrowUpDown,
  CheckCircle2,
  Edit3,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  Power,
  PowerOff,
  Search,
  SlidersHorizontal,
  Trash2,
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
import type { PackageStatus, TravelPackage, TravelType } from "./types";
import { getPackageCoverImage } from "@/lib/travel/package-image-helper";

interface TravelPackagesTableProps {
  packages: TravelPackage[];
  travelType?: TravelType;
  onViewPackage: (pkg: TravelPackage) => void;
  onEditPackage: (pkg: TravelPackage) => void;
  onDeletePackage: (id: string) => void;
  onAddPackage: () => void;
  onToggleStatus?: (pkg: TravelPackage) => void;
  title?: string;
  description?: string;
  addLabel?: string;
}

export function TravelPackagesTable({
  packages,
  travelType = "Inbound",
  onViewPackage,
  onEditPackage,
  onDeletePackage,
  onAddPackage,
  onToggleStatus,
  title = "Inbound Tour Packages",
  description = "Manage package itineraries, pricing, offers, and publishing status.",
  addLabel = "+ Add Package",
}: TravelPackagesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("latest");

  const filteredPackages = packages
    .filter((pkg) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.country && pkg.country.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "ALL" || pkg.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price_asc") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price_desc") {
        return (b.price || 0) - (a.price || 0);
      }
      // Default latest updated / created
      const dateA = a.updatedAt || a.lastUpdated || a.createdAt || "";
      const dateB = b.updatedAt || b.lastUpdated || b.createdAt || "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  return (
    <Card className="rounded-2xl border-border/70 shadow-xs bg-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2.5">
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              {title}
            </CardTitle>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20">
              {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>

        {/* Filter, Search & Add Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 pl-8 text-xs bg-muted/30 focus-visible:bg-card"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-muted/30 font-medium">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8.5 w-[140px] text-xs bg-muted/30 font-medium">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Updated</SelectItem>
              <SelectItem value="name_asc">Name (A–Z)</SelectItem>
              <SelectItem value="price_asc">Price (Low to High)</SelectItem>
              <SelectItem value="price_desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={onAddPackage}
            className="h-8.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs gap-1.5 font-semibold shadow-xs rounded-xl"
          >
            <Plus className="size-3.5" />
            {addLabel}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground pl-6 w-[70px]">
                  Cover
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Package Name
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Destination
                </TableHead>
                {travelType === "Outbound" ? (
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Country
                  </TableHead>
                ) : null}
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Currency
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Last Updated
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={travelType === "Outbound" ? 10 : 9}
                    className="h-44 text-center"
                  >
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
                        <Package className="size-5 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-navy dark:text-foreground">
                        No {travelType.toLowerCase()} tour packages found.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                        {searchQuery || statusFilter !== "ALL"
                          ? "No packages match the current filter criteria."
                          : `Create your first ${travelType.toLowerCase()} tour itinerary using the "${addLabel}" button.`}
                      </p>
                      {!searchQuery && statusFilter === "ALL" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onAddPackage}
                          className="mt-3.5 h-8 text-xs gap-1.5 text-brand-blue border-brand-blue/40 hover:bg-brand-blue/5"
                        >
                          <Plus className="size-3.5" />
                          {addLabel}
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPackages.map((pkg) => {
                  const coverUrl = pkg.coverImage || pkg.images?.[0] || getPackageCoverImage(pkg);
                  const lastUpdateStr = pkg.updatedAt || pkg.lastUpdated || pkg.createdAt || "—";
                  const isActive = pkg.status === "Active";

                  return (
                    <TableRow
                      key={pkg.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* Cover Image */}
                      <TableCell className="pl-6 py-3">
                        <div className="size-11 rounded-lg overflow-hidden shrink-0 border border-border/70 bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={coverUrl}
                            alt={pkg.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      </TableCell>

                      {/* Package Name */}
                      <TableCell className="py-3 max-w-[220px]">
                        <div className="space-y-0.5">
                          <p className="font-bold text-xs text-navy dark:text-foreground line-clamp-1 group-hover:text-brand-blue transition-colors">
                            {pkg.name}
                          </p>
                          {pkg.shortDescription ? (
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {pkg.shortDescription}
                            </p>
                          ) : null}
                        </div>
                      </TableCell>

                      {/* Destination */}
                      <TableCell className="py-3 text-xs text-foreground font-medium">
                        {pkg.destination}
                      </TableCell>

                      {/* Country (for Outbound) */}
                      {travelType === "Outbound" ? (
                        <TableCell className="py-3 text-xs text-muted-foreground">
                          {pkg.country || "—"}
                        </TableCell>
                      ) : null}

                      {/* Duration */}
                      <TableCell className="py-3 text-xs text-muted-foreground font-medium">
                        {pkg.duration}
                      </TableCell>

                      {/* Price */}
                      <TableCell className="py-3 text-xs font-bold text-navy dark:text-foreground">
                        {pkg.priceOnRequest ? (
                          <span className="text-[11px] font-medium text-muted-foreground">
                            On Request
                          </span>
                        ) : pkg.price != null ? (
                          <span>{pkg.price.toLocaleString()}</span>
                        ) : (
                          <span className="text-muted-foreground font-normal">—</span>
                        )}
                      </TableCell>

                      {/* Currency */}
                      <TableCell className="py-3 text-xs font-semibold text-muted-foreground">
                        {pkg.currency || (travelType === "Inbound" ? "LKR" : "USD")}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3">
                        <Badge
                          className={
                            pkg.status === "Active"
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                              : pkg.status === "Draft"
                                ? "bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold"
                                : "bg-slate-600 hover:bg-slate-700 text-white text-[11px] font-semibold"
                          }
                        >
                          {pkg.status}
                        </Badge>
                      </TableCell>

                      {/* Last Updated */}
                      <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {lastUpdateStr}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Quick Toggle Active / Inactive */}
                          {onToggleStatus ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onToggleStatus(pkg)}
                              title={isActive ? "Deactivate Package" : "Activate Package"}
                              className={`size-7.5 p-0 ${
                                isActive
                                  ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                  : "text-muted-foreground hover:text-emerald-600 hover:bg-muted"
                              }`}
                            >
                              {isActive ? (
                                <Power className="size-3.5" />
                              ) : (
                                <PowerOff className="size-3.5" />
                              )}
                            </Button>
                          ) : null}

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewPackage(pkg)}
                            className="size-7.5 p-0 text-muted-foreground hover:text-brand-blue"
                            title="View Package"
                          >
                            <Eye className="size-3.5" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEditPackage(pkg)}
                            className="size-7.5 p-0 text-muted-foreground hover:text-brand-blue"
                            title="Edit Package"
                          >
                            <Edit3 className="size-3.5" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeletePackage(pkg.id)}
                            className="size-7.5 p-0 text-muted-foreground hover:text-brand-red"
                            title="Delete Package"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/60 px-6 py-3 bg-muted/10 text-xs text-muted-foreground">
          <span>
            Showing <strong>{filteredPackages.length}</strong> of <strong>{packages.length}</strong> total packages
          </span>
          <span className="text-[11px] text-muted-foreground">
            * Only packages with status <strong>Active</strong> appear on the public travel website.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
