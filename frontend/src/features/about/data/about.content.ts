import {
  Eye,
  Gem,
  Globe,
  Handshake,
  Package,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import type {
  CompanyStat,
  MarketPin,
  PrincipleItem,
  TimelineMilestone,
} from "../types/about.types";

export const MISSION_VISION_VALUES: readonly PrincipleItem[] = [
  {
    icon: Handshake,
    title: "Our Mission",
    id: "mission",
    description:
      "To empower businesses by providing reliable global sourcing, trading and business solutions.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    id: "vision",
    description:
      "To be a leading international business solutions provider, recognized for trust, innovation and customer success.",
  },
  {
    icon: Gem,
    title: "Our Values",
    bullets: [
      "Integrity",
      "Customer Focus",
      "Global Mindset",
      "Innovation",
      "Excellence",
      "Long-term Partnerships",
    ],
  },
];

/**
 * Headline figures for the trust band.
 *
 * TODO: These are placeholder figures pending sign-off from the business team
 * and a verified source (reporting API or audited company data). Do not treat
 * as published claims until confirmed — see COMPANY_HIGHLIGHTS in
 * `features/marketing/data/home.content.ts` for the qualitative alternative
 * used elsewhere until real numbers are approved.
 */
export const COMPANY_STATS: readonly CompanyStat[] = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Package, value: "10,000+", label: "Products Sourced" },
  { icon: Globe, value: "50+", label: "Countries Connected" },
  { icon: TrendingUp, value: "100+", label: "Business Projects" },
  { icon: ShieldCheck, value: "99%", label: "Client Satisfaction" },
];

export const COMPANY_TIMELINE: readonly TimelineMilestone[] = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Started as a product sourcing initiative in Sri Lanka.",
  },
  {
    year: "2020",
    title: "Expanding Services",
    description: "Added import/export and wholesale solutions.",
  },
  {
    year: "2022",
    title: "Going Global",
    description: "Partnered with international suppliers and clients.",
  },
  {
    year: "2024",
    title: "A Broader Vision",
    description: "Expanded into business solutions, travel, IT services and more.",
  },
  {
    year: "Today",
    title: "Building Tomorrow",
    description: "Continuing to create opportunities for businesses worldwide.",
    current: true,
  },
];

/**
 * Approximate marker positions on the illustrative map, not surveyed
 * coordinates. `MARKET_HUB` is the point every route line originates from.
 */
export const MARKET_HUB: MarketPin = { label: "Sri Lanka", x: 68, y: 62 };

export const MARKET_DESTINATIONS: readonly MarketPin[] = [
  { label: "China", x: 78, y: 32 },
  { label: "India", x: 63, y: 48 },
  { label: "UAE", x: 55, y: 44 },
  { label: "United Kingdom", x: 34, y: 22 },
  { label: "Australia", x: 84, y: 82 },
];
