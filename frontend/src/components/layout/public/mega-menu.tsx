"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import type {
  PublicNavFeature,
  PublicNavGroup,
  PublicNavLink,
} from "@/config/public-navigation";
import { cn } from "@/lib/utils";

/**
 * Panel content for a desktop navigation menu. Links go through
 * `NavigationMenu.Link` so Radix closes the menu on selection and manages
 * arrow-key focus between them.
 */
export function MegaMenuPanel({
  groups,
  feature,
  landing,
}: {
  groups: readonly PublicNavGroup[];
  feature?: PublicNavFeature;
  landing?: { title: string; href: string };
}) {
  const isWide = groups.length > 1;
  const hasDescriptions = groups.some((group) => group.links.some((l) => l.description));

  return (
    <div
      className={cn(
        "bg-popover shadow-lift overflow-hidden rounded-2xl border",
        isWide ? "grid grid-cols-[1fr_17rem]" : feature ? "grid grid-cols-[1fr_15rem]" : "",
      )}
    >
      <div className={cn("p-6", isWide && "grid grid-cols-3 gap-6")}>
        {groups.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-muted-foreground px-3 text-[0.7rem] font-bold tracking-[0.16em] uppercase">
              {group.title}
            </p>
            <ul
              className={cn(
                "grid gap-0.5",
                !isWide && !hasDescriptions && "grid-cols-2 gap-x-4",
              )}
            >
              {group.links.map((link) => (
                <li key={link.href}>
                  <MenuLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {landing ? (
          <div className={cn("border-t pt-4", isWide ? "col-span-3" : "mt-4")}>
            <NavigationMenu.Link asChild>
              <Link
                href={landing.href}
                className="text-brand-blue hover:text-brand-blue-dark group/landing inline-flex items-center gap-1.5 rounded-sm px-3 text-sm font-semibold"
              >
                {landing.title}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover/landing:translate-x-0.5"
                />
              </Link>
            </NavigationMenu.Link>
          </div>
        ) : null}
      </div>

      {feature ? <MenuFeature feature={feature} /> : null}
    </div>
  );
}

function MenuLink({ link }: { link: PublicNavLink }) {
  const Icon = link.icon;

  return (
    <NavigationMenu.Link asChild>
      <Link
        href={link.href}
        className="group/link hover:bg-surface focus-visible:bg-surface flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors outline-none"
      >
        {Icon ? (
          <span className="bg-brand-blue-light text-brand-blue group-hover/link:bg-brand-blue mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors group-hover/link:text-white">
            <Icon aria-hidden="true" className="size-4" />
          </span>
        ) : null}
        <span className="flex flex-col gap-0.5">
          <span className="text-ink group-hover/link:text-brand-blue text-sm font-semibold transition-colors">
            {link.title}
          </span>
          {link.description ? (
            <span className="text-muted-foreground text-xs leading-snug">
              {link.description}
            </span>
          ) : null}
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}

function MenuFeature({ feature }: { feature: PublicNavFeature }) {
  return (
    <div className="bg-navy relative isolate flex flex-col justify-between gap-6 overflow-hidden p-6 text-white">
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-brand-blue absolute -right-16 -bottom-16 -z-10 size-48 rounded-full opacity-50 blur-3xl"
      />
      <div className="space-y-3">
        <p className="text-brand-blue-muted flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.16em] uppercase">
          <span aria-hidden="true" className="bg-brand-red h-0.5 w-4 rounded-full" />
          {feature.eyebrow}
        </p>
        <p className="text-lg leading-snug font-bold">{feature.title}</p>
        <p className="text-sm leading-relaxed text-white/65">{feature.description}</p>
      </div>
      <NavigationMenu.Link asChild>
        <Link
          href={feature.href}
          className="bg-brand-red hover:bg-brand-red-dark inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold whitespace-nowrap transition-colors"
        >
          {feature.cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}
