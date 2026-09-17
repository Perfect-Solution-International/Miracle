import type { ProcessStep } from "@/features/marketing";

export interface SourcingMarket {
  code: string;
  name: string;
  focus: string;
}

/** Markets we source from. Approved copy; CMS candidate. */
export const SOURCING_MARKETS: readonly SourcingMarket[] = [
  { code: "CN", name: "China", focus: "Machinery, electronics, industrial goods" },
  { code: "IN", name: "India", focus: "Textiles, raw materials, equipment" },
  { code: "AE", name: "UAE", focus: "Regional trade and re-export hub" },
  { code: "+", name: "Other Markets", focus: "Specialist suppliers worldwide" },
];

export const SOURCING_PROCESS: readonly ProcessStep[] = [
  {
    title: "Tell Us What You Need",
    description: "Share the product, specifications, and quantity.",
  },
  {
    title: "We Identify Suitable Suppliers",
    description: "We shortlist suppliers that match your requirement.",
  },
  {
    title: "Compare Quotations",
    description: "Review clear offers side by side before deciding.",
  },
  {
    title: "Arrange Purchase & Logistics",
    description: "We coordinate the order, shipping, and clearance.",
  },
  {
    title: "Delivery / Completion",
    description: "Goods arrive and the order is closed out with you.",
  },
];
