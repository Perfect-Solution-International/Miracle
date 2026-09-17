import Link from "next/link";

import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { PUBLIC_NAVIGATION } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

export function PublicFooter() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="font-semibold">{APP_CONFIG.name}</p>
            <p className="text-muted-foreground max-w-xs text-sm">
              {APP_CONFIG.description}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className="mb-3 text-sm font-medium">Explore</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {PUBLIC_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2">
            <h2 className="text-sm font-medium">Contact</h2>
            <p className="text-muted-foreground text-sm">
              <a
                href={`mailto:${APP_CONFIG.support.email}`}
                className="hover:text-foreground"
              >
                {APP_CONFIG.support.email}
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              <a
                href={`tel:${APP_CONFIG.support.phone}`}
                className="hover:text-foreground"
              >
                {APP_CONFIG.support.phone}
              </a>
            </p>
            <Link href={ROUTES.public.tellUsWhatYouNeed} className="text-sm font-medium">
              Tell us what you need
            </Link>
          </div>
        </div>

        <p className="text-muted-foreground mt-10 border-t pt-6 text-xs">
          &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
