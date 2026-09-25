import type { LucideIcon } from "lucide-react";

export interface PrincipleItem {
  icon: LucideIcon;
  title: string;
  /** Anchor id for a nav link that targets this specific card. */
  id?: string;
  /** Either a short paragraph or a list of values, never both. */
  description?: string;
  bullets?: readonly string[];
}

export interface CompanyStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  /** The one open-ended, present-day milestone, highlighted in the rail. */
  current?: boolean;
}

export interface MarketPin {
  label: string;
  /** Position as a percentage of the map's width/height, top-left origin. */
  x: number;
  y: number;
}
