import {
  Building2,
  Globe2,
  Laptop,
  Megaphone,
  Plane,
  Ship,
  TrendingUp,
  Warehouse,
} from "lucide-react";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import type { ServiceSummary } from "../types/marketing.types";

/** Homepage service overview. Static approved copy; CMS candidate. */
export const CORE_SERVICES: readonly ServiceSummary[] = [
  {
    id: "global-sourcing",
    title: "Global Product Sourcing",
    description:
      "Tell us the product, specification, and quantity. We identify suitable suppliers across international markets, compare offers, and manage the purchase through to delivery.",
    href: ROUTES.public.globalSourcing,
    icon: Globe2,
    image: SITE_MEDIA.portAerial,
    featured: true,
  },
  {
    id: "wholesale",
    title: "Wholesale Trading",
    description: "Bulk supply of consumer and industrial goods on negotiated terms.",
    href: ROUTES.public.servicesTrading,
    icon: Warehouse,
  },
  {
    id: "import-export",
    title: "Import & Export",
    description: "Documentation, clearance, and freight coordination across borders.",
    href: ROUTES.public.servicesImportExport,
    icon: Ship,
  },
  {
    id: "business-setup",
    title: "Business Setup",
    description: "Registration, premises, equipment, and systems for new ventures.",
    href: ROUTES.public.businessSolutions,
    icon: Building2,
  },
  {
    id: "investment-franchise",
    title: "Investment & Franchise",
    description: "Explore, evaluate, and structure business opportunities.",
    href: ROUTES.public.servicesInvestment,
    icon: TrendingUp,
  },
  {
    id: "travel-visa",
    title: "Travel & Visa",
    description: "Business travel, visa guidance, and supplier factory visits.",
    href: ROUTES.public.travelTourism,
    icon: Plane,
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    description: "Websites, mobile apps, POS, and business software.",
    href: ROUTES.public.itSolutions,
    icon: Laptop,
  },
  {
    id: "business-support",
    title: "Advertising & Business Support",
    description: "Promotion, branding, and day-to-day operational support.",
    href: ROUTES.public.servicesMarketingAdvertising,
    icon: Megaphone,
  },
];
