"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { HELP_CATEGORIES } from "../data/tell-us-what-you-need.content";

export interface WhatCanWeHelpSectionProps {
  onSelectCategory?: (category: string) => void;
}

/**
 * 2. What Can We Help You With? Section
 * Clean selectable cards for 11 core categories using simple icons instead of images.
 */
export function WhatCanWeHelpSection({ onSelectCategory }: WhatCanWeHelpSectionProps) {
  const handleClick = (categoryValue: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryValue);
    }
    const formEl = document.getElementById("requirement-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section aria-labelledby="help-categories-heading" className="bg-white py-16 sm:py-20 border-b border-slate-100">
      <div className="container-page">
        <SectionHeading
          id="help-categories-heading"
          align="center"
          eyebrow="What Can We Help You With?"
          title="Select Your Requirement Category"
          description="Click any category below to jump straight to the requirement form with your sector pre-selected."
        />

        <div className="mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 max-w-7xl">
          {HELP_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClick(cat.value)}
                className="group relative flex flex-col items-start text-left rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-md cursor-pointer"
              >
                {/* Icon Container */}
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white mb-3.5">
                  <Icon className="size-5.5" />
                </div>

                <h3 className="text-base font-bold text-navy group-hover:text-brand-blue transition-colors">
                  {cat.title}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {cat.description}
                </p>

                <div className="mt-4 pt-2 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-brand-blue">
                  <span>Select this category</span>
                  <span className="text-base leading-none group-hover:translate-x-1 transition-transform">›</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
