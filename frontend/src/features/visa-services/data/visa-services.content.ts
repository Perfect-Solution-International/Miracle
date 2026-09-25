import {
  Briefcase,
  FileCheck2,
  GraduationCap,
  Headset,
  Palmtree,
  ShieldCheck,
  Sparkles,
  Stamp,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export interface VisaTypeCard {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Matches one of `VISA_TYPE_OPTIONS`, pre-selected in the request form. */
  formValue: string;
}

/** "Visa Services for Your Journey" cards. */
export const VISA_TYPE_CARDS: readonly VisaTypeCard[] = [
  {
    slug: "tourist",
    icon: Palmtree,
    title: "Tourist Visa",
    description: "Assistance for travel and holiday visa requirements.",
    formValue: "Tourist Visa",
  },
  {
    slug: "business",
    icon: Briefcase,
    title: "Business Visa",
    description: "Support for business trips, meetings and professional travel.",
    formValue: "Business Visa",
  },
  {
    slug: "work",
    icon: FileCheck2,
    title: "Work Visa",
    description: "Guidance for employment-related visa requirements.",
    formValue: "Work Visa",
  },
  {
    slug: "student",
    icon: GraduationCap,
    title: "Student Visa",
    description: "Assistance with visa requirements for study abroad.",
    formValue: "Student Visa",
  },
  {
    slug: "other",
    icon: Stamp,
    title: "Other Visa Services",
    description: "Support based on your destination and travel purpose.",
    formValue: "Other",
  },
];

/** Options for the request form's "Visa Type" select — a superset of the
 * cards above, covering cases the cards don't call out individually. */
export const VISA_TYPE_OPTIONS: readonly string[] = [
  "Tourist Visa",
  "Business Visa",
  "Work Visa",
  "Student Visa",
  "Family / Visit Visa",
  "Transit Visa",
  "Other",
];

export interface VisaBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** "Why Choose Our Visa Assistance?" */
export const VISA_BENEFITS: readonly VisaBenefit[] = [
  {
    icon: UserCheck,
    title: "Personalized Guidance",
    description: "Advice tailored to your destination and travel purpose.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Requirements",
    description: "A straightforward view of what your visa application needs.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description: "A team you can reach as questions come up.",
  },
  {
    icon: Sparkles,
    title: "Convenient Request Process",
    description: "One simple form — no embassy-style paperwork upfront.",
  },
];
