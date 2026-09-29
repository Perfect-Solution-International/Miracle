import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/feedback/empty-state";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage() {
  await requirePermission("orders.manage");

  return (
    <>
      <PageHeader title="Orders" description="All orders across the platform." />
      <EmptyState
        title="No orders yet"
        description="Orders will appear here once created."
      />
    </>
  );
}
