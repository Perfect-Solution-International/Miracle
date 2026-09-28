"use client";

import {
  Edit3,
  Eye,
  MoreHorizontal,
  Package,
  PlusCircle,
  Search,
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

interface TravelPackagesTableProps {
  packages: TravelPackage[];
  onViewPackage: (pkg: TravelPackage) => void;
  onEditPackage: (pkg: TravelPackage) => void;
  onDeletePackage: (id: string) => void;
  onAddPackage: () => void;
}

export function TravelPackagesTable({
  packages,
  onViewPackage,
  onEditPackage,
  onDeletePackage,
  onAddPackage,
}: TravelPackagesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "ALL" || pkg.travelType === typeFilter;
    const matchesStatus = statusFilter === "ALL" || pkg.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              Travel Packages
            </CardTitle>
            <span className="rounded-full bg-brand-blue-light px-2 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20">
              {filteredPackages.length} total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Published, draft, and inbound/outbound travel itineraries
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
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
            <SelectTrigger className="h-8.5 w-[130px] text-xs bg-muted/30">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={onAddPackage}
            className="h-8.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs gap-1.5 font-medium"
          >
            <PlusCircle className="size-3.5" />
            Add Package
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground pl-6">
                  Package
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Destination
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Travel Type
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price
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
              {filteredPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-44 text-center">
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
                        <Package className="size-5 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-semibold text-navy dark:text-foreground">
                        No travel packages available yet.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mt-0.5">
                        {searchQuery || typeFilter !== "ALL" || statusFilter !== "ALL"
                          ? "No packages match the current filter criteria."
                          : "Create your first travel & tourism itinerary using the '+ Add Travel Package' button."}
                      </p>
                      {!searchQuery && typeFilter === "ALL" && statusFilter === "ALL" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onAddPackage}
                          className="mt-3.5 h-8 text-xs gap-1.5 text-brand-blue border-brand-blue/40 hover:bg-brand-blue/5"
                        >
                          <PlusCircle className="size-3.5" />
                          Create First Package
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPackages.map((pkg) => (
                  <TableRow
                    key={pkg.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Package */}
                    <TableCell className="pl-6 py-3">
                      <div className="flex items-center gap-3">
                        {pkg.coverImage || (pkg.images && pkg.images.length > 0) ? (
                          <div className="size-10 rounded-lg overflow-hidden shrink-0 border border-border/70 bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={pkg.coverImage || pkg.images[0]}
                              alt={pkg.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          </div>
                        ) : null}
                        <div className="space-y-0.5 max-w-xs">
                          <p className="font-semibold text-xs text-navy dark:text-foreground line-clamp-1">
                            {pkg.name}
                          </p>
                          {pkg.shortDescription ? (
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {pkg.shortDescription}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>

                    {/* Destination */}
                    <TableCell className="py-3 text-xs text-foreground">
                      <div>
                        <span>{pkg.destination}</span>
                        {pkg.country ? (
                          <span className="block text-[11px] text-muted-foreground">
                            {pkg.country}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>

                    {/* Travel Type */}
                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className={
                          pkg.travelType === "Inbound"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                            : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]"
                        }
                      >
                        {pkg.travelType}
                      </Badge>
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="py-3 text-xs text-muted-foreground font-mono">
                      {pkg.duration}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-3 text-xs font-semibold text-navy dark:text-foreground">
                      {pkg.price != null ? (
                        <span>
                          <span className="text-[10px] text-muted-foreground mr-1">
                            {pkg.currency === "LKR" ? "LKR" : "USD"}
                          </span>
                          {pkg.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground font-normal">—</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3">
                      <Badge
                        className={
                          pkg.status === "Active"
                            ? "bg-emerald-600 text-white text-[11px]"
                            : pkg.status === "Draft"
                              ? "bg-amber-600 text-white text-[11px]"
                              : "bg-muted-foreground text-white text-[11px]"
                        }
                      >
                        {pkg.status}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewPackage(pkg)}
                          className="h-8 text-xs font-medium gap-1 border-border/80 hover:border-brand-blue hover:bg-brand-blue-light/50 hover:text-brand-blue"
                        >
                          <Eye className="size-3.5" />
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditPackage(pkg)}
                          className="h-8 text-xs font-medium gap-1 hover:text-brand-blue"
                        >
                          <Edit3 className="size-3.5" />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeletePackage(pkg.id)}
                          className="h-8 text-xs font-medium gap-1 hover:text-brand-red text-muted-foreground"
                          aria-label="Delete package"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
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
            Showing <strong>{filteredPackages.length}</strong> packages
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
