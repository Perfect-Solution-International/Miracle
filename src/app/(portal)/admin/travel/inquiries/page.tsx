import type { Metadata } from "next";

import { AdminInquiriesView } from "@/components/admin-inquiries/admin-inquiries-view";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Inquiries Management | Miracle International Admin",
  description: "Centralized inquiry inbox, customer requests, and email replies.",
  robots: { index: false, follow: false },
};

export default async function AdminTravelInquiriesPage() {
  await requirePermission("travel.manage");

  return <AdminInquiriesView />;
}
