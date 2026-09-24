import {
  Briefcase,
  Handshake,
  MapPinned,
  Sparkles,
  Stamp,
  Headset,
  type LucideIcon,
} from "lucide-react";

export interface WhyChooseUsFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** "Travel With Confidence" feature grid. */
export const WHY_CHOOSE_US_FEATURES: readonly WhyChooseUsFeature[] = [
  {
    icon: MapPinned,
    title: "Personalized Travel Planning",
    description: "Every itinerary is built around your dates, budget and preferences.",
  },
  {
    icon: Headset,
    title: "Complete Travel Support",
    description: "One point of contact from planning through to your return home.",
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    description: "Guidance and documentation support for tourist and business visas.",
  },
  {
    icon: Handshake,
    title: "Reliable Travel Partners",
    description: "A trusted network of hotels, guides and transport across every destination.",
  },
  {
    icon: Sparkles,
    title: "Customized Packages",
    description: "No fixed inventory — every package can be adjusted to fit your trip.",
  },
  {
    icon: Briefcase,
    title: "Business & Leisure Travel",
    description: "The same coordination and care, whether you're travelling to work or unwind.",
  },
];
