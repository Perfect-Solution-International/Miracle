import type { Metadata } from "next";

import { TravelInboundView } from "@/components/admin-travel/travel-inbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Inbound Tours | Miracle International Admin",
  description: "Manage Sri Lanka Inbound travel packages, itineraries, and status.",
  robots: { index: false, follow: false },
};

export default async function AdminTravelInboundPage() {
  await requirePermission("travel.manage");

  return <TravelInboundView />;
}
