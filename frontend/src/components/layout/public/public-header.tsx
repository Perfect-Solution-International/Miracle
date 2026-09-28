import { BrandLogo } from "@/components/common/brand-logo";

import { DesktopNavigation } from "./desktop-navigation";
import { HeaderActions } from "./header-actions";
import { HeaderShell } from "./header-shell";
import { MobileNavigation } from "./mobile-navigation";

/**
 * Public site header. A Server Component that composes small client islands:
 * the scroll-aware shell, the menu, the auth-aware actions, and the drawer.
 */
export function PublicHeader() {
  return (
    <HeaderShell>
      <BrandLogo preload className="shrink-0" />
      <DesktopNavigation className="hidden xl:flex xl:flex-1 xl:justify-center" />
      <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
        <HeaderActions />
        <MobileNavigation />
      </div>
    </HeaderShell>
  );
}
