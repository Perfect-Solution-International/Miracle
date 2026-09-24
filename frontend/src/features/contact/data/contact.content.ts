import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { APP_CONFIG } from "@/config/app";

import type { ContactChannel } from "../types/contact.types";

/**
 * Built from `APP_CONFIG.support`, the single source of truth for these
 * details (see the TODO there pending the approved company values) — never
 * duplicated or invented here.
 */
export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    icon: Phone,
    tone: "blue",
    title: "Phone",
    lines: [APP_CONFIG.support.phone],
    href: `tel:${APP_CONFIG.support.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: Mail,
    tone: "red",
    title: "Email",
    lines: [APP_CONFIG.support.email],
    href: `mailto:${APP_CONFIG.support.email}`,
  },
  {
    icon: MapPin,
    tone: "blue",
    title: "Office Address",
    lines: [APP_CONFIG.support.address],
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(APP_CONFIG.support.address)}`,
  },
  {
    icon: Clock,
    tone: "red",
    title: "Business Hours",
    lines: [APP_CONFIG.support.hours],
  },
];

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Product Sourcing",
  "Import / Export",
  "Wholesale & Products",
  "Business Solutions",
  "Partnership",
  "Support",
  "Other",
] as const;
