import {
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileSearch,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  Layers,
  Laptop,
  Lightbulb,
  PackageCheck,
  Plane,
  Radar,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Ship,
  ShoppingCart,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Warehouse,
} from "lucide-react";

import type { StatHighlightData } from "@/components/common/stat-highlight";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import type { IconItem, ProcessStep, ServicePromo } from "../types/marketing.types";

/**
 * Homepage copy grouped by section.
 *
 * This is approved marketing content, not mock data: it contains no invented
 * figures, customers, or claims. It is kept out of the components so it can
 * move to the CMS without touching layout code.
 */

export const HERO_INDICATORS = [
  "Global Supplier Network",
  "B2B Focused",
  "End-to-End Support",
] as const;

export const TRUST_STRIP_ITEMS: readonly IconItem[] = [
  { icon: Globe2, title: "Global Sourcing" },
  { icon: Warehouse, title: "Wholesale Trading" },
  { icon: Building2, title: "Business Setup" },
  { icon: Ship, title: "Import & Export" },
  { icon: Laptop, title: "IT Solutions" },
  { icon: Plane, title: "Travel & Business Support" },
];

export const COMPANY_INTRO_HIGHLIGHTS: readonly IconItem[] = [
  {
    icon: Globe2,
    title: "Global Network",
    description: "Supplier and partner access across key trading markets.",
  },
  {
    icon: Lightbulb,
    title: "Business Expertise",
    description: "Practical guidance from requirement to operation.",
  },
  {
    icon: Layers,
    title: "End-to-End Solutions",
    description: "Sourcing, logistics, setup, and support in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description: "Clear quotations and visibility at every stage.",
  },
];

export const HOW_IT_WORKS_STEPS: readonly ProcessStep[] = [
  {
    icon: ClipboardList,
    title: "Submit Requirement",
    description:
      "Describe the product or service, quantity, budget, and timeline in one simple form.",
  },
  {
    icon: FileSearch,
    title: "Requirement Review",
    description:
      "Our team reviews the details and clarifies specifications with you where needed.",
  },
  {
    icon: Radar,
    title: "Supplier / Solution Research",
    description:
      "We identify and compare suitable suppliers or service partners for your need.",
  },
  {
    icon: FileText,
    title: "Receive Quotation",
    description:
      "You receive a clear quotation covering pricing, terms, and delivery options.",
  },
  {
    icon: CreditCard,
    title: "Confirm & Pay",
    description: "Approve the quotation and complete payment through a secure process.",
  },
  {
    icon: PackageCheck,
    title: "Delivery / Service Completion",
    description:
      "We coordinate fulfilment and keep you updated until the order is complete.",
  },
];

export const INTERNATIONAL_VALUE_POINTS: readonly IconItem[] = [
  {
    icon: Globe2,
    title: "International supplier access",
    description: "Reach manufacturers and wholesalers beyond local markets.",
  },
  {
    icon: ClipboardCheck,
    title: "Procurement coordination",
    description: "Specifications, negotiation, and purchase handled for you.",
  },
  {
    icon: Ship,
    title: "Import & export assistance",
    description: "Documentation and clearance support for cross-border trade.",
  },
  {
    icon: Building2,
    title: "Business setup support",
    description: "Guidance to establish and equip new operations.",
  },
  {
    icon: Truck,
    title: "Logistics coordination",
    description: "Freight and delivery arranged from origin to destination.",
  },
  {
    icon: Laptop,
    title: "Technology services",
    description: "Digital systems that help businesses operate and grow.",
  },
];

export const BUSINESS_ECOSYSTEM: readonly IconItem[] = [
  {
    icon: Briefcase,
    title: "Business Owners",
    description: "Source stock, equipment, and services from one partner.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurs",
    description: "Turn a business idea into a working operation.",
  },
  {
    icon: TrendingUp,
    title: "Investors",
    description: "Discover and evaluate business opportunities.",
  },
  {
    icon: ShoppingCart,
    title: "Wholesale Buyers",
    description: "Buy in volume with coordinated supply.",
  },
  {
    icon: Handshake,
    title: "Suppliers",
    description: "Connect with qualified buyer requirements.",
  },
  {
    icon: Users,
    title: "International Partners",
    description: "Collaborate on trade across markets.",
  },
];

export const WHY_CHOOSE_ITEMS: readonly IconItem[] = [
  {
    icon: UserRound,
    title: "One Point of Contact",
    description:
      "A single team coordinates every supplier, service provider, and step involved.",
  },
  {
    icon: Globe2,
    title: "Global Supplier Access",
    description: "Sourcing reach across international markets, not a single catalogue.",
  },
  {
    icon: Layers,
    title: "Multiple Business Services",
    description:
      "Trade, setup, technology, and travel support without juggling separate vendors.",
  },
  {
    icon: Search,
    title: "Transparent Quotations",
    description: "Clear, itemised quotations so you can decide with confidence.",
  },
  {
    icon: Route,
    title: "Order Tracking",
    description: "Follow requirements, quotations, and orders from your customer portal.",
  },
  {
    icon: Headphones,
    title: "Professional Support",
    description: "Responsive guidance from enquiry through to completion.",
  },
];

/**
 * Qualitative highlights. Replace with verified figures from the reporting API
 * once approved; the component already accepts numeric values as strings.
 */
export const COMPANY_HIGHLIGHTS: readonly StatHighlightData[] = [
  {
    value: "Global",
    label: "Supplier Sourcing",
    description: "Access to suppliers across international markets.",
  },
  {
    value: "B2B",
    label: "Business Focus",
    description: "Built around the needs of businesses and buyers.",
  },
  {
    value: "End-to-End",
    label: "Business Support",
    description: "From first requirement to final delivery.",
  },
  {
    value: "Multi-Service",
    label: "Platform",
    description: "Trade, setup, travel, and technology together.",
  },
];

export const SECONDARY_SERVICE_PROMOS: readonly ServicePromo[] = [
  {
    eyebrow: "Travel & Tourism",
    title: "Travel arranged around your business",
    description:
      "From visa guidance to supplier factory visits, we organise the travel that international trade depends on.",
    image: SITE_MEDIA.businessTravel,
    items: [
      "Visa Assistance",
      "Flight Ticketing",
      "Hotels",
      "Transport",
      "Business Travel",
      "Supplier / Factory Visits",
    ],
    cta: { label: "Explore Travel Services", href: ROUTES.public.travelTourism },
  },
  {
    eyebrow: "IT Solutions",
    title: "Technology that helps business run",
    description:
      "Digital systems for trading, retail, and service companies, delivered and supported by our technology team.",
    image: SITE_MEDIA.technology,
    items: [
      "Website Development",
      "Mobile Applications",
      "POS Systems",
      "Business Software",
      "IT Consulting",
    ],
    cta: { label: "Explore IT Solutions", href: ROUTES.public.itSolutions },
  },
];

export const HERO_PROGRESS_PREVIEW = [
  { label: "Requirement received", icon: BadgeCheck, state: "done" },
  { label: "Suppliers compared", icon: BadgeCheck, state: "done" },
  { label: "Quotation in preparation", icon: FileText, state: "current" },
] as const;
