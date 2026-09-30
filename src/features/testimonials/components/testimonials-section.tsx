import { Quote } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { getPublishedTestimonials } from "../api/testimonial.service";
import type { Testimonial } from "../types/testimonial.types";

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure
      className="relative flex h-full flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <Quote aria-hidden="true" className="text-brand-blue size-8" />
        {testimonial.isSample ? (
          <span
            className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-xs font-semibold text-amber-700"
          >
            Sample content
          </span>
        ) : null}
      </div>
      <blockquote className="text-ink text-lg leading-relaxed font-medium">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-auto border-t border-slate-200 pt-5 text-sm">
        <span className="text-ink block font-bold">
          {testimonial.attribution}
        </span>
        <span className="text-muted-foreground">
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
        {testimonials.slice(0, 3).map((testimonial) => (
          <li key={testimonial.id} className="reveal">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
