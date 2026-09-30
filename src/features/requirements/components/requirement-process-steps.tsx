import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

import { HOW_IT_WORKS_STEPS } from "../data/tell-us-what-you-need.content";

/**
 * 4. How It Works Section
 * Clean white background with 4 clear steps for the Tell Us What You Need workflow.
 */
export function RequirementProcessSteps({ className }: { className?: string }) {
  return (
Imasha
    <section aria-labelledby="how-it-works-heading" className={cn("bg-white py-16 sm:py-20 border-b border-slate-100", className)}>
      <div className="container-page">
        <SectionHeading
          id="how-it-works-heading"
          align="center"
          eyebrow="Simple 4-Step Process"
          title="How It Works"
          description="From your initial requirement submission to verified execution, here is how we handle your request."
        />

        <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
            <div
              key={step}
              className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:border-brand-blue/40 hover:shadow-md text-left"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue font-extrabold text-sm font-mono">
                  0{step}
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Step {step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-navy">
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

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
 develop
  );
}
