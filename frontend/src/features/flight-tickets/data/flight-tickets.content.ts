import { Globe2, PlaneTakeoff, Repeat, Sparkles, Users, type LucideIcon } from "lucide-react";

export interface FlightAssistanceFeature {
  icon: LucideIcon;
  title: string;
}

/** "Flight Ticket Assistance" feature list — kept short by design. */
export const FLIGHT_ASSISTANCE_FEATURES: readonly FlightAssistanceFeature[] = [
  { icon: Globe2, title: "Domestic & International Flights" },
  { icon: Repeat, title: "One-Way & Round-Trip Travel" },
  { icon: PlaneTakeoff, title: "Economy, Business & First Class" },
  { icon: Users, title: "Individual & Group Travel" },
  { icon: Sparkles, title: "Personalized Flight Assistance" },
];

export const TRAVEL_CLASS_OPTIONS: readonly string[] = ["Economy", "Business", "First Class"];
