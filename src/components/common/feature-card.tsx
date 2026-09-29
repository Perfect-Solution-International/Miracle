import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Icon, title, and description. When `href` is given the title link is
 * stretched over the card, so the whole card is clickable with a single tab
 * stop and a meaningful accessible name.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  tone = "default",
  headingLevel: Heading = "h3",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  tone?: "default" | "inverse";
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const inverse = tone === "inverse";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5 rounded-xl border p-6 transition-all duration-300",
        inverse
          ? "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
          : "bg-card hover:border-brand-blue/30 hover:shadow-soft",
        href && "has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-2",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-300",
          inverse
            ? "text-brand-blue-muted bg-white/10"
            : "bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white",
        )}
      >
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="space-y-2">
        <Heading className={cn("text-lg font-bold", inverse ? "text-white" : "text-ink")}>
          {href ? (
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:rounded-xl"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>
        <p
          className={cn(
            "text-sm leading-relaxed",
            inverse ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
