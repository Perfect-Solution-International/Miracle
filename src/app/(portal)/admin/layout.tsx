import type { ReactNode } from "react";

import { AdminAuthGuard } from "@/components/admin-dashboard/admin-auth-guard";
import { PortalShell } from "@/components/layout/portal-shell";
import { verifySession } from "@/server/dal/session";

/** Administration shell. Per-page authorisation still runs in the DAL. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await verifySession();

  return (
    <AdminAuthGuard>
      <PortalShell portal="admin">{children}</PortalShell>
    </AdminAuthGuard>
  );
}
