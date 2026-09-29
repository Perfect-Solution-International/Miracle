import type { Metadata } from "next";

import { TravelManagementView } from "@/components/admin-travel/travel-management-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Tour Management | Miracle International Admin",
  description: "Manage travel packages, bookings and customer travel requests.",
  robots: { index: false, follow: false },
};

export default async function TravelAdminPage() {
  await requirePermission("travel.manage");

  return <TravelManagementView />;
}
