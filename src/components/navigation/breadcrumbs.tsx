"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Breadcrumbs derived from the pathname.
 *
 * Segments are humanised rather than hand-maintained, so new routes get
 * breadcrumbs for free. Identifier-looking segments (UUIDs, numeric ids) are
 * replaced with "Details" instead of showing a raw key to the user.
 */
export function Breadcrumbs() {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => ({
      label: humanise(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
      isLast: index === segments.length - 1,
    }));
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-muted-foreground flex items-center gap-1 text-sm">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex min-w-0 items-center gap-1">
            {crumb.isLast ? (
              <span aria-current="page" className="text-foreground truncate font-medium">
                {crumb.label}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="hover:text-foreground focus-visible:ring-ring hidden truncate rounded-sm focus-visible:ring-2 focus-visible:outline-none sm:inline"
                >
                  {crumb.label}
                </Link>
                <ChevronRight
                  className="hidden size-3.5 shrink-0 sm:block"
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-|^\d+$/i;

function humanise(segment: string): string {
  if (ID_PATTERN.test(segment)) return "Details";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
