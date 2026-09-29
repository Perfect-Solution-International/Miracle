import { Quote } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

import { getPublishedTestimonials } from "../api/testimonial.service";
import type { Testimonial } from "../types/testimonial.types";

function TestimonialCard({
  testimonial,
  emphasis,
}: {
  testimonial: Testimonial;
  emphasis: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col gap-8 rounded-2xl border p-7 sm:p-8",
        emphasis
          ? "bg-brand-blue border-brand-blue text-white"
          : "bg-surface border-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Quote
          aria-hidden="true"
          className={cn("size-8", emphasis ? "text-white/40" : "text-brand-red")}
        />
        {testimonial.isSample ? (
          <span
            className={cn(
              "rounded-full border border-dashed px-3 py-1 text-xs font-semibold",
              emphasis ? "border-white/40 text-white/80" : "text-amber-700",
            )}
          >
            Sample content
          </span>
        ) : null}
      </div>
      <blockquote
        className={cn(
          "text-lg leading-relaxed font-medium",
          emphasis ? "text-white" : "text-ink",
        )}
      >
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption
        className={cn(
          "mt-auto border-t pt-5 text-sm",
          emphasis ? "border-white/20" : "border-border",
        )}
      >
        <span className={cn("block font-bold", emphasis ? "text-white" : "text-ink")}>
          {testimonial.attribution}
        </span>
        <span className={emphasis ? "text-white/70" : "text-muted-foreground"}>
          {testimonial.context}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Renders only when published testimonials exist. No invented client
 * identities or claims are ever shown to real visitors.
 */
export async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <Section aria-labelledby="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Client Voices"
        title="What Our Clients Say"
        align="center"
      />
      <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <li key={testimonial.id} className="reveal">
            <TestimonialCard testimonial={testimonial} emphasis={index === 1} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
