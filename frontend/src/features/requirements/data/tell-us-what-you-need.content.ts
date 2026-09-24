import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Globe2,
  Handshake,
  HelpCircle,
  Laptop2,
  Megaphone,
  MessageSquare,
  Package,
  PencilLine,
  Search,
  Settings2,
  Ship,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface IconStat {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

/** Stat strip under the hero headline. */
export const HERO_STATS: readonly IconStat[] = [
  { icon: MessageSquare, title: "One Request", subtitle: "Multiple Solutions" },
  { icon: Globe2, title: "Local & International", subtitle: "Sourcing" },
  { icon: Users, title: "Expert Team", subtitle: "Support" },
  { icon: ShieldCheck, title: "Free Consultation", subtitle: "& Guidance" },
];

/** The four service icons arranged around the hero's centre emphasis panel. */
export const HERO_SERVICE_ICONS: readonly { icon: LucideIcon; label: string }[] = [
  { icon: Package, label: "Products" },
  { icon: TrendingUp, label: "Investment" },
  { icon: Ship, label: "Sourcing" },
  { icon: Laptop2, label: "IT Solutions" },
];

export interface WhyShareItem {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "red" | "blue";
}

export const WHY_SHARE_ITEMS: readonly WhyShareItem[] = [
  {
    icon: Target,
    title: "One Point of Contact",
    description: "All your business needs in one place.",
    accent: "red",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description: "Access to trusted suppliers and partners worldwide.",
    accent: "blue",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our team will guide you from inquiry to delivery.",
    accent: "blue",
  },
  {
    icon: Clock,
    title: "Save Time & Cost",
    description: "We do the research so you can focus on your business.",
    accent: "blue",
  },
  {
    icon: FileText,
    title: "Transparent Process",
    description: "Get quotations, track progress and receive regular updates.",
    accent: "blue",
  },
  {
    icon: Settings2,
    title: "End-to-End Solutions",
    description: "From sourcing to delivery and beyond.",
    accent: "blue",
  },
];

export interface ProcessStepItem {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "red" | "blue";
}

export const HOW_IT_WORKS_STEPS: readonly ProcessStepItem[] = [
  {
    step: 1,
    icon: PencilLine,
    title: "Submit Your Request",
    description: "Tell us what you need through the form.",
    accent: "red",
  },
  {
    step: 2,
    icon: Search,
    title: "We Analyze",
    description: "Our team reviews your requirements.",
    accent: "blue",
  },
  {
    step: 3,
    icon: FileText,
    title: "Get Solutions",
    description: "We provide the best options and quotations.",
    accent: "red",
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: "You Decide",
    description: "Choose the best solution and we handle the rest.",
    accent: "blue",
  },
];

export const REQUEST_EXAMPLES: readonly { icon: LucideIcon; label: string }[] = [
  { icon: Package, label: "Products and Materials" },
  { icon: Settings2, label: "Machinery and Equipment" },
  { icon: Ship, label: "Import & Export Services" },
  { icon: Building2, label: "Business Setup Support" },
  { icon: Search, label: "Travel & Visa Services" },
  { icon: Laptop2, label: "IT Solutions (Web, POS, Software)" },
  { icon: Megaphone, label: "Marketing & Advertising" },
  { icon: Handshake, label: "Investment & Franchise Opportunities" },
  { icon: HelpCircle, label: "Other Business Needs" },
];

export const REQUIREMENT_FAQS: readonly { question: string; answer: string }[] = [
  {
    question: "How quickly will I get a response?",
    answer:
      "Our team typically reviews new requests within 1–2 business days and follows up with next steps or a few clarifying questions.",
  },
  {
    question: "Is there a charge to submit a request?",
    answer:
      "No. Sharing your requirement and receiving our initial guidance is completely free.",
  },
  {
    question: "Can I request multiple products or services?",
    answer:
      "Yes. List everything in the detailed requirements field, or submit a separate request for each need — whichever is easier for you.",
  },
  {
    question: "Will you help with international sourcing?",
    answer:
      "Yes. We work with a network of suppliers and partners across multiple countries to help you source internationally.",
  },
  {
    question: "Can I track my request status?",
    answer:
      "Yes. Once you have an account, every request you submit can be tracked from your customer dashboard.",
  },
];

export const REQUIREMENT_TYPE_OPTIONS: readonly string[] = [
  "Products & Materials",
  "Machinery & Equipment",
  "Import & Export Services",
  "Business Setup Support",
  "Travel & Visa Services",
  "IT Solutions",
  "Marketing & Advertising",
  "Investment & Franchise",
  "Other",
];

export const TIMELINE_OPTIONS: readonly string[] = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Not sure yet",
];

export const BUDGET_RANGE_OPTIONS: readonly string[] = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $20,000",
  "$20,000 – $50,000",
  "Above $50,000",
  "Prefer not to say",
];
