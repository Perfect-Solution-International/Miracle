import type { RequirementStatus } from "@/lib/constants/statuses/requirement-status";
import type { CurrencyCode, IsoDateTime } from "@/types/common.types";
import type { ListQuery } from "@/types/pagination.types";

/** A buyer's sourcing request: "tell us what you need". */
export interface Requirement {
  id: string;
  reference: string;
  status: RequirementStatus;
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  targetCurrency: CurrencyCode;
  targetUnitPriceMinor?: number;
  destinationCountry: string;
  requiredBy?: IsoDateTime;
  customerId: string;
  customerName: string;
  attachmentIds: string[];
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type RequirementSummary = Omit<Requirement, "description" | "attachmentIds">;

export interface RequirementFilters extends ListQuery {
  status?: RequirementStatus;
  category?: string;
  customerId?: string;
}
