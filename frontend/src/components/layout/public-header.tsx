"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { APP_CONFIG } from "@/config/app";
import { PUBLIC_NAVIGATION } from "@/config/navigation";
import { PORTAL_HOME, ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

/** Marketing site header. Shows a dashboard link when the visitor is signed in. */
export function PublicHeader() {
  const pathname = usePathname();
  const { isAuthenticated, ability } = useAuth();
  const [open, setOpen] = useState(false);

  const dashboardHref = PORTAL_HOME[ability.portal];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href={ROUTES.public.home} className="shrink-0 font-semibold">
          {APP_CONFIG.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {PUBLIC_NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "hover:bg-accent focus-visible:ring-ring rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link href={dashboardHref}>Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href={ROUTES.auth.login}>Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={ROUTES.auth.register}>Get started</Link>
              </Button>
            </>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-8">
                <ul className="space-y-1">
                  {PUBLIC_NAVIGATION.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="hover:bg-accent block rounded-md px-3 py-2 text-sm"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
