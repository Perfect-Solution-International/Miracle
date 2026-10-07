import type { ReactNode } from "react";

import { BrandLogo } from "@/components/common/brand-logo";
import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";

/** Centred, standalone single-page layout for authentication flows. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50/60 flex min-h-svh flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <div className="flex justify-center">
        <BrandLogo imageClassName="h-10 w-auto sm:h-12" />
      </div>
      <main id="main-content" className="w-full">
        {children}
      </main>
      <p className="text-muted-foreground text-xs text-center">
        &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
      </p>
    </div>
  );
}
