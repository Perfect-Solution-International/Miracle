import type { Opportunity } from "../types/opportunity.types";

/**
 * Placeholder listings for layout work only. Never served in production (see
 * `opportunity.service.ts`), and flagged `isSample` so the UI labels them.
 *
 * TODO: Replace with Rust API endpoint when available.
 */
export const MOCK_OPPORTUNITIES: readonly Opportunity[] = [
  {
    id: "sample-investment-1",
    slug: "sample-food-processing-investment",
    type: "investment",
    title: "Food Processing Facility",
    sector: "Manufacturing",
    location: "Sri Lanka",
    summary:
      "Sample listing showing how an investment opportunity summary, sector, and location will appear.",
    investmentLabel: "On request",
    isSample: true,
  },
  {
    id: "sample-franchise-1",
    slug: "sample-retail-franchise",
    type: "franchise",
    title: "Retail Franchise Expansion",
    sector: "Retail",
    location: "Multiple locations",
    summary:
      "Sample listing showing how a franchise opportunity will be presented to prospective partners.",
    investmentLabel: "On request",
    isSample: true,
  },
  {
    id: "sample-business-1",
    slug: "sample-distribution-business",
    type: "business",
    title: "Regional Distribution Business",
    sector: "Wholesale & Distribution",
    location: "Sri Lanka",
    summary:
      "Sample listing showing how an established business opportunity will be summarised.",
    investmentLabel: "On request",
    isSample: true,
  },
];
