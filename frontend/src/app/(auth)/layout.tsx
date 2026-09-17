import Link from "next/link";
import type { ReactNode } from "react";

import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { ROUTES } from "@/config/routes";

/** Centred, chrome-free layout for the authentication flows. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/30 flex min-h-svh flex-col items-center justify-center gap-6 p-4">
      <Link href={ROUTES.public.home} className="text-lg font-semibold">
        {APP_CONFIG.name}
      </Link>
      <main id="main-content" className="w-full max-w-md">
        {children}
      </main>
      <p className="text-muted-foreground text-xs">
        &copy; {CURRENT_YEAR} {APP_CONFIG.name}
      </p>
    </div>
  );
}
