import { cn } from "@/lib/utils";

import { HOW_IT_WORKS_STEPS } from "../data/tell-us-what-you-need.content";

/** Four-step "how it works" row, alternating red/blue step badges with
 * connecting arrows on desktop and a stacked list on mobile. */
export function RequirementProcessSteps({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4", className)}>
      {HOW_IT_WORKS_STEPS.map(
        ({ step, icon: Icon, title, description, accent }, index) => (
          <li key={step} className="relative flex flex-col items-center text-center">
            {index < HOW_IT_WORKS_STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-8 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-white/20 lg:block"
              />
            ) : null}
            <span
              className={cn(
                "relative flex size-16 shrink-0 items-center justify-center rounded-full text-white",
                accent === "red" ? "bg-brand-red" : "bg-brand-blue",
              )}
            >
              <Icon aria-hidden="true" className="size-6" />
              <span className="border-navy text-navy absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-2 bg-white text-xs font-extrabold">
                {step}
              </span>
            </span>
            <p className="mt-4 text-base font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-white/70">{description}</p>
          </li>
        ),
      )}
    </ol>
  );
}
