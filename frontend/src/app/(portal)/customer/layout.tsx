import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout/portal-shell";
import { verifySession } from "@/server/dal/session";

/**
 * Customer portal shell.
 *
 * `verifySession()` here redirects signed-out visitors, but it is not the
 * security boundary: Next.js layouts do not re-render when navigating between
 * their child routes, so each page and Server Action performs its own check via
 * the DAL. This call exists so the shell is never rendered for a guest.
 */
export default async function CustomerLayout({ children }: { children: ReactNode }) {
  await verifySession();

  return <PortalShell portal="customer">{children}</PortalShell>;
}
