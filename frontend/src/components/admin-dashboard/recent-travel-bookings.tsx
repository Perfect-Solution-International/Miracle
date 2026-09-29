import { Calendar, Eye, MapPin, Plane, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { AdminStatusBadge } from "./status-badge";
import type { TravelBooking } from "./types";

interface RecentTravelBookingsProps {
  bookings: TravelBooking[];
  onViewBooking: (booking: TravelBooking) => void;
}

export function RecentTravelBookings({
  bookings,
  onViewBooking,
}: RecentTravelBookingsProps) {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30">
              <Plane className="size-3.5" />
            </div>
            <CardTitle className="text-base font-bold text-navy dark:text-foreground">
              Recent Travel Inquiries
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Latest customer travel inquiries and tour requests
          </p>
        </div>

        <Button asChild variant="ghost" size="sm" className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark">
          <Link href="/admin/travel/inquiries">Manage Inquiries</Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-1 flex-1 flex flex-col justify-between">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted/60 mb-2.5">
              <Plane className="size-5 text-muted-foreground/70" />
            </div>
            <p className="text-sm font-semibold text-navy dark:text-foreground">
              No travel inquiries yet
            </p>
            <p className="text-xs text-muted-foreground max-w-xs mt-0.5">
              Customer inquiries submitted for Inbound and Outbound tours will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-xs text-navy dark:text-foreground">
                      {booking.customerName}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-[11px] text-muted-foreground">
                      {booking.travelers}
                    </span>
                    <AdminStatusBadge status={booking.status} />
                  </div>

                  <p className="text-xs font-medium text-foreground truncate group-hover:text-brand-blue transition-colors">
                    {booking.package}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-brand-blue" />
                      {booking.travelDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-muted-foreground" />
                      {booking.destination}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewBooking(booking)}
                    className="h-8 text-xs font-medium gap-1.5 border-border/80 hover:border-brand-blue hover:bg-brand-blue-light/50 hover:text-brand-blue dark:hover:bg-brand-blue/20"
                  >
                    <Eye className="size-3.5" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
