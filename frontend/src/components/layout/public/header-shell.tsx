"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky header frame. The only client logic is a passive scroll listener that
 * flips `data-scrolled`, which tightens the height and adds a border and shadow.
 * The logo and other server-rendered children pass straight through.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group/header sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-white/95 shadow-[0_8px_24px_-16px_rgb(13_23_38_/_0.25)] backdrop-blur supports-[backdrop-filter]:bg-white/85"
          : "border-transparent bg-white",
      )}
    >
      <div className="relative grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 transition-[height] duration-300 group-data-[scrolled=true]/header:h-16 sm:px-8 lg:h-20 lg:px-10">
        {children}
      </div>
    </header>
  );
}
