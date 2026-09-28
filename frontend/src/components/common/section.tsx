import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const TONES = {
  default: "bg-transparent text-foreground",
  surface: "bg-transparent text-foreground",
  navy: "bg-navy text-white",
  blue: "bg-brand-blue text-white",
} as const;

export type SectionTone = keyof typeof TONES;

/**
 * Page section with the shared vertical rhythm and container width.
 *
 * Every public section goes through this, so spacing stays consistent and is
 * tuned in one place (`section-y` / `container-page` in globals.css).
 */
export function Section({
  tone = "default",
  spacing = "default",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & {
  tone?: SectionTone;
  spacing?: "default" | "compact" | "none";
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        TONES[tone],
        spacing === "default" && "section-y",
        spacing === "compact" && "py-10 md:py-14",
        className,
      )}
      {...props}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
