import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout/portal-shell";
import { verifySession } from "@/server/dal/session";

/** Administration shell. Per-page authorisation still runs in the DAL. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await verifySession();

  return <PortalShell portal="admin">{children}</PortalShell>;
}
