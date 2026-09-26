import {
  FileCheck2,
  Globe2,
  Landmark,
  Plane,
  SlidersHorizontal,
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

/** "Travel Services" — the 6 core services for Travel & Tourism. */
export const TRAVEL_SERVICE_CARDS: readonly TravelServiceCard[] = [
  {
    icon: Landmark,
    title: "Inbound Tours",
    description:
      "Curated journeys across Sri Lanka, from cultural heritage and tea hills to pristine beaches and wildlife.",
    cta: "Explore Service",
    href: ROUTES.public.inboundTravel,
  },
  {
    icon: Globe2,
    title: "Outbound Tours",
    description:
      "Handcrafted international holidays, family trips, and honeymoon packages to destinations worldwide.",
    cta: "Explore Service",
    href: ROUTES.public.outboundTravel,
  },
  {
    icon: SlidersHorizontal,
    title: "Customized Trips",
    description:
      "Bespoke travel itineraries tailored to your dates, interests, preferred destinations, and style.",
    cta: "Plan Your Trip",
    href: `${ROUTES.public.travelTourism}#customize-trip`,
  },
  {
    icon: Plane,
    title: "Flight Tickets",
    description:
      "Competitive domestic and international airfares with route options and airline booking support.",
    cta: "Book Flights",
    href: ROUTES.public.flightTickets,
  },
  {
    icon: Stamp,
    title: "Visa & Passport Assistance",
    description:
      "Expert guidance for tourist, business, and transit visa applications and documentation.",
    cta: "Get Visa Help",
    href: ROUTES.public.visaServices,
  },
  {
    icon: FileCheck2,
    title: "Work Visa Support",
    description:
      "Professional assistance with work visa categories, embassy requirements, and document preparation.",
    cta: "View Support",
    href: ROUTES.public.workVisa,
  },
];
