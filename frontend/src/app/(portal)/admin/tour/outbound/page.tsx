import type { Metadata } from "next";

import { TravelOutboundView } from "@/components/admin-travel/travel-outbound-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Outbound Tour Packages | Miracle International Admin",
  description: "Manage International Outbound holiday packages and pricing.",
  robots: { index: false, follow: false },
};

export default async function TourOutboundAdminPage() {
  await requirePermission("travel.manage");

  return <TravelOutboundView />;
}
