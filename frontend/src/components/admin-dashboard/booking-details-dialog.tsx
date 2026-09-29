import {
  Calendar,
  CheckCircle2,
  Hotel,
  Mail,
  Phone,
  Plane,
  PlaneTakeoff,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

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
import { AdminStatusBadge } from "./status-badge";
import type { RequestStatus, TravelBooking } from "./types";

interface BookingDetailsDialogProps {
  booking: TravelBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, newStatus: RequestStatus) => void;
}

const ALL_STATUSES: RequestStatus[] = [
  "Pending",
  "Reviewing",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rescheduled",
];

export function BookingDetailsDialog({
  booking,
  open,
  onOpenChange,
  onUpdateStatus,
}: BookingDetailsDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | null>(null);

  if (!booking) return null;

  const currentStatus = selectedStatus ?? booking.status;

  const handleSave = () => {
    if (selectedStatus && selectedStatus !== booking.status) {
      onUpdateStatus(booking.id, selectedStatus);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-md dark:bg-brand-blue/20">
                {booking.bookingRef}
              </span>
              <AdminStatusBadge status={currentStatus} />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-navy dark:text-foreground mt-2">
            {booking.package}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
            <Plane className="size-3.5 text-brand-blue" />
            Destination: <strong className="text-foreground">{booking.destination}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Customer Card */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Lead Traveler / Customer
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 text-brand-blue shrink-0" />
                <span className="font-semibold text-navy dark:text-foreground">
                  {booking.customerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{booking.travelers}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <a
                  href={`mailto:${booking.customerEmail}`}
                  className="text-brand-blue hover:underline truncate"
                >
                  {booking.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <a
                  href={`tel:${booking.customerPhone}`}
                  className="text-foreground hover:underline"
                >
                  {booking.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Booking Specifics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3 text-brand-blue" />
                Travel Dates
              </span>
              <p className="text-xs font-semibold text-navy dark:text-foreground">
                {booking.travelDate}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground flex items-center gap-1">
                <Hotel className="size-3 text-brand-blue" />
                Accommodation
              </span>
              <p className="text-xs font-semibold text-navy dark:text-foreground">
                {booking.hotelCategory}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground flex items-center gap-1">
                <PlaneTakeoff className="size-3 text-brand-blue" />
                Flight Tickets
              </span>
              <p className="text-xs font-semibold text-navy dark:text-foreground">
                {booking.flightIncluded ? "Included (Return Flights)" : "Ground Package Only"}
              </p>
            </div>
          </div>

          {/* Special Itinerary Notes */}
          {booking.notes ? (
            <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Traveler Notes & Special Arrangements
              </h4>
              <p className="text-sm text-foreground leading-relaxed">{booking.notes}</p>
            </div>
          ) : null}

          {/* Status Update Control */}
          <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-brand-blue/10">
            <div>
              <p className="text-xs font-bold text-navy dark:text-foreground">
                Update Booking Status
              </p>
              <p className="text-[11px] text-muted-foreground">
                Manage reservation status and client itinerary confirmation
              </p>
            </div>

            <div className="w-full sm:w-48">
              <Select
                value={currentStatus}
                onValueChange={(val) => setSelectedStatus(val as RequestStatus)}
              >
                <SelectTrigger className="h-9 bg-card">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={handleSave}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
