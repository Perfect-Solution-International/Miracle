import {
  AppWindow,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Cloud,
  CodeXml,
  Compass,
  Database,
  FlaskConical,
  Globe,
  Headphones,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PanelsTopLeft,
  PenTool,
  RefreshCw,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { FeatureCard } from "@/components/common/feature-card";
import { MediaFrame } from "@/components/common/media-frame";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Website Development";
const DESCRIPTION =
  "Modern, fast and secure websites that present your business professionally and turn visitors into customers.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.websiteDevelopment,
  image: SITE_MEDIA.technology,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const introPoints = [
  "Mobile-first, responsive layouts",
  "Built for search engines from day one",
  "Easy to update and manage",
  "Hosting, security and support included",
];

const services: IconItem[] = [
  {
    title: "Business Websites",
    description:
      "Professional websites that explain your services clearly and build trust with new customers.",
    icon: Globe,
  },
  {
    title: "E-commerce Websites",
    description:
      "Online stores with product catalogues, secure payments, orders and stock management.",
    icon: ShoppingBag,
  },
  {
    title: "Custom Web Applications",
    description:
      "Portals, booking systems and dashboards built for your specific business processes.",
    icon: AppWindow,
  },
  {
    title: "Corporate Websites",
    description:
      "Multi-page corporate sites that present your brand, divisions and leadership with authority.",
    icon: Building2,
  },
  {
    title: "Landing Pages",
    description:
      "Focused, high-converting pages for campaigns, product launches and lead generation.",
    icon: PanelsTopLeft,
  },
  {
    title: "Website Redesign",
    description:
      "Modernise an outdated website with a fresh design, better speed and improved usability.",
    icon: RefreshCw,
  },
];

const reasons = [
  {
    title: "Tailored to your business",
    description: "No generic templates. Every site is planned around your goals and customers.",
  },
  {
    title: "Clear pricing and timelines",
    description: "An agreed scope, cost and delivery schedule before any work begins.",
  },
  {
    title: "One team, end to end",
    description: "Design, development, hosting and support handled by the same people.",
  },
  {
    title: "Support after launch",
    description: "Updates, backups and help whenever your website needs attention.",
  },
];

const developmentProcess = [
  {
    step: "01",
    icon: Compass,
    title: "Discovery & Planning",
    description:
      "We learn about your business, audience and goals, then plan the site structure and content.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Wireframes and visual designs that reflect your brand and make navigation effortless.",
  },
  {
    step: "03",
    icon: CodeXml,
    title: "Development",
    description:
      "The approved design is built into a fast, responsive and secure website.",
  },
  {
    step: "04",
    icon: FlaskConical,
    title: "Testing",
    description:
      "Every page is checked across devices and browsers for speed, forms and functionality.",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Launch",
    description:
      "Your website goes live with domain, hosting, SSL and analytics set up correctly.",
  },
  {
    step: "06",
    icon: Headphones,
    title: "Support & Maintenance",
    description:
      "Ongoing updates, backups, monitoring and improvements to keep your site performing.",
  },
] satisfies (IconItem & { step: string })[];

const technologyGroups: (IconItem & { items: string[] })[] = [
  {
    title: "Frontend",
    description: "Fast, interactive interfaces.",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    description: "Reliable business logic and APIs.",
    icon: Server,
    items: ["Node.js", "Laravel", "PHP", "REST APIs"],
  },
  {
    title: "CMS & E-commerce",
    description: "Content you can manage yourself.",
    icon: LayoutTemplate,
    items: ["WordPress", "WooCommerce", "Shopify", "Headless CMS"],
  },
  {
    title: "Database & Hosting",
    description: "Secure data and dependable uptime.",
    icon: Cloud,
    items: ["MySQL", "PostgreSQL", "AWS", "Vercel"],
  },
];

const benefits: IconItem[] = [
  {
    title: "Responsive Design",
    description: "Looks and works perfectly on phones, tablets and desktops.",
    icon: MonitorSmartphone,
  },
  {
    title: "Fast Performance",
    description: "Optimised images and code for quick loading on every connection.",
    icon: Zap,
  },
  {
    title: "SEO Friendly",
    description: "Clean structure and metadata that help customers find you on Google.",
    icon: Search,
  },
  {
    title: "Secure Development",
    description: "SSL, secure forms and best practices that protect your site and visitors.",
    icon: ShieldCheck,
  },
  {
    title: "Modern UI/UX",
    description: "Clear, attractive designs that guide visitors towards taking action.",
    icon: Palette,
  },
  {
    title: "Scalable Architecture",
    description: "Built to grow with new pages, features and traffic over time.",
    icon: Database,
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
          { label: TITLE },
        ]}
        image={SITE_MEDIA.technology}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Start Your Website Project
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <a href="#services">View Services</a>
          </Button>
        </div>
      </PageHero>

      {/* Introduction */}
      <Section aria-labelledby="intro-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="intro-heading"
            eyebrow="Introduction"
            title="Your Website Is Your Most Important Salesperson"
            description="Customers judge your business by your website before they ever contact you. We design and build websites that look professional, load quickly and make it easy for visitors to take the next step."
          />
          <ul className="reveal grid gap-4 sm:grid-cols-2">
            {introPoints.map((point) => (
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

      {/* Services */}
      <Section id="services" tone="surface" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Build"
          title="Our Web Development Services"
          description="From a single landing page to a complete online platform."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MediaFrame
            image={SITE_MEDIA.businessMeeting}
            aspect="aspect-[4/3]"
            className="reveal shadow-lift order-last lg:order-first"
          />
          <div className="flex flex-col gap-8">
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose Us"
              title="A Website Partner Focused on Results"
              description="We combine design, technology and business understanding to deliver websites that work as hard as you do."
            />
            <ul className="grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason.title} className="reveal flex gap-3">
                  <BadgeCheck
                    aria-hidden="true"
                    className="text-brand-blue mt-0.5 size-5 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="text-ink font-bold">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Development process */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="Our Website Development Process"
          description="A clear, six-step process that keeps your project on time and on budget."
          align="center"
          tone="inverse"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {developmentProcess.map((item) => (
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

      {/* Technologies */}
      <Section aria-labelledby="technologies-heading">
        <SectionHeading
          id="technologies-heading"
          eyebrow="Technologies"
          title="Built With Modern, Proven Technology"
          description="We choose the right tools for your project, budget and long-term plans."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {technologyGroups.map((group) => (
            <article
              key={group.title}
              className="reveal bg-card hover:border-brand-blue/30 hover:shadow-soft group flex flex-col gap-5 rounded-xl border p-6 transition-all duration-300"
            >
              <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-300 group-hover:text-white">
                <group.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="space-y-2">
                <h3 className="text-ink text-lg font-bold">{group.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="bg-surface text-ink rounded-full border px-3 py-1 text-xs font-semibold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="surface" aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="What You Get"
          title="Features Built Into Every Website"
          description="Quality standards included as part of every project, not as extras."
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
        eyebrow="Ready to Go Online?"
        title="Start Your Website Project"
        description="Tell us about your business and goals. Our team will recommend the right website solution, timeline and cost."
        primary={{
          label: "Start Your Website Project",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
