import "server-only";

import { isProduction } from "@/config/environment";

import { MOCK_TESTIMONIALS } from "../data/mock-testimonials";
import type { Testimonial } from "../types/testimonial.types";

/**
 * Server-side read of published testimonials.
 *
 * TODO: Replace with CMS endpoint (`API_ROUTES.cms.testimonials`) when
 * available. Placeholders are returned outside production only; in production
 * the list is empty and the section does not render.
 */
export async function getPublishedTestimonials(): Promise<readonly Testimonial[]> {
  return isProduction ? [] : MOCK_TESTIMONIALS;
}
