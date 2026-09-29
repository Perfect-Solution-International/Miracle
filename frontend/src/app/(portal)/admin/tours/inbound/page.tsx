import type { Metadata } from "next";

import { TravelInboundView } from "@/components/admin-travel/travel-inbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Inbound Tours | Miracle International Admin",
  description: "Manage Sri Lanka inbound tour packages, pricing, offers, itineraries and customer-facing travel information.",
  robots: { index: false, follow: false },
};

export default async function AdminInboundToursPage() {
  await requirePermission("travel.manage");

  return <TravelInboundView />;
}
