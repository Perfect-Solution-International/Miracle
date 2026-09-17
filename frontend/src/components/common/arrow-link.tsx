import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Text link with a trailing arrow that nudges forward on hover. */
export function ArrowLink({
  href,
  children,
  tone = "default",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold transition-colors",
        tone === "inverse"
          ? "hover:text-brand-blue-muted text-white"
          : "text-brand-blue hover:text-brand-blue-dark",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover/arrow:translate-x-1"
      />
    </Link>
  );
}
