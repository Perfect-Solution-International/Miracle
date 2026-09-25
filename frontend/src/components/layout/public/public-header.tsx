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
      <BrandLogo preload className="justify-self-start" />
      <DesktopNavigation className="justify-self-center" />
      <div className="flex items-center justify-self-end gap-1 sm:gap-2">
        <HeaderActions />
        <MobileNavigation />
      </div>
    </HeaderShell>
  );
}
