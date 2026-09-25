import {
  Briefcase,
  Compass,
  Factory,
  FileCheck2,
  Globe2,
  Handshake,
  Landmark,
  Megaphone,
  Plane,
  Rocket,
  Stamp,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import { SITE_MEDIA, type SiteImage } from "./site-media";
import { ROUTES } from "./routes";

/**
 * Public site navigation as data.
 *
 * The desktop mega menu, the mobile drawer, and the footer all render from these
 * structures, so a link is added or renamed in one place. When the CMS lands,
 * this module is the seam to replace.
 */

export interface PublicNavLink {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface PublicNavGroup {
  title: string;
  links: readonly PublicNavLink[];
}

/** Promotional panel shown beside the links in a mega menu. */
export interface PublicNavFeature {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  /** Small photo behind the panel copy, for menus where a visual helps (e.g. Travel & Tourism). */
  image?: SiteImage;
}

export type PublicNavItem =
  | { kind: "link"; title: string; href: string }
  | {
      kind: "menu";
      title: string;
      /** Landing page for the whole menu; also used for active-state matching. */
      href?: string;
      groups: readonly PublicNavGroup[];
      feature?: PublicNavFeature;
    };

const servicesAnchor = (id: string) => `${ROUTES.public.services}#${id}`;
const solutionsAnchor = (id: string) => `${ROUTES.public.businessSolutions}#${id}`;
const categoryHref = (slug: string) =>
  `${ROUTES.public.products}?category=${encodeURIComponent(slug)}`;

/** Links shown in the primary navbar's "Services" dropdown. */
export const MAIN_NAV_SERVICE_LINKS: readonly PublicNavLink[] = [
  {
    title: "Trading",
    href: ROUTES.public.servicesTrading,
    description: "Bulk supply at negotiated terms",
    icon: Warehouse,
  },
  {
    title: "Franchise",
    href: ROUTES.public.servicesFranchise,
    description: "Acquire or expand a franchise",
    icon: Handshake,
  },
  {
    title: "Import & Export",
    href: ROUTES.public.servicesImportExport,
    description: "Clearance, documentation and delivery",
    icon: Globe2,
  },
  {
    title: "Investment Opportunities",
    href: ROUTES.public.servicesInvestment,
    description: "Evaluate and structure opportunities",
    icon: TrendingUp,
  },
  {
    title: "Marketing & Advertising",
    href: ROUTES.public.servicesMarketingAdvertising,
    description: "Promotion and business visibility",
    icon: Megaphone,
  },
];

export const WHOLESALE_CATEGORY_LINKS: readonly PublicNavLink[] = [
  { title: "Machinery", href: categoryHref("machinery") },
  { title: "Industrial Equipment", href: categoryHref("industrial-equipment") },
  { title: "Electronics", href: categoryHref("electronics") },
  { title: "Furniture", href: categoryHref("furniture") },
  { title: "Clothing", href: categoryHref("clothing") },
  { title: "Raw Materials", href: categoryHref("raw-materials") },
  { title: "Vehicles", href: categoryHref("vehicles") },
  { title: "Shoes", href: categoryHref("shoes") },
];

export const BUSINESS_SOLUTION_LINKS: readonly PublicNavLink[] = [
  {
    title: "Start a Business",
    href: solutionsAnchor("start-a-business"),
    description: "From idea to a trading company",
    icon: Rocket,
  },
  {
    title: "Business Consulting",
    href: solutionsAnchor("business-consulting"),
    description: "Expert guidance at every stage",
    icon: Compass,
  },
  {
    title: "Business Setup",
    href: solutionsAnchor("business-setup"),
    description: "Registration, premises and systems",
    icon: Briefcase,
  },
  {
    title: "Manufacturing Setup",
    href: solutionsAnchor("manufacturing-setup"),
    description: "Machinery, lines and raw materials",
    icon: Factory,
  },
  {
    title: "Business Expansion",
    href: solutionsAnchor("business-expansion"),
    description: "New markets, products and locations",
    icon: TrendingUp,
  },
];

/** Links shown in the primary navbar's "Travel & Tourism" dropdown — the five
 * core travel services only, per the site's Travel & Tourism structure. */
export const TRAVEL_NAV_LINKS: readonly PublicNavLink[] = [
  {
    title: "Inbound Travel (Sri Lanka)",
    href: ROUTES.public.inboundTravel,
    description: "Customized tours and local support across Sri Lanka",
    icon: Landmark,
  },
  {
    title: "Outbound Travel",
    href: ROUTES.public.outboundTravel,
    description: "International travel assistance for your destination",
    icon: Globe2,
  },
  {
    title: "Visa Services",
    href: ROUTES.public.visaServices,
    description: "Guidance for your travel visa requirements",
    icon: Stamp,
  },
  {
    title: "Flight Tickets",
    href: ROUTES.public.flightTickets,
    description: "Domestic and international flight options",
    icon: Plane,
  },
  {
    title: "Work Visa Support",
    href: ROUTES.public.workVisa,
    description: "Guidance for work-related travel and visa requirements",
    icon: FileCheck2,
  },
];

export const PUBLIC_MAIN_NAV: readonly PublicNavItem[] = [
  { kind: "link", title: "Home", href: ROUTES.public.home },
  {
    kind: "menu",
    title: "Services",
    href: ROUTES.public.services,
    groups: [{ title: "Services", links: MAIN_NAV_SERVICE_LINKS }],
    feature: {
      eyebrow: "Not sure where to start?",
      title: "Tell us what your business needs",
      description:
        "Share one requirement. Our team coordinates the suppliers and services behind it.",
      href: ROUTES.public.tellUsWhatYouNeed,
      cta: "Submit a requirement",
    },
  },
  { kind: "link", title: "Business Solutions", href: ROUTES.public.businessSolutions },
  {
    kind: "menu",
    title: "Travel & Tourism",
    href: ROUTES.public.travelTourism,
    groups: [{ title: "Travel Services", links: TRAVEL_NAV_LINKS }],
    feature: {
      eyebrow: "Featured Package",
      title: "Sri Lanka Highlights",
      description: "Sigiriya, Kandy, Ella and Galle on one 7-day itinerary.",
      href: ROUTES.public.travelPackage("sri-lanka-highlights"),
      cta: "View Package",
      image: SITE_MEDIA.travelPackagesFull.sriLankaHighlights,
    },
  },
  { kind: "link", title: "IT Solutions", href: ROUTES.public.itSolutions },
  { kind: "link", title: "About Us", href: ROUTES.public.about },
  { kind: "link", title: "Contact Us", href: ROUTES.public.contact },
];

/** Flat list for the mobile drawer, grouped into collapsible sections. */
export const PUBLIC_MOBILE_NAV: readonly PublicNavGroup[] = [
  {
    title: "Company",
    links: [
      { title: "Home", href: ROUTES.public.home },
      { title: "About Us", href: ROUTES.public.about },
      { title: "IT Solutions", href: ROUTES.public.itSolutions },
      { title: "How It Works", href: ROUTES.public.howItWorks },
      { title: "Contact Us", href: ROUTES.public.contact },
    ],
  },
  {
    title: "Services",
    links: [{ title: "All Services", href: ROUTES.public.services }, ...MAIN_NAV_SERVICE_LINKS],
  },
  { title: "Business Solutions", links: BUSINESS_SOLUTION_LINKS },
  {
    title: "Travel & Tourism",
    links: [
      { title: "Travel & Tourism Home", href: ROUTES.public.travelTourism },
      ...TRAVEL_NAV_LINKS,
    ],
  },
];

export const PUBLIC_FOOTER_NAV: readonly PublicNavGroup[] = [
  {
    title: "Quick Links",
    links: [
      { title: "Home", href: ROUTES.public.home },
      { title: "About", href: ROUTES.public.about },
      { title: "Services", href: ROUTES.public.services },
      { title: "How It Works", href: ROUTES.public.howItWorks },
      { title: "Global Sourcing", href: ROUTES.public.globalSourcing },
      { title: "Wholesale", href: ROUTES.public.wholesaleProducts },
      { title: "Business Solutions", href: ROUTES.public.businessSolutions },
      { title: "Contact", href: ROUTES.public.contact },
    ],
  },
  {
    title: "Business Services",
    links: [
      { title: "Import & Export", href: servicesAnchor("import") },
      { title: "Product Sourcing", href: ROUTES.public.globalSourcing },
      { title: "Wholesale", href: ROUTES.public.wholesaleProducts },
      { title: "Business Consulting", href: servicesAnchor("business-consulting") },
      { title: "Business Setup", href: servicesAnchor("business-setup") },
      { title: "Investment Support", href: ROUTES.public.investmentFranchise },
      { title: "Franchise Support", href: ROUTES.public.franchise },
      { title: "IT Solutions", href: ROUTES.public.itSolutions },
    ],
  },
  {
    title: "Travel & Support",
    links: [
      { title: "Travel & Tourism", href: ROUTES.public.travelTourism },
      { title: "Inbound Travel", href: ROUTES.public.inboundTravel },
      { title: "Outbound Travel", href: ROUTES.public.outboundTravel },
      { title: "Visa Assistance", href: ROUTES.public.visaServices },
      { title: "Flight Tickets", href: ROUTES.public.flightTickets },
      { title: "Work Visa Support", href: ROUTES.public.workVisa },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Help Center", href: ROUTES.customer.support },
      { title: "FAQ", href: ROUTES.public.faq },
      { title: "Contact Support", href: ROUTES.public.contact },
      { title: "Request Quotation", href: ROUTES.public.requestQuotation },
      { title: "Track Order", href: ROUTES.customer.orders },
      { title: "Login", href: ROUTES.auth.login },
    ],
  },
];

export const PUBLIC_LEGAL_NAV: readonly PublicNavLink[] = [
  { title: "Privacy Policy", href: ROUTES.public.privacyPolicy },
  { title: "Terms & Conditions", href: ROUTES.public.terms },
  { title: "Cookie Policy", href: ROUTES.public.cookiePolicy },
];
