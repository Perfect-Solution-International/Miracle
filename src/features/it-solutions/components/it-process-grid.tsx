import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ItProcessGrid({
  eyebrow,
  title,
  description,
  steps,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  steps: readonly ProcessStep[];
  compact?: boolean;
}) {
  return (
    <Section className="bg-white" aria-labelledby="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />
      <ol className={`mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 ${compact ? "" : "md:grid-cols-2"}`}>
        {steps.map((item) => (
          <li
            key={item.step}
            className="reveal rounded-2xl public-card-clickable p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-brand-blue bg-brand-blue-light inline-flex size-11 items-center justify-center rounded-lg">
                <item.icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-brand-blue/50 text-3xl font-extrabold">{item.step}</span>
            </div>
            <h3 className="text-ink mt-5 text-lg font-bold">{item.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

