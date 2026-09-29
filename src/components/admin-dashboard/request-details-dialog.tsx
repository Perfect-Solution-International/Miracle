import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Globe2,
  Mail,
  Phone,
  User,
  XCircle,
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
import type { RequestStatus, ServiceRequest } from "./types";

interface RequestDetailsDialogProps {
  request: ServiceRequest | null;
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

export function RequestDetailsDialog({
  request,
  open,
  onOpenChange,
  onUpdateStatus,
}: RequestDetailsDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | null>(null);

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
      <DialogContent className="max-w-xl sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-md dark:bg-brand-blue/20">
                {request.referenceNumber}
              </span>
              <AdminStatusBadge status={currentStatus} />
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              {request.date}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-navy dark:text-foreground mt-2">
            {request.requestType}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Service Category:{" "}
            <strong className="text-foreground">{request.service}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Customer Information Card */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 text-brand-blue shrink-0" />
                <span className="font-semibold text-navy dark:text-foreground">
                  {request.customerName}
                </span>
              </div>
              {request.customerCompany ? (
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{request.customerCompany}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <a
                  href={`mailto:${request.customerEmail}`}
                  className="text-brand-blue hover:underline truncate"
                >
                  {request.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <a
                  href={`tel:${request.customerPhone}`}
                  className="text-foreground hover:underline"
                >
                  {request.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Request Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {request.destinationOrScope ? (
              <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                  Scope / Route
                </span>
                <p className="text-xs font-medium text-navy dark:text-foreground">
                  {request.destinationOrScope}
                </p>
              </div>
            ) : null}

            <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                Assigned Staff Desk
              </span>
              <p className="text-xs font-medium text-navy dark:text-foreground">
                {request.assignedStaff || "Unassigned Operations Queue"}
              </p>
            </div>
          </div>

          {/* Request Notes */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Request Details & Requirements
            </h4>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {request.notes}
            </p>
          </div>

          {/* Status Update Control */}
          <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-brand-blue/10">
            <div>
              <p className="text-xs font-bold text-navy dark:text-foreground">
                Update Operational Status
              </p>
              <p className="text-[11px] text-muted-foreground">
                Change the processing state of this inquiry
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
