"use client";

import { Quote } from "lucide-react";
import { useState } from "react";

import type { Testimonial } from "@/features/testimonials";
import { cn } from "@/lib/utils";

/**
 * Compact sidebar testimonial with dot navigation. Renders nothing when there
 * are no published testimonials — no client identity or quote is ever invented.
 */
export function SidebarTestimonialCard({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const testimonial = testimonials[index]!;

  return (
    <figure className="shadow-soft rounded-3xl border bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <Quote aria-hidden="true" className="text-brand-red size-6" />
        {testimonial.isSample ? (
          <span className="rounded-full border border-dashed px-2.5 py-1 text-xs font-semibold text-amber-700">
            Sample content
          </span>
        ) : null}
      </div>

      <blockquote className="text-ink mt-3 text-sm leading-relaxed">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="border-border mt-4 border-t pt-3 text-sm">
        <span className="text-ink block font-bold">{testimonial.attribution}</span>
        <span className="text-muted-foreground">{testimonial.context}</span>
      </figcaption>

      {testimonials.length > 1 ? (
        <div className="mt-4 flex items-center gap-1.5">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show testimonial ${itemIndex + 1}`}
              aria-current={itemIndex === index}
              className={cn(
                "size-2 rounded-full transition-colors",
                itemIndex === index ? "bg-brand-red" : "bg-border",
              )}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}
