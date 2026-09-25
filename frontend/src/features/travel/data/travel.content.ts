import {
  FileCheck2,
  Globe2,
  Landmark,
  Plane,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/config/routes";

export interface TravelServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
}

/** "Travel Services" — the five core services, each with its own dedicated page. */
export const TRAVEL_SERVICE_CARDS: readonly TravelServiceCard[] = [
  {
    icon: Landmark,
    title: "Inbound Travel (Sri Lanka)",
    description:
      "Discover Sri Lanka with customized tours, local experiences and complete travel support.",
    cta: "Explore Sri Lanka",
    href: ROUTES.public.inboundTravel,
  },
  {
    icon: Globe2,
    title: "Outbound Travel",
    description: "Plan your international journey with travel assistance tailored to your destination.",
    cta: "Explore",
    href: ROUTES.public.outboundTravel,
  },
  {
    icon: Stamp,
    title: "Visa Services",
    description: "Get guidance and assistance for your travel visa requirements.",
    cta: "Explore",
    href: ROUTES.public.visaServices,
  },
  {
    icon: Plane,
    title: "Flight Tickets",
    description: "Find flight options for your domestic and international journeys.",
    cta: "Explore",
    href: ROUTES.public.flightTickets,
  },
  {
    icon: FileCheck2,
    title: "Work Visa Support",
    description: "Get guidance for work-related travel and visa requirements.",
    cta: "Explore",
    href: ROUTES.public.workVisa,
  },
];
