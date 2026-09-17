import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout/portal-shell";
import { verifySession } from "@/server/dal/session";

/** Staff portal shell. Per-page authorisation still runs in the DAL. */
export default async function StaffLayout({ children }: { children: ReactNode }) {
  await verifySession();

  return <PortalShell portal="staff">{children}</PortalShell>;
}
