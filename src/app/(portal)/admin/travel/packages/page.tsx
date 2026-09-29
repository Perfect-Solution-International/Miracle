import type { Metadata } from "next";

import { TravelManagementView } from "@/components/admin-travel/travel-management-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "All Travel Packages | Miracle International Admin",
  description: "Manage all inbound and outbound travel packages.",
  robots: { index: false, follow: false },
};

export default async function AdminTravelPackagesPage() {
  await requirePermission("travel.manage");

  return <TravelManagementView />;
}
