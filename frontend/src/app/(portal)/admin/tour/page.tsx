import type { Metadata } from "next";

import { TravelManagementView } from "@/components/admin-travel/travel-management-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Tour Management | Miracle International Admin",
  description: "Manage all travel packages, itineraries, and publishing status.",
  robots: { index: false, follow: false },
};

export default async function TourAdminPage() {
  await requirePermission("travel.manage");

  return <TravelManagementView />;
}
