"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fixed header frame. The only client logic is a passive scroll listener that
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
        "group/header fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-white/95 shadow-[0_8px_24px_-16px_rgb(13_23_38_/_0.25)] backdrop-blur supports-[backdrop-filter]:bg-white/85"
          : "border-transparent bg-white",
      )}
    >
      <div className="flex h-[4.5rem] w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-10 transition-[height] duration-300 group-data-[scrolled=true]/header:h-16 lg:h-20">
        {children}
      </div>
    </header>
  );
}
