"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";

import { PUBLIC_MAIN_NAV, type PublicNavItem } from "@/config/public-navigation";
import { cn } from "@/lib/utils";

import { MegaMenuPanel } from "./mega-menu";
import { isNavItemActive } from "./nav-utils";

const triggerClass =
  "relative inline-flex h-10 items-center gap-1 rounded-md px-2.5 text-sm font-semibold whitespace-nowrap 2xl:px-3.5 2xl:text-[0.95rem] text-ink/80 transition-colors outline-none hover:text-brand-blue focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-brand-blue data-[active=true]:text-brand-blue";

/** Red underline marking the section the visitor is in. */
function ActiveMarker({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-brand-red absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300",
        active ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}

/**
 * Desktop primary navigation (xl and up).
 *
 * Built on Radix Navigation Menu, which provides hover and click opening,
 * Escape to close, arrow-key movement, and correct `aria-expanded` wiring.
 * Wide menus are positioned against the header container; compact ones sit
 * under their trigger.
 */
export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      aria-label="Primary"
      delayDuration={80}
      className="hidden xl:block"
    >
      <NavigationMenu.List className="flex items-center gap-0.5">
        {PUBLIC_MAIN_NAV.map((item) => (
          <NavItem key={item.title} item={item} active={isNavItemActive(pathname, item)} />
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavItem({ item, active }: { item: PublicNavItem; active: boolean }) {
  if (item.kind === "link") {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild active={active}>
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            data-active={active}
            className={triggerClass}
          >
            {item.title}
            <ActiveMarker active={active} />
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  }

  const isMega = item.groups.length > 1;
  const hasFeature = Boolean(item.feature);

  // Radix wraps the list in a positioned element that spans the menu bar, so
  // wide panels are centred on it; compact dropdowns hang under their trigger.
  return (
    <NavigationMenu.Item className={isMega || hasFeature ? "static" : "relative"}>
      <NavigationMenu.Trigger data-active={active} className={cn(triggerClass, "group")}>
        {item.title}
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
        <ActiveMarker active={active} />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        className={cn(
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1 absolute top-full z-50 pt-5 group-data-[scrolled=true]/header:pt-3",
          isMega && "left-1/2 w-[min(68rem,calc(100vw-4rem))] -translate-x-1/2",
          !isMega && hasFeature && "left-1/2 w-[46rem] -translate-x-1/2",
          !isMega && !hasFeature && "-left-4 w-[24rem]",
          // "More" is the right-most menu; keep it inside the viewport.
          !isMega && !hasFeature && !item.href && "right-0 left-auto",
        )}
      >
        <MegaMenuPanel
          groups={item.groups}
          feature={item.feature}
          landing={item.href ? { title: `Explore ${item.title}`, href: item.href } : undefined}
        />
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
