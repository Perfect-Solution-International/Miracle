import type { ReactNode } from "react";

import { BrandLogo } from "@/components/common/brand-logo";
import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";

/** Centred, standalone single-page layout for authentication flows. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-slate-50/60 p-4 sm:p-6 [@media(max-height:800px)]:gap-3 [@media(max-height:800px)]:py-3">
      <div className="flex justify-center">
        <BrandLogo imageClassName="h-10 w-auto sm:h-12 [@media(max-height:800px)]:h-8" />
      </div>
      <main id="main-content" className="w-full">
        {children}
      </main>
      <p className="text-muted-foreground text-center text-xs">
        &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
      </p>
    </div>
  );
}
