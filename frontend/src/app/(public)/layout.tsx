import type { ReactNode } from "react";

import { AnnouncementBar } from "@/components/layout/public/announcement-bar";
import { PublicFooter } from "@/components/layout/public/public-footer";
import { PublicHeader } from "@/components/layout/public/public-header";

/**
 * Marketing site shell. Rendered for guests and signed-in users alike.
 * `theme-light` pins the brand palette even if the visitor uses dark mode in
 * the portals.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-light bg-background text-foreground flex min-h-svh flex-col">
      <AnnouncementBar />
      <PublicHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
