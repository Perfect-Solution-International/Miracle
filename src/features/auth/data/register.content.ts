import { REGISTRABLE_ACCOUNT_TYPES } from "../schemas/register.schema";

/** Human-readable labels for the account types a visitor may self-register as. */
export const ACCOUNT_TYPE_LABELS: Record<
  (typeof REGISTRABLE_ACCOUNT_TYPES)[number],
  string
> = {
  customer: "Customer",
  business_owner: "Business Owner",
  entrepreneur: "Entrepreneur",
  investor: "Investor",
  supplier: "Supplier",
};

/** Account types that trade as a company, so `companyName` is required for them. */
export const COMPANY_REQUIRED_ACCOUNT_TYPES = new Set<
  (typeof REGISTRABLE_ACCOUNT_TYPES)[number]
>(["business_owner", "supplier"]);
