export interface PathwayStage {
  title: string;
  description: string;
  deliverables: readonly string[];
}

/** "Idea to operation" journey. Approved copy; CMS candidate. */
export const BUSINESS_PATHWAY: readonly PathwayStage[] = [
  {
    title: "Consultation",
    description: "Understand the goal, market, budget, and constraints.",
    deliverables: ["Requirement brief", "Initial guidance"],
  },
  {
    title: "Business Planning",
    description: "Shape the model, cost plan, and setup roadmap.",
    deliverables: ["Setup roadmap", "Cost outline"],
  },
  {
    title: "Supplier & Machinery Sourcing",
    description: "Source equipment, machinery, and raw materials.",
    deliverables: ["Supplier options", "Quotations"],
  },
  {
    title: "Setup & Technology",
    description: "Premises, installation, systems, and software.",
    deliverables: ["Installation", "POS & software"],
  },
  {
    title: "Launch & Growth",
    description: "Open for business, then expand with ongoing support.",
    deliverables: ["Marketing support", "Expansion planning"],
  },
];
