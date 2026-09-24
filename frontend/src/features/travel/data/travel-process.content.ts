import {
  ClipboardCheck,
  MessageSquare,
  PartyPopper,
  Route,
  type LucideIcon,
} from "lucide-react";

export interface TravelProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "red" | "blue";
}

/** "How It Works" — mirrors the four-step pattern used on the requirements page. */
export const TRAVEL_PROCESS_STEPS: readonly TravelProcessStep[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Tell Us Your Plan",
    description: "Share your destination, dates and preferences with our travel desk.",
    accent: "red",
  },
  {
    step: "02",
    icon: Route,
    title: "We Design Your Journey",
    description: "Our team builds an itinerary around your requirements and budget.",
    accent: "blue",
  },
  {
    step: "03",
    icon: ClipboardCheck,
    title: "Confirm & Prepare",
    description: "Review the plan, confirm bookings, and get ready with our support.",
    accent: "red",
  },
  {
    step: "04",
    icon: PartyPopper,
    title: "Enjoy Your Trip",
    description: "Travel with confidence, backed by our team for the full journey.",
    accent: "blue",
  },
];
