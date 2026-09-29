import type { Metadata } from "next";

import { TravelInboundView } from "@/components/admin-travel/travel-inbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Inbound Tour Packages | Miracle International Admin",
  description: "Manage Sri Lanka Inbound tour itineraries and pricing.",
  robots: { index: false, follow: false },
};

export default async function TourInboundAdminPage() {
  await requirePermission("travel.manage");

  return <TravelInboundView />;
}
