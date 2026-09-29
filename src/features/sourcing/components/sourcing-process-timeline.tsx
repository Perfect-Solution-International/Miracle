import { cn } from "@/lib/utils";

import { SOURCING_PROCESS } from "../data/sourcing.content";

/**
 * Five-step sourcing flow for dark backgrounds. Horizontal with a connecting
 * rule on large screens, vertical on small screens.
 */
export function SourcingProcessTimeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10",
        className,
      )}
    >
      <h3 className="text-brand-blue-muted text-sm font-bold tracking-[0.16em] uppercase">
        The sourcing process
      </h3>
      <ol className="relative mt-8 grid gap-8 lg:grid-cols-5 lg:gap-6">
        <span
          aria-hidden="true"
          className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5 lg:block"
        />
        {SOURCING_PROCESS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
          >
            <span
              className={cn(
                "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                index === 0
                  ? "bg-brand-red text-white"
                  : "bg-navy-light border border-white/20 text-white",
              )}
            >
              {index + 1}
            </span>
            <div className="space-y-1.5">
              <p className="font-bold text-white">{step.title}</p>
              <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
