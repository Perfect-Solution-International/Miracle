import type { Metadata } from "next";

import { AdminInquiriesView } from "@/components/admin-inquiries/admin-inquiries-view";

export const metadata: Metadata = {
  title: "Inquiries Management | Miracle International Admin",
  description: "Centralized hub to manage all customer inquiries across travel, tours, visa, trade, and business solutions.",
  robots: { index: false, follow: false },
};

export default function AdminInquiriesPage() {
  return <AdminInquiriesView />;
}
