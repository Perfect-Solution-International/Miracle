import {
  BedDouble,
  Briefcase,
  Car,
  FileCheck2,
  Globe2,
  Landmark,
  MapPinned,
  Plane,
  Sparkles,
  Stamp,
  Umbrella,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

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

export interface TravelType {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
}

/** "Choose Your Travel Type" cards. */
export const TRAVEL_TYPES: readonly TravelType[] = [
  {
    icon: Landmark,
    title: "Inbound Travel",
    subtitle: "Explore Sri Lanka",
    description:
      "Tours, stays and local transport arranged for visitors discovering Sri Lanka.",
  },
  {
    icon: Globe2,
    title: "Outbound Travel",
    subtitle: "Explore the World",
    description: "Flights, visas and itineraries arranged for travel beyond Sri Lanka.",
  },
];

export interface TravelPackage {
  icon: LucideIcon;
  image: SiteImage;
  title: string;
  description: string;
  cta: string;
  /** Present only for packages with a full detail page at `ROUTES.public.travelPackage(slug)`. */
  slug?: string;
}

/** "Featured Travel Packages" cards. Illustrative categories, not fixed
 * bookable inventory — every card leads to the inquiry form. */
export const TRAVEL_PACKAGES: readonly TravelPackage[] = [
  {
    icon: MapPinned,
    image: SITE_MEDIA.travelPackages.sriLankaExplorer,
    title: "Sri Lanka Explorer",
    description:
      "A multi-day itinerary covering Sri Lanka's key highlights, customized to your dates.",
    cta: "View Package",
    slug: "sri-lanka-explorer",
  },
  {
    icon: Globe2,
    image: SITE_MEDIA.travelPackages.internationalEscape,
    title: "International Escape",
    description: "Flights, stay and local transport bundled for a getaway abroad.",
    cta: "View Package",
  },
  {
    icon: Briefcase,
    image: SITE_MEDIA.travelPackages.businessTravelPackage,
    title: "Business Travel",
    description:
      "Flights, accommodation and transport planned around your meeting schedule.",
    cta: "View Package",
  },
  {
    icon: Umbrella,
    image: SITE_MEDIA.travelPackages.beachAndLeisure,
    title: "Beach & Leisure",
    description: "Coastal stays and leisure itineraries for a relaxed getaway.",
    cta: "View Package",
  },
  {
    icon: Users,
    image: SITE_MEDIA.travelPackages.familyAndGroupEscape,
    title: "Family & Group Escape",
    description:
      "Group-friendly itineraries with accommodation and transport for everyone.",
    cta: "View Package",
  },
  {
    icon: Sparkles,
    image: SITE_MEDIA.travelPackages.customTravelPackage,
    title: "Custom Travel Package",
    description:
      "Tell us your dates, destinations and budget — we'll put together a package around it.",
    cta: "Request Now",
  },
];
