/** Business opportunity listing. Mirrors the planned `/opportunities` resource. */
export type OpportunityType = "investment" | "franchise" | "business";

export interface Opportunity {
  id: string;
  slug: string;
  type: OpportunityType;
  title: string;
  sector: string;
  location: string;
  summary: string;
  /** Free text such as "On request". Never a promised return. */
  investmentLabel: string;
  /** Development-only marker for placeholder listings. Absent in API data. */
  isSample?: boolean;
}

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  investment: "Investment",
  franchise: "Franchise",
  business: "Business",
};
