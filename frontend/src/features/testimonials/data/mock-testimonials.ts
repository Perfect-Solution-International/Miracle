import type { Testimonial } from "../types/testimonial.types";

/**
 * Placeholder testimonials for layout work only. They describe no real person
 * or organisation, carry `isSample` so the UI labels them, and are never served
 * in production (see `testimonial.service.ts`).
 *
 * TODO: Replace with CMS testimonials endpoint when available.
 */
export const MOCK_TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "sample-1",
    quote:
      "Placeholder testimonial. Approved client feedback about the sourcing experience will appear here.",
    attribution: "Client role, Company type",
    context: "Global Sourcing",
    isSample: true,
  },
  {
    id: "sample-2",
    quote:
      "Placeholder testimonial. Approved client feedback about business setup support will appear here.",
    attribution: "Client role, Company type",
    context: "Business Solutions",
    isSample: true,
  },
  {
    id: "sample-3",
    quote:
      "Placeholder testimonial. Approved client feedback about wholesale supply will appear here.",
    attribution: "Client role, Company type",
    context: "Wholesale Trading",
    isSample: true,
  },
];
