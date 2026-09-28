import type { Metadata } from "next";

import { TravelInboundView } from "@/components/admin-travel/travel-inbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Travel Management | Miracle International Admin",
  description: "Manage travel packages, bookings and customer travel requests.",
  robots: { index: false, follow: false },
};

export default async function TravelAdminPage() {
  await requirePermission("travel.manage");

  return <TravelInboundView />;
}
