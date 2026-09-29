/** Public surface of the opportunities feature. */
export {
  FeaturedOpportunitiesSection,
  FeaturedOpportunitiesSkeleton,
} from "./components/featured-opportunities-section";
export { OpportunityCard } from "./components/opportunity-card";
export { getFeaturedOpportunities } from "./api/opportunity.service";
export {
  OPPORTUNITY_TYPE_LABELS,
  type Opportunity,
  type OpportunityType,
} from "./types/opportunity.types";
