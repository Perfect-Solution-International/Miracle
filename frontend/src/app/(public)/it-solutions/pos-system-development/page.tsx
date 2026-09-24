import {
  ArrowRight,
  Building2,
  ChartColumn,
  Check,
  ClipboardList,
  Clock,
  Coffee,
  Gauge,
  GraduationCap,
  Headphones,
  Package,
  Pill,
  ReceiptText,
  Rocket,
  ScanBarcode,
  Settings2,
  ShieldCheck,
  Shirt,
  ShoppingBasket,
  ShoppingCart,
  Store,
  TrendingUp,
  UserCog,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { FeatureCard } from "@/components/common/feature-card";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "POS System Development";
const DESCRIPTION =
  "Fast, reliable Point of Sale systems that manage sales, stock, billing and reporting in one place, built for the way your business sells.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.posSystemDevelopment,
  image: SITE_MEDIA.technology,
});

const overviewPoints = [
  "Quick, easy checkout for every sale",
  "Real-time stock across all items",
  "Accurate bills, invoices and receipts",
  "Clear daily and monthly reports",
];

type IconItem = { title: string; description: string; icon: LucideIcon };

const features: IconItem[] = [
  {
    title: "Sales Management",
    description:
      "Fast billing with barcode scanning, discounts, returns and multiple payment methods.",
    icon: ShoppingCart,
  },
  {
    title: "Inventory Management",
    description:
      "Track stock levels in real time, get low-stock alerts and manage suppliers and purchases.",
    icon: Package,
  },
  {
    title: "Billing & Invoicing",
    description:
      "Generate printed or digital receipts and professional invoices with tax calculated automatically.",
    icon: ReceiptText,
  },
  {
    title: "Customer Management",
    description:
      "Keep customer records, purchase history, credit balances and loyalty rewards in one place.",
    icon: Users,
  },
  {
    title: "Employee Management",
    description:
      "Set user roles and permissions, track cashier activity and monitor staff performance.",
    icon: UserCog,
  },
  {
    title: "Reports & Analytics",
    description:
      "Sales, profit, stock and product reports that show exactly how your business is performing.",
    icon: ChartColumn,
  },
];

const businessTypes: IconItem[] = [
  {
    title: "Retail Shops",
    description: "Clothing, electronics, hardware and general stores.",
    icon: Store,
  },
  {
    title: "Restaurants & Cafés",
    description: "Table orders, kitchen tickets and quick service counters.",
    icon: UtensilsCrossed,
  },
  {
    title: "Supermarkets",
    description: "High-volume checkout with barcode scanning and bulk stock.",
    icon: ShoppingBasket,
  },
  {
    title: "Pharmacies",
    description: "Batch and expiry tracking with accurate medicine stock.",
    icon: Pill,
  },
  {
    title: "Fashion & Boutiques",
    description: "Size, colour and variant tracking for every product.",
    icon: Shirt,
  },
  {
    title: "Bakeries & Coffee Shops",
    description: "Quick counter sales, daily production and fast billing.",
    icon: Coffee,
  },
  {
    title: "Wholesale & Distribution",
    description: "Bulk pricing, credit sales and supplier management.",
    icon: Building2,
  },
  {
    title: "Other Businesses",
    description: "Service centres, salons and any business that sells daily.",
    icon: Settings2,
  },
];

const setupProcess = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Understand Your Business",
    description:
      "We learn how you sell, what you stock and what reports you need to run the business.",
  },
  {
    step: "02",
    icon: Settings2,
    title: "Configure & Customise",
    description:
      "The POS is set up with your products, prices, taxes, users and receipt layout.",
  },
  {
    step: "03",
    icon: ScanBarcode,
    title: "Hardware & Installation",
    description:
      "We install the system and connect barcode scanners, receipt printers and cash drawers.",
  },
  {
    step: "04",
    icon: GraduationCap,
    title: "Staff Training",
    description:
      "Your cashiers and managers are trained so they can use the system confidently from day one.",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Go Live",
    description:
      "Start selling with the new system while our team stays close to handle any questions.",
  },
  {
    step: "06",
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "Updates, maintenance and technical support to keep your POS running smoothly.",
  },
] satisfies (IconItem & { step: string })[];

const benefits: IconItem[] = [
  {
    title: "Faster Checkout",
    description: "Serve more customers with quick, accurate billing at the counter.",
    icon: Gauge,
  },
  {
    title: "Fewer Errors",
    description: "Automatic calculations remove manual mistakes in bills and stock.",
    icon: Check,
  },
  {
    title: "Better Stock Control",
    description: "Know what is selling, what is running low and when to reorder.",
    icon: Package,
  },
  {
    title: "Business Growth",
    description: "Use sales insights to plan pricing, promotions and purchasing.",
    icon: TrendingUp,
  },
  {
    title: "Secure Transactions",
    description: "User permissions and activity logs protect your sales and cash.",
    icon: ShieldCheck,
  },
  {
    title: "Time Savings",
    description: "Daily closing, reports and stock counts done in minutes, not hours.",
    icon: Clock,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="IT Solutions"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "IT Solutions", href: ROUTES.public.itSolutions },
          { label: "POS System Development" },
        ]}
        image={SITE_MEDIA.technology}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Get Your POS System
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <a href="#features">Explore Features</a>
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <Section aria-labelledby="overview-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="overview-heading"
            eyebrow="Overview"
            title="A POS System Built Around How You Sell"
            description="Our Point of Sale systems bring your sales counter, stock room and accounts together. Every sale updates your inventory and reports automatically, so you always know how your business is doing."
          />
          <ul className="reveal grid gap-4 sm:grid-cols-2">
            {overviewPoints.map((point) => (
              <li
                key={point}
                className="bg-card text-ink flex items-start gap-3 rounded-xl border p-5 text-sm font-semibold"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Key features */}
      <Section id="features" tone="surface" aria-labelledby="features-heading">
        <SectionHeading
          id="features-heading"
          eyebrow="Key Features"
          title="Everything You Need at the Counter"
          description="All the tools to run daily sales and operations from one system."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Suitable business types */}
      <Section aria-labelledby="business-types-heading">
        <SectionHeading
          id="business-types-heading"
          eyebrow="Who It's For"
          title="POS Solutions for Every Type of Business"
          description="Configured to match the way your industry sells."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {businessTypes.map((type) => (
            <FeatureCard
              key={type.title}
              icon={type.icon}
              title={type.title}
              description={type.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How It Works"
          title="From Setup to Your First Sale"
          description="A simple, guided process that gets your POS system running with minimal disruption."
          align="center"
          tone="inverse"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {setupProcess.map((item) => (
            <li
              key={item.step}
              className="reveal rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="text-brand-blue-muted inline-flex size-11 items-center justify-center rounded-lg bg-white/10">
                  <item.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-3xl font-extrabold text-white/20">{item.step}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Benefits */}
      <Section aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why Choose Our POS"
          title="Benefits for Your Business"
          description="Spend less time on admin and more time serving customers."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      <CtaBanner
        eyebrow="Ready to Upgrade Your Counter?"
        title="Get a POS System Made for Your Business"
        description="Tell us about your business and our team will recommend the right POS setup, hardware and pricing."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
