import type { LucideIcon } from "lucide-react";

export interface ContactChannel {
  icon: LucideIcon;
  tone: "blue" | "red";
  title: string;
  /** One or more lines shown under the title (e.g. two phone numbers). */
  lines: readonly string[];
  /** Omitted for details with no meaningful destination (e.g. business hours). */
  href?: string;
}
