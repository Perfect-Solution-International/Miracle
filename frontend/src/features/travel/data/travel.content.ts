import {
  BedDouble,
  Briefcase,
  Car,
  Compass,
  FileCheck2,
  Globe2,
  Heart,
  Landmark,
  MapPinned,
  Plane,
  Sparkles,
  Stamp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

import type { TravelPackageType } from "../types/travel-package-detail.types";

export interface TravelHighlight {
  label: string;
  /** Anchor id for a footer/nav link that targets this specific highlight. */
  id?: string;
}

export interface TravelCategory {
  /** Anchor id the overview grid and outside links (nav, footer) target. */
  id: string;
  icon: LucideIcon;
  title: string;
  /** Short line shown on the overview grid card. */
  summary: string;
  /** Longer copy shown in the category's own section. */
  description: string;
  highlights: readonly TravelHighlight[];
}

export const TRAVEL_CATEGORIES: readonly TravelCategory[] = [
  {
    id: "visa",
    icon: Stamp,
    title: "Visa Services",
    summary:
      "Guidance and documentation support for tourist, business and transit visas.",
    description:
      "We help you prepare and submit the right visa application for your trip, so you know exactly what's required before you travel.",
    highlights: [
      { label: "Tourist Visa" },
      { label: "Business Visa" },
      { label: "Transit Visa" },
      { label: "Student Visa" },
      { label: "Multiple-Entry Visa" },
    ],
  },
  {
    id: "flights",
    icon: Plane,
    title: "Flight Tickets",
    summary: "Domestic and international flight bookings at competitive fares.",
    description:
      "Our travel desk compares routes and fares across airlines to find an itinerary that fits your schedule and budget.",
    highlights: [
      { label: "One-way & round-trip bookings" },
      { label: "Multi-city itineraries" },
      { label: "Fare comparison across airlines" },
      { label: "Rebooking & cancellation support" },
    ],
  },
  {
    id: "work-visa",
    icon: FileCheck2,
    title: "Work Visa Support",
    summary: "Documentation and application guidance for employment-based visas.",
    description:
      "From supporting documents to employer sponsorship paperwork, we guide you through what employment visas require.",
    highlights: [
      { label: "Employment visa applications" },
      { label: "Document preparation & checklists" },
      { label: "Employer sponsorship guidance" },
      { label: "Work permit renewals" },
    ],
  },
  {
    id: "accommodation",
    icon: BedDouble,
    title: "Accommodation",
    summary: "Hotel and short-stay accommodation matched to your itinerary and budget.",
    description:
      "We arrange stays near your business or travel destination, from short stopovers to extended assignments.",
    highlights: [
      { label: "Business hotels" },
      { label: "Short & extended stays" },
      { label: "Corporate rates where available" },
      { label: "Location matched to your itinerary" },
    ],
  },
  {
    id: "guides",
    icon: MapPinned,
    title: "Travel Guides",
    summary: "Destination guidance, documentation checklists and local travel tips.",
    description:
      "Practical guidance for the markets we work in — what to expect, what to prepare, and how to get around.",
    highlights: [
      { label: "Destination overviews" },
      { label: "Documentation checklists" },
      { label: "Local customs & etiquette" },
      { label: "On-the-ground travel tips" },
    ],
  },
  {
    id: "transport",
    icon: Car,
    title: "Vehicle Arrangements",
    summary: "Airport transfers, chauffeur-driven cars and vehicle rentals.",
    description:
      "Reliable transport arranged at your destination, from airport pickup to day-to-day travel between meetings.",
    highlights: [
      { label: "Airport transfers" },
      { label: "Chauffeur-driven cars" },
      { label: "Self-drive rentals" },
      { label: "Multi-day hire for business trips" },
    ],
  },
  {
    id: "business-travel",
    icon: Briefcase,
    title: "Business Travel",
    summary: "End-to-end coordination for meetings, conferences and supplier visits.",
    description:
      "We plan and coordinate business trips end-to-end, including visits to suppliers and partner facilities.",
    highlights: [
      { label: "Flight Arrangements" },
      { label: "Business Visa Assistance" },
      { label: "Accommodation" },
      { label: "Airport & Local Transportation" },
      { label: "Supplier & Factory Visits", id: "supplier-visits" },
    ],
  },
];

export interface TravelCategoryCard {
  id: string;
  icon: LucideIcon;
  image: SiteImage;
  title: string;
  description: string;
  href: string;
}

const packagesFilteredBy = (params: Record<string, string>) =>
  `${ROUTES.public.travelTourism}?${new URLSearchParams(params).toString()}#packages`;

/** "Travel Categories" showcase — broader trip types than the service list,
 * each linking to a matching filter on the packages grid or its own section. */
export const TRAVEL_CATEGORY_CARDS: readonly TravelCategoryCard[] = [
  {
    id: "inbound",
    icon: Landmark,
    image: SITE_MEDIA.travelCategoryCards.inbound,
    title: "Inbound Travel",
    description: "Tours, stays and local transport arranged for visitors discovering Sri Lanka.",
    href: packagesFilteredBy({ region: "sri-lanka" }),
  },
  {
    id: "outbound",
    icon: Globe2,
    image: SITE_MEDIA.travelCategoryCards.outbound,
    title: "Outbound Travel",
    description: "Flights, visas and itineraries arranged for travel beyond Sri Lanka.",
    href: packagesFilteredBy({ region: "international" }),
  },
  {
    id: "family-holidays",
    icon: Users,
    image: SITE_MEDIA.travelCategoryCards.familyHolidays,
    title: "Family Holidays",
    description: "Group-friendly itineraries with something for every generation.",
    href: packagesFilteredBy({ type: "family" satisfies TravelPackageType }),
  },
  {
    id: "honeymoon",
    icon: Heart,
    image: SITE_MEDIA.travelCategoryCards.honeymoon,
    title: "Honeymoon",
    description: "Private, romantic escapes for couples celebrating a new chapter.",
    href: packagesFilteredBy({ type: "honeymoon" satisfies TravelPackageType }),
  },
  {
    id: "adventure",
    icon: Compass,
    image: SITE_MEDIA.travelCategoryCards.adventure,
    title: "Adventure Travel",
    description: "Rafting, hiking and safari trips for a more active itinerary.",
    href: packagesFilteredBy({ type: "adventure" satisfies TravelPackageType }),
  },
  {
    id: "business",
    icon: Briefcase,
    image: SITE_MEDIA.travelCategoryCards.business,
    title: "Business Travel",
    description: "End-to-end coordination for meetings, conferences and supplier visits.",
    href: `${ROUTES.public.travelTourism}#business-travel`,
  },
  {
    id: "luxury",
    icon: Sparkles,
    image: SITE_MEDIA.travelCategoryCards.luxury,
    title: "Luxury Travel",
    description: "Five-star stays and private transport for a fully elevated trip.",
    href: `${ROUTES.public.travelTourism}#packages`,
  },
  {
    id: "customized",
    icon: MapPinned,
    image: SITE_MEDIA.travelCategoryCards.customized,
    title: "Customized Tours",
    description: "Tell us your dates, destinations and budget — we'll design around it.",
    href: `${ROUTES.public.travelTourism}#customize-trip`,
  },
];
