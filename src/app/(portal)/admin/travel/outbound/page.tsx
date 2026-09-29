import type { Metadata } from "next";

import { TravelOutboundView } from "@/components/admin-travel/travel-outbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Outbound Tours | Miracle International Admin",
  description: "Manage international Outbound travel packages and itineraries.",
  robots: { index: false, follow: false },
};

export default async function AdminTravelOutboundPage() {
  await requirePermission("travel.manage");

  return <TravelOutboundView />;
}
