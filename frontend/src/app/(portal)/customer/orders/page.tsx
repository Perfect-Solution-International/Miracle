import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/feedback/empty-state";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default async function CustomerOrdersPage() {
  await requirePermission("orders.read");

  return (
    <>
      <PageHeader
        title="Orders"
        description="Track your wholesale orders from confirmation through to delivery."
      />
      <EmptyState
        title="No orders yet"
        description="Approved quotations become orders and will appear here."
      />
    </>
  );
}
