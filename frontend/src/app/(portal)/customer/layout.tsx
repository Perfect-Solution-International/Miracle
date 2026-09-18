import type { ReactNode } from "react";
import { headers } from "next/headers";

import { PortalShell } from "@/components/layout/portal-shell";
import { ROUTES } from "@/config/routes";
import { verifySession } from "@/server/dal/session";

/**
 * Customer portal shell.
 *
 * `verifySession()` here redirects signed-out visitors, but it is not the
 * security boundary: Next.js layouts do not re-render when navigating between
 * their child routes, so each page and Server Action performs its own check via
 * the DAL. This call exists so the shell is never rendered for a guest.
 *
 * The dashboard is the one public exception (see `PUBLIC_PATH_OVERRIDES`), so
 * it's skipped here too — otherwise this layout would undo the proxy's
 * exception for every request under `/customer`.
 */
export default async function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get("x-pathname");
  if (pathname !== ROUTES.customer.dashboard) {
    await verifySession();
  }

  return <PortalShell portal="customer">{children}</PortalShell>;
}
