"use client";

import { useState } from "react";

import { RequirementInquiryForm } from "./requirement-inquiry-form";
import { RequirementProcessSteps } from "./requirement-process-steps";
import { TellUsWhatYouNeedFinalCta } from "./tell-us-what-you-need-final-cta";
import { TellUsWhatYouNeedHero } from "./tell-us-what-you-need-hero";
import { WhatCanWeHelpSection } from "./what-can-we-help-section";

/**
 * Complete Clean White "Tell Us What You Need" Page View
 * Structure:
 * 1. Hero Section
 * 2. What Can We Help You With? (11 selectable category cards)
 * 3. Requirement Form
 * 4. How It Works (4 simple steps)
 * 5. Final CTA
 */
export function TellUsWhatYouNeedView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* 1. Hero Section */}
      <TellUsWhatYouNeedHero />

      {/* 2. What Can We Help You With? (11 category cards) */}
      <WhatCanWeHelpSection
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

      {/* 3. Requirement Form Section */}
      <section className="bg-slate-50/60 py-16 sm:py-20 border-b border-slate-100">
        <div className="container-page">
          <RequirementInquiryForm preselectedCategory={selectedCategory} />
        </div>
      </section>

      {/* 4. How It Works (4 steps) */}
      <RequirementProcessSteps />
    </div>
  );
}

