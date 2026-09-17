import "server-only";

import { isProduction } from "@/config/environment";

import { MOCK_OPPORTUNITIES } from "../data/mock-opportunities";
import type { Opportunity } from "../types/opportunity.types";

/**
 * Server-side read of featured opportunities for public pages.
 *
 * TODO: Replace with Rust API endpoint when available — a public, cacheable
 * request to `API_ROUTES.opportunities.featured`. Keep this signature so pages
 * and components do not change.
 *
 * Until then, sample listings are returned outside production only, so no
 * placeholder opportunity can reach real visitors.
 */
export async function getFeaturedOpportunities(): Promise<readonly Opportunity[]> {
  return isProduction ? [] : MOCK_OPPORTUNITIES;
}
