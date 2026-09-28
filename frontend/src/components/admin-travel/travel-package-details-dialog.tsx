"use client";

import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Globe2,
  HelpCircle,
  Image as ImageIcon,
  MapPin,
  Palmtree,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TravelPackage } from "./types";

interface TravelPackageDetailsDialogProps {
  packageItem: TravelPackage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (pkg: TravelPackage) => void;
}

export function TravelPackageDetailsDialog({
  packageItem,
  open,
  onOpenChange,
  onEdit,
}: TravelPackageDetailsDialogProps) {
  if (!packageItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-2xl shadow-xl">
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 dark:from-slate-900/60 dark:via-card dark:to-slate-900/30">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={
                  packageItem.travelType === "Inbound"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400"
                }
              >
                {packageItem.travelType} Tour
              </Badge>

              <Badge
                className={
                  packageItem.status === "Active"
                    ? "bg-emerald-600 text-white"
                    : packageItem.status === "Draft"
                      ? "bg-amber-600 text-white"
                      : "bg-muted-foreground text-white"
                }
              >
                {packageItem.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2.5">
              {packageItem.price != null ? (
                <span className="text-xs font-bold bg-brand-blue-light/70 dark:bg-brand-blue/20 text-brand-blue dark:text-sky-300 px-2.5 py-1 rounded-md border border-brand-blue/30">
                  {packageItem.currency === "LKR" ? "LKR" : "USD"}{" "}
                  {packageItem.price.toLocaleString()}
                </span>
              ) : null}
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="size-3" />
                {packageItem.duration}
              </span>
            </div>
          </div>

          <DialogTitle className="text-xl font-bold text-navy dark:text-foreground mt-2">
            {packageItem.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="size-3 text-brand-blue shrink-0" />
            <span>
              {packageItem.destination}
              {packageItem.country ? ` • ${packageItem.country}` : ""}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {packageItem.shortDescription ? (
            <div className="p-3.5 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-xs font-medium text-navy dark:text-foreground">
              {packageItem.shortDescription}
            </div>
          ) : null}

          {/* Highlights */}
          {packageItem.highlights && packageItem.highlights.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Key Highlights ({packageItem.highlights.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {packageItem.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 text-xs font-medium"
                  >
                    <Star className="size-3 text-amber-500 fill-amber-500 shrink-0" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {packageItem.description ? (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Overview &amp; Description
              </h4>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                {packageItem.description}
              </p>
            </div>
          ) : null}

          {/* Included Features */}
          {packageItem.includedItems && packageItem.includedItems.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Included Features &amp; Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {packageItem.includedItems.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium"
                  >
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Grid of logistics and services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {packageItem.accommodation ? (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1">
                <span className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-brand-blue" />
                  Accommodation
                </span>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {packageItem.accommodation}
                </p>
              </div>
            ) : null}

            {packageItem.transportation ? (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1">
                <span className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <Truck className="size-3.5 text-brand-blue" />
                  Transportation
                </span>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {packageItem.transportation}
                </p>
              </div>
            ) : null}

            {packageItem.whatToExpect ? (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1 sm:col-span-2">
                <span className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <Compass className="size-3.5 text-brand-blue" />
                  What to Expect
                </span>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {packageItem.whatToExpect}
                </p>
              </div>
            ) : null}
          </div>

          {/* Visa & Entry requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {packageItem.entryRequirements ? (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1">
                <span className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-brand-blue" />
                  Entry Requirements
                </span>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {packageItem.entryRequirements}
                </p>
              </div>
            ) : null}

            {packageItem.visaInformation ? (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1">
                <span className="text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-brand-blue" />
                  Visa Information
                </span>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {packageItem.visaInformation}
                </p>
              </div>
            ) : null}
          </div>

          {/* Image Previews */}
          {packageItem.images && packageItem.images.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Gallery Photos ({packageItem.images.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {packageItem.images.map((img, i) => {
                  const isCover = packageItem.coverImage === img || (!packageItem.coverImage && i === 0);
                  return (
                    <div
                      key={i}
                      className={`relative rounded-lg overflow-hidden border ${
                        isCover ? "border-brand-blue ring-1 ring-brand-blue" : "border-border/70"
                      } aspect-video bg-muted`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`Package image ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=60";
                        }}
                      />
                      {isCover ? (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-brand-blue text-white text-[9px] font-bold">
                          Cover
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter className="p-4 px-6 border-t border-border/70 bg-muted/20 gap-2 sm:gap-0">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onEdit ? (
            <Button
              size="sm"
              onClick={() => {
                onOpenChange(false);
                onEdit(packageItem);
              }}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
            >
              Edit Package
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
