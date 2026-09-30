import {
  Briefcase,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck,
  FileText,
  Globe2,
  Handshake,
  HelpCircle,
  Laptop2,
  Megaphone,
  MessageSquare,
  Package,
  PencilLine,
  Plane,
  Search,
  Settings2,
  Ship,
  ShieldCheck,
  Store,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface HelpCategoryItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  value: string;
}

export const HELP_CATEGORIES: readonly HelpCategoryItem[] = [
  {
    id: "import-export",
    title: "Import & Export",
    description: "International cargo, freight logistics, documentation & customs handling.",
    icon: Ship,
    value: "Import & Export",
  },
  {
    id: "trading",
    title: "Trading",
    description: "Commodity trading, supply chain management & cross-border partnerships.",
    icon: TrendingUp,
    value: "Trading",
  },
  {
    id: "travel-tourism",
    title: "Travel & Tourism",
    description: "Inbound Sri Lanka holidays, outbound tour packages & travel planning.",
    icon: Plane,
    value: "Travel & Tourism",
  },
  {
    id: "visa-services",
    title: "Visa Services",
    description: "Tourist, business & work visa documentation, verification & embassy desk.",
    icon: FileCheck,
    value: "Visa Services",
  },
  {
    id: "business-solutions",
    title: "Business Solutions",
    description: "Corporate formation, operational advisory, strategy & market entry.",
    icon: Briefcase,
    value: "Business Solutions",
  },
  {
    id: "franchise-opportunities",
    title: "Franchise Opportunities",
    description: "Brand acquisitions, franchise partnerships, master licensing & expansion.",
    icon: Store,
    value: "Franchise Opportunities",
  },
  {
    id: "investment-opportunities",
    title: "Investment Opportunities",
    description: "Direct investment ventures, joint partnerships & capital project funding.",
    icon: Coins,
    value: "Investment Opportunities",
  },
  {
    id: "marketing-advertising",
    title: "Marketing & Advertising",
    description: "Brand identity, performance advertising, digital campaigns & PR strategy.",
    icon: Megaphone,
    value: "Marketing & Advertising",
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    description: "Custom software development, web applications, mobile apps & POS systems.",
    icon: Laptop2,
    value: "IT Solutions",
  },
  {
    id: "other-requirements",
    title: "Other Requirements",
    description: "Custom procurement, specialized enterprise support or unique projects.",
    icon: HelpCircle,
    value: "Other Requirements",
  },
];

export const REQUIREMENT_TYPE_OPTIONS: readonly string[] = [
  "Import & Export",
  "Trading",
  "Travel & Tourism",
  "Visa Services",
  "Business Solutions",
  "Franchise Opportunities",
  "Investment Opportunities",
  "Marketing & Advertising",
  "IT Solutions",
  "Other Requirements",
];


export const TIMELINE_OPTIONS: readonly string[] = [
  "Immediately (Urgent)",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible / Not sure yet",
];

export const BUDGET_RANGE_OPTIONS: readonly string[] = [
  "Under LKR 100,000 / $500",
  "LKR 100,000 – LKR 500,000 / $500 – $2,000",
  "LKR 500,000 – LKR 2,000,000 / $2,000 – $7,000",
  "LKR 2,000,000 – LKR 10,000,000 / $7,000 – $35,000",
  "Above LKR 10,000,000 / $35,000+",
  "Flexible / Custom Budget",
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Tell Us Your Requirement",
    description: "Share what you need, your specifications, preferred timeline, or destination.",
  },
  {
    step: 2,
    title: "We Review Your Request",
    description: "Our specialist team analyzes your requirements to determine the best approach.",
  },
  {
    step: 3,
    title: "We Contact You",
    description: "We reach out directly with a clear proposal, transparent quotation, or consultation.",
  },
  {
    step: 4,
    title: "We Work on the Solution",
    description: "Upon your approval, we execute the sourcing, logistics, bookings, or project delivery.",
  },
] as const;

export const REQUEST_EXAMPLES = [
  { icon: Ship, label: "Industrial Packaging & Factory Machinery" },
  { icon: Globe2, label: "Bulk Consumer Goods & Food Product Sourcing" },
  { icon: Laptop2, label: "Custom ERP, POS & Mobile App Development" },
  { icon: Plane, label: "VIP & Corporate Travel Packages to Sri Lanka" },
  { icon: FileCheck, label: "Work & Investor Visa Advisory Support" },
  { icon: Store, label: "Franchise Partnerships & Retail Expansion" },
] as const;

export const WHY_SHARE_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified Global Network",
    description: "Every supplier, service provider, and partner is vetted for compliance and quality.",
    accent: "text-brand-blue",
  },
  {
    icon: Clock,
    title: "24-Hour Review SLA",
    description: "Our dedicated sector coordinators review and respond with initial assessments in 24 hours.",
    accent: "text-amber-600",
  },
  {
    icon: Handshake,
    title: "Transparent & Direct",
    description: "No hidden fees or ambiguous terms. You receive clear pricing, timelines, and execution roadmaps.",
    accent: "text-emerald-600",
  },
] as const;

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

