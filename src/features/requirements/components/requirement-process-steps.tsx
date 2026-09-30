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
            className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lift"
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
              <span className="text-brand-blue border-brand-blue/20 bg-brand-blue-light rounded-full border px-3 py-1 text-xs font-black tracking-widest">
                0{step}
              </span>
            </div>

            {/* Title & Description */}
            <div className="mt-6">
              <h3 className="text-ink group-hover:text-brand-blue text-lg font-extrabold transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Step Check indicator */}
            <div className="text-brand-blue mt-auto flex items-center gap-1.5 pt-6 text-xs font-bold">
              <CheckCircle2 className="size-3.5" />
              <span>Step 0{step} of 04</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
