import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { HOW_IT_WORKS_STEPS } from "../data/home.content";

/**
 * Six-step process as a vertical timeline beside a sticky introduction, so the
 * sequence reads as one flow rather than a grid of unrelated cards.
 */
export function HowItWorksSection() {
  return (
    <Section aria-labelledby="how-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="how-heading"
              eyebrow="How It Works"
              title={
                <>
                  Tell Us What You Need.{" "}
                  <span className="text-brand-blue">We Coordinate the Solution.</span>
                </>
              }
              description="A clear, trackable process from the moment you share a requirement to the day it is delivered or completed."
            >
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button asChild size="xl" className="hover:bg-brand-blue-dark">
                  <Link href={ROUTES.public.tellUsWhatYouNeed}>
                    Submit a Requirement
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="ghost" className="text-brand-blue">
                  <Link href={ROUTES.public.howItWorks}>See the full process</Link>
                </Button>
              </div>
            </SectionHeading>
          </div>
        </div>

        <ol className="relative lg:col-span-7">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
            return (
              <li
                key={step.title}
                className="reveal group relative flex gap-5 pb-10 last:pb-0 sm:gap-8"
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="bg-border absolute top-14 bottom-0 left-7 w-px"
                  />
                ) : null}
                <span className="border-brand-blue/20 text-brand-blue group-hover:bg-brand-blue group-hover:border-brand-blue relative inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border bg-white transition-colors duration-300 group-hover:text-white">
                  {Icon ? <Icon aria-hidden="true" className="size-6" /> : null}
                  {index === 0 ? (
                    <span
                      aria-hidden="true"
                      className="bg-brand-red absolute -top-1 -right-1 size-3 rounded-full ring-4 ring-white"
                    />
                  ) : null}
                </span>
                <div className="bg-surface group-hover:border-brand-blue/20 flex-1 rounded-2xl border border-transparent p-6 transition-colors duration-300">
                  <p className="text-brand-red text-xs font-extrabold tracking-[0.16em]">
                    STEP {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-ink mt-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
