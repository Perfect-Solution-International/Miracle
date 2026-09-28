import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { HOW_IT_WORKS_STEPS } from "../data/tell-us-what-you-need.content";

/**
 * High-end visual 4-step workflow for the intake page.
 * Cards with frosted glass styling, glow badges, and clear stage titles.
 */
export function RequirementProcessSteps({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {HOW_IT_WORKS_STEPS.map(({ step, icon: Icon, title, description, accent }, index) => {
        return (
          <div
            key={step}
            className="group relative flex flex-col rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl text-left"
          >
            {/* Top Row: Icon + Step Pill */}
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl text-white shadow-md",
                  accent === "red"
                    ? "bg-gradient-to-tr from-brand-red to-red-500 shadow-brand-red/30"
                    : "bg-gradient-to-tr from-brand-blue to-indigo-600 shadow-brand-blue/30",
                )}
              >
                <Icon className="size-6" />
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black tracking-widest text-white/90">
                0{step}
              </span>
            </div>

            {/* Title & Description */}
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-white group-hover:text-brand-blue-muted transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {description}
              </p>
            </div>

            {/* Step Check indicator */}
            <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-bold text-brand-blue-muted">
              <CheckCircle2 className="size-3.5" />
              <span>Step 0{step} of 04</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
