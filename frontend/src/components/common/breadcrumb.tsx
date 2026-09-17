import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import { JsonLd } from "./json-ld";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Explicit breadcrumb trail for public pages, rendered on the server with
 * matching `BreadcrumbList` structured data. "Home" is prepended automatically.
 */
export function Breadcrumb({
  items,
  tone = "default",
  className,
}: {
  items: readonly BreadcrumbItem[];
  tone?: "default" | "inverse";
  className?: string;
}) {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: ROUTES.public.home }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: new URL(item.href, APP_CONFIG.url).toString() } : {}),
          })),
        }}
      />
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm",
          tone === "inverse" ? "text-white/65" : "text-muted-foreground",
        )}
      >
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-semibold",
                    tone === "inverse" ? "text-white" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-sm transition-colors",
                      tone === "inverse" ? "hover:text-white" : "hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
