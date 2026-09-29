import type { Metadata } from "next";

import { AdminDashboardView } from "@/components/admin-dashboard/admin-dashboard-view";
import { verifySession } from "@/server/dal/session";

export const metadata: Metadata = {
  title: "Admin Dashboard | Miracle International",
  description: "Operations and administration management overview for Miracle International.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const user = await verifySession();

  return (
    <AdminDashboardView
      adminEmail={user.email}
      adminName={user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Administrator"}
    />
  );
}
