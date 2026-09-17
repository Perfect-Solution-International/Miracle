import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Small uppercase label above a heading. The short red rule is the brand's
 * recurring accent motif, taken from the red stroke in the logo.
 */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase sm:text-[0.8rem]",
        tone === "inverse" ? "text-brand-blue-muted" : "text-brand-blue",
        className,
      )}
    >
      <span aria-hidden="true" className="bg-brand-red h-0.5 w-6 shrink-0 rounded-full" />
      {children}
    </p>
  );
}
