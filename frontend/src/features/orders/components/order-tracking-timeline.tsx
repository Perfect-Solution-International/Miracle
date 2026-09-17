"use client";

import { Timeline, type TimelineEntry } from "@/components/data-display/timeline";
import { orderStatus } from "@/lib/constants/statuses/order-status";
import type { OrderTrackingEvent } from "../types/order.types";

/**
 * Shipment progress for an order. Maps backend tracking events onto the shared
 * Timeline, marking the latest event as current.
 */
export function OrderTrackingTimeline({
  events,
}: {
  events: readonly OrderTrackingEvent[];
}) {
  if (events.length === 0) {
    return <p className="text-muted-foreground text-sm">No tracking updates yet.</p>;
  }

  const sorted = [...events].sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
  );

  const entries: TimelineEntry[] = sorted.map((event, index) => ({
    id: event.id,
    title: orderStatus.label(event.status),
    description: [event.location, event.note].filter(Boolean).join(" - ") || undefined,
    timestamp: event.occurredAt,
    current: index === 0,
  }));

  return <Timeline entries={entries} />;
}
