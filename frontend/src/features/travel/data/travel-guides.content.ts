import {
  FileCheck2,
  Info,
  Lightbulb,
  MapPinned,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/config/routes";

export interface TravelGuideCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

/** "Travel Guides & Inspiration" — links into existing pages/sections rather
 * than a content hub that doesn't exist yet. */
export const TRAVEL_GUIDE_CARDS: readonly TravelGuideCard[] = [
  {
    icon: Stamp,
    title: "Visa Guides",
    description: "What each visa type needs, and how to apply before you travel.",
    href: `${ROUTES.public.travelTourism}#visa`,
  },
  {
    icon: MapPinned,
    title: "Destination Guides",
    description: "An overview of what to expect at every destination we cover.",
    href: `${ROUTES.public.travelTourism}#destinations`,
  },
  {
    icon: Lightbulb,
    title: "Travel Tips",
    description: "Practical advice for a smoother trip, from packing to local customs.",
    href: ROUTES.public.faq,
  },
  {
    icon: FileCheck2,
    title: "Travel Requirements",
    description: "Entry requirements, documentation and what to prepare in advance.",
    href: `${ROUTES.public.travelTourism}#visa`,
  },
  {
    icon: Info,
    title: "Things to Know Before You Travel",
    description: "Currency, climate and other essentials for your destination.",
    href: ROUTES.public.faq,
  },
];
