"use client";

import {
  Calendar,
  Clock,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  Palmtree,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TravelRequest, TravelRequestStatus } from "./types";

interface TravelBookingDetailsDialogProps {
  request: TravelRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, status: TravelRequestStatus) => void;
}

const ALL_STATUSES: TravelRequestStatus[] = [
  "Pending",
  "Reviewing",
  "Confirmed",
  "Rescheduled",
  "Completed",
  "Cancelled",
];

export function TravelBookingDetailsDialog({
  request,
  open,
  onOpenChange,
  onUpdateStatus,
}: TravelBookingDetailsDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<TravelRequestStatus | null>(null);

  if (!request) return null;

  const currentStatus = selectedStatus ?? request.status;

  const handleSave = () => {
    if (selectedStatus && selectedStatus !== request.status) {
      onUpdateStatus(request.id, selectedStatus);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-muted/20">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-md dark:bg-brand-blue/20">
                {request.referenceNumber}
              </span>
              <Badge
                variant="outline"
                className={
                  request.travelType === "Inbound"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }
              >
                {request.travelType}
              </Badge>
            </div>

            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              Submitted: {request.submittedDate}
            </span>
          </div>

          <DialogTitle className="text-xl font-bold text-navy dark:text-foreground mt-2">
            {request.packageName}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Customer Travel Request &amp; Booking Management
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Customer Information Card */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <User className="size-4 text-brand-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Full Name</span>
                  <span className="font-semibold text-navy dark:text-foreground">
                    {request.customerName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Email Address</span>
                  <a
                    href={`mailto:${request.customerEmail}`}
                    className="text-brand-blue hover:underline truncate"
                  >
                    {request.customerEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Contact Number</span>
                  <a href={`tel:${request.customerPhone}`} className="text-foreground hover:underline">
                    {request.customerPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">WhatsApp Number</span>
                  <span className="text-foreground">
                    {request.whatsappNumber || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Travel &amp; Itinerary Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-brand-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Destination</span>
                  <span className="font-semibold text-foreground">{request.destination}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-brand-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Travel Date</span>
                  <span className="font-semibold text-foreground">{request.travelDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="size-4 text-brand-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Travelers</span>
                  <span className="font-semibold text-foreground">{request.travelers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Requirements / Special Notes */}
          {request.additionalRequirements ? (
            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Additional Requirements &amp; Notes
              </h4>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                {request.additionalRequirements}
              </p>
            </div>
          ) : null}

          {/* Status Update Control */}
          <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-brand-blue/10">
            <div>
              <p className="text-xs font-bold text-navy dark:text-foreground">
                Update Booking Status
              </p>
              <p className="text-[11px] text-muted-foreground">
                Current State: <strong className="text-foreground">{currentStatus}</strong>
              </p>
            </div>

            <div className="w-full sm:w-48">
              <Select
                value={currentStatus}
                onValueChange={(val) => setSelectedStatus(val as TravelRequestStatus)}
              >
                <SelectTrigger className="h-9 bg-card text-xs">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((st) => (
                    <SelectItem key={st} value={st} className="text-xs">
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 px-6 border-t border-border/70 bg-muted/20 gap-2 sm:gap-0">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
          >
            Save Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
