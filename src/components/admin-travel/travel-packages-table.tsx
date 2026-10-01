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
    <Card className="rounded-2xl border-slate-200/80 shadow-2xs bg-white/90 backdrop-blur-xs overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <CardTitle className="text-base font-bold text-navy">
              {title}
            </CardTitle>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue border border-blue-100">
              {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {description}
          </p>
        </div>

        {/* Filter, Search & Add Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
            <Input
              placeholder="Search package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 pl-8 text-xs bg-slate-50/70 border-slate-200/80 rounded-xl focus-visible:bg-white focus-visible:border-blue-500 transition-colors"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-slate-50/70 border-slate-200/80 rounded-xl font-medium">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl">
              <SelectItem value="ALL" className="text-xs">All Statuses</SelectItem>
              <SelectItem value="Active" className="text-xs">Active</SelectItem>
              <SelectItem value="Draft" className="text-xs">Draft</SelectItem>
              <SelectItem value="Inactive" className="text-xs">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8.5 w-[140px] text-xs bg-slate-50/70 border-slate-200/80 rounded-xl font-medium">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl">
              <SelectItem value="latest" className="text-xs">Latest Updated</SelectItem>
              <SelectItem value="name_asc" className="text-xs">Name (A–Z)</SelectItem>
              <SelectItem value="price_asc" className="text-xs">Price (Low to High)</SelectItem>
              <SelectItem value="price_desc" className="text-xs">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={onAddPackage}
            className="h-8.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs gap-1.5 font-semibold shadow-2xs rounded-xl"
          >
            <Plus className="size-3.5" />
            {addLabel}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/70">
              <TableRow className="hover:bg-transparent border-slate-200/80">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-6 w-[70px]">
                  Cover
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Package Name
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Destination
                </TableHead>
                {travelType === "Outbound" ? (
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Country
                  </TableHead>
                ) : null}
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Duration
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Currency
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Last Updated
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500 text-right pr-6">
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
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                      <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 mb-2.5">
                        <Package className="size-5 text-slate-400" />
                      </div>
                      <p className="text-sm font-semibold text-navy">
                        No {travelType.toLowerCase()} tour packages found.
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mt-0.5">
                        {searchQuery || statusFilter !== "ALL"
                          ? "No packages match the current filter criteria."
                          : `Create your first ${travelType.toLowerCase()} tour itinerary using the "${addLabel}" button.`}
                      </p>
                      {!searchQuery && statusFilter === "ALL" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onAddPackage}
                          className="mt-3.5 h-8 text-xs gap-1.5 text-brand-blue border-blue-200 hover:bg-blue-50/50 rounded-xl"
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
                      className="group transition-colors border-slate-100 hover:bg-slate-50/70"
                    >
                      {/* Cover Image */}
                      <TableCell className="pl-6 py-3">
                        <div className="size-11 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
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
                          <p className="font-bold text-xs text-navy line-clamp-1 group-hover:text-brand-blue transition-colors">
                            {pkg.name}
                          </p>
                          {pkg.shortDescription ? (
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {pkg.shortDescription}
                            </p>
                          ) : null}
                        </div>
                      </TableCell>

                      {/* Destination */}
                      <TableCell className="py-3 text-xs text-slate-700 font-medium">
                        {pkg.destination}
                      </TableCell>

                      {/* Country (for Outbound) */}
                      {travelType === "Outbound" ? (
                        <TableCell className="py-3 text-xs text-slate-500">
                          {pkg.country || "—"}
                        </TableCell>
                      ) : null}

                      {/* Duration */}
                      <TableCell className="py-3 text-xs text-slate-600 font-medium">
                        {pkg.duration}
                      </TableCell>

                      {/* Price */}
                      <TableCell className="py-3 text-xs font-bold text-navy">
                        {pkg.priceOnRequest ? (
                          <span className="text-[11px] font-medium text-slate-500">
                            On Request
                          </span>
                        ) : pkg.price != null ? (
                          <span>{pkg.price.toLocaleString()}</span>
                        ) : (
                          <span className="text-slate-400 font-normal">—</span>
                        )}
                      </TableCell>

                      {/* Currency */}
                      <TableCell className="py-3 text-xs font-semibold text-slate-500">
                        {pkg.currency || (travelType === "Inbound" ? "LKR" : "USD")}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3">
                        <Badge
                          variant="outline"
                          className={
                            pkg.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200/80 text-[11px] font-semibold"
                              : pkg.status === "Draft"
                                ? "bg-amber-50 text-amber-700 border-amber-200/80 text-[11px] font-semibold"
                                : "bg-slate-100 text-slate-700 border-slate-200 text-[11px] font-semibold"
                          }
                        >
                          {pkg.status}
                        </Badge>
                      </TableCell>

                      {/* Last Updated */}
                      <TableCell className="py-3 text-xs text-slate-500 whitespace-nowrap">
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
                              className={`size-7.5 p-0 rounded-lg ${
                                isActive
                                  ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                  : "text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
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
                            className="size-7.5 p-0 text-slate-400 hover:text-brand-blue rounded-lg"
                            title="View Package"
                          >
                            <Eye className="size-3.5" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEditPackage(pkg)}
                            className="size-7.5 p-0 text-slate-400 hover:text-brand-blue rounded-lg"
                            title="Edit Package"
                          >
                            <Edit3 className="size-3.5" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeletePackage(pkg.id)}
                            className="size-7.5 p-0 text-slate-400 hover:text-brand-red rounded-lg"
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
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3 bg-slate-50/40 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-700">{filteredPackages.length}</strong> of <strong className="text-slate-700">{packages.length}</strong> total packages
          </span>
          <span className="text-[11px] text-slate-400">
            * Only packages with status <strong className="text-emerald-700">Active</strong> appear on the public travel website.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
