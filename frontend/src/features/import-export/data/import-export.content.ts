import { BarChart3, Globe, Ship } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TradeHighlight {
  icon: LucideIcon;
  label: string;
}

/** Supporting stats shown beside the hero copy. Approved copy; CMS candidate. */
export const TRADE_HIGHLIGHTS: readonly TradeHighlight[] = [
  { icon: Globe, label: "Sourcing Without Limits" },
  { icon: Ship, label: "Goods Across Borders" },
  { icon: BarChart3, label: "Stronger Businesses Together" },
];

/** Source / destination countries offered in the request form. */
export const TRADE_COUNTRIES: readonly string[] = [
  "China",
  "India",
  "United Arab Emirates",
  "Sri Lanka",
  "Singapore",
  "United States",
  "United Kingdom",
  "Germany",
  "Vietnam",
  "Bangladesh",
  "Malaysia",
  "Thailand",
  "Turkey",
  "South Korea",
  "Japan",
];
