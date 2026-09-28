import type { Metadata } from "next";

import { TravelInquiriesView } from "@/components/admin-travel/travel-inquiries-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Travel Inquiries | Miracle International Admin",
  description: "Centralized travel inquiry inbox, customer requests, and email replies.",
  robots: { index: false, follow: false },
};

export default async function AdminTravelInquiriesPage() {
  await requirePermission("travel.manage");

  return <TravelInquiriesView />;
}
