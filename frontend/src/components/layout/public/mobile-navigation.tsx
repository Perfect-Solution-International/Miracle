"use client";

import { ArrowRight, ChevronDown, Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/common/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_CONFIG } from "@/config/app";
import { PUBLIC_MOBILE_NAV } from "@/config/public-navigation";
import { PORTAL_HOME, ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

import { isActivePath } from "./nav-utils";

/**
 * Navigation drawer below the xl breakpoint.
 *
 * Radix Dialog underneath traps focus, closes on Escape, and restores focus to
 * the trigger. Sections use native `<details>` so they expand without extra
 * JavaScript and are announced as disclosure widgets.
 */
export function MobileNavigation() {
  const pathname = usePathname();
  const { isAuthenticated, ability } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-ink -mr-2 xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="theme-light gap-0 bg-white p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="flex h-[4.5rem] items-center border-b px-5">
          <BrandLogo imageClassName="h-8 sm:h-9" />
        </div>
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse {APP_CONFIG.name} pages and services.
        </SheetDescription>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {PUBLIC_MOBILE_NAV.map((group, index) => {
              const groupActive = group.links.some(
                (link) => !link.href.includes("#") && isActivePath(pathname, link.href),
              );
              return (
                <li key={group.title}>
                  <details
                    open={index === 0 || groupActive}
                    className="group/section rounded-xl open:bg-surface"
                  >
                    <summary className="text-ink flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3.5 text-base font-bold [&::-webkit-details-marker]:hidden">
                      {group.title}
                      <ChevronDown
                        aria-hidden="true"
                        className="text-muted-foreground size-4 transition-transform group-open/section:rotate-180"
                      />
                    </summary>
                    <ul className="space-y-0.5 px-2 pb-3">
                      {group.links.map((link) => {
                        const active =
                          !link.href.includes("#") && isActivePath(pathname, link.href);
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={close}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex min-h-11 items-center gap-3 rounded-lg px-3 text-[0.95rem] font-medium transition-colors",
                                active
                                  ? "text-brand-blue bg-white"
                                  : "text-ink/80 hover:text-brand-blue hover:bg-white",
                              )}
                            >
                              {active ? (
                                <span
                                  aria-hidden="true"
                                  className="bg-brand-red h-4 w-0.5 rounded-full"
                                />
                              ) : null}
                              {link.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t p-5">
          <Button asChild size="xl" className="w-full">
            <Link href={ROUTES.public.tellUsWhatYouNeed} onClick={close}>
              Tell Us What You Need
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="w-full">
            <Link
              href={isAuthenticated ? PORTAL_HOME[ability.portal] : ROUTES.customer.dashboard}
              onClick={close}
            >
              {isAuthenticated ? "Go to Dashboard" : "Login"}
            </Link>
          </Button>
          <div className="text-muted-foreground flex flex-wrap justify-center gap-x-5 gap-y-1 pt-1 text-sm">
            <a
              href={`tel:${APP_CONFIG.support.phone.replace(/\s+/g, "")}`}
              className="hover:text-ink inline-flex min-h-11 items-center gap-1.5"
            >
              <Phone aria-hidden="true" className="size-4" />
              {APP_CONFIG.support.phone}
            </a>
            <a
              href={`mailto:${APP_CONFIG.support.email}`}
              className="hover:text-ink inline-flex min-h-11 items-center gap-1.5"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email us
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
