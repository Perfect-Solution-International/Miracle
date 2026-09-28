import type { PublicNavItem } from "@/config/public-navigation";

/** Compares paths only, ignoring any query string or hash on the link. */
export function isActivePath(pathname: string, href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * A menu is active when its landing page or any of its links is the current
 * page — unless that page already belongs to another top-level nav item
 * (e.g. Travel & Tourism, IT Solutions also appear inside the Services
 * dropdown), in which case that item owns the active state instead.
 */
export function isNavItemActive(
  pathname: string,
  item: PublicNavItem,
  allItems: readonly PublicNavItem[],
): boolean {
  if (item.kind === "link") return isActivePath(pathname, item.href);
  if (item.href && isActivePath(pathname, item.href)) return true;

  const ownedByAnotherTopLevelItem = allItems.some(
    (other) => other !== item && other.href && isActivePath(pathname, other.href),
  );
  if (ownedByAnotherTopLevelItem) return false;

  return item.groups.some((group) =>
    group.links.some((link) => !link.href.includes("#") && isActivePath(pathname, link.href)),
  );
}
