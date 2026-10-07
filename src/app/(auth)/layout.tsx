import type { ReactNode } from "react";

import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { PortalShell } from "@/components/layout/portal-shell";

/** Layout for authentication flows wrapped in the dashboard shell. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell portal="admin">
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-6 p-4">
        <main id="main-content" className="w-full max-w-md">
          {children}
        </main>
        <p className="text-muted-foreground text-xs">
          &copy; {CURRENT_YEAR} {APP_CONFIG.name}
        </p>
      </div>
    </PortalShell>
  );
}
