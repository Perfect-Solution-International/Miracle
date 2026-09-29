import type { Metadata } from "next";

import { TravelOutboundView } from "@/components/admin-travel/travel-outbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Outbound Tours | Miracle International Admin",
  description: "Manage international outbound tour packages, pricing, offers, itineraries and customer-facing travel information.",
  robots: { index: false, follow: false },
};

export default async function AdminOutboundToursPage() {
  await requirePermission("travel.manage");

  return <TravelOutboundView />;
}
