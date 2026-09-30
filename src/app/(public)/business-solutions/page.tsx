import {
  ArrowRight,
  ArrowDown,
  Building2,
  ChartColumn,
  Check,
  CheckCircle2,
  ClipboardList,
  CodeXml,
  Compass,
  CornerDownLeft,
  Globe2,
  Handshake,
  Headphones,
  Lightbulb,
  Network,
  Package,
  Rocket,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";
import { ServiceRequirementDialog } from "@/features/requirements";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

import landingStyles from "../landing-surfaces.module.css";

const TITLE = "Business Solutions";
const DESCRIPTION =
  "From business planning and setup to expansion, technology and ongoing support, we help turn ideas into sustainable businesses.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.businessSolutions,
  image: SITE_MEDIA.businessSolutions.hero,
});

type IconItem = { title: string; description: string; icon: LucideIcon };
type Service = IconItem & { image: SiteImage; href: string };

const services: readonly Service[] = [
  {
    title: "Start a Business",
    description:
      "Move from an early idea to practical business preparation. We help you examine the opportunity, clarify priorities and shape a more organized path toward launch.",
    icon: Lightbulb,
    image: SITE_MEDIA.businessSolutions.startBusiness,
    href: ROUTES.public.businessStart,
  },
  {
    title: "Business Consultation",
    description:
      "Work through a business challenge or opportunity with focused, practical advice. Consultation helps turn an uncertain situation into priorities and next steps your team can act on.",
    icon: Handshake,
    image: SITE_MEDIA.businessSolutions.businessConsultation,
    href: ROUTES.public.businessConsultation,
  },
  {
    title: "Business Planning",
    description:
      "A useful business plan connects the market opportunity to the work needed to deliver it. We bring goals, operations and resources into a coherent direction.",
    icon: ClipboardList,
    image: SITE_MEDIA.businessSolutions.businessPlanning,
    href: ROUTES.public.businessPlanning,
  },
  {
    title: "Business Setup Support",
    description:
      "Turning a plan into operations takes coordination. We help connect requirements, people, suppliers and systems so the business can move toward launch with more confidence.",
    icon: Settings2,
    image: SITE_MEDIA.businessSolutions.businessSetup,
    href: ROUTES.public.businessSetup,
  },
  {
    title: "Business Expansion",
    description:
      "Growth creates new demands on capacity, systems and relationships. We help assess what needs to become stronger before you move into a new market, capability or opportunity.",
    icon: TrendingUp,
    image: SITE_MEDIA.businessSolutions.businessExpansion,
    href: ROUTES.public.businessExpansion,
  },
  {
    title: "Machinery & Equipment",
    description:
      "The right machinery starts with the operation it needs to serve. We help define requirements, compare suitable options and coordinate sourcing and implementation considerations.",
    icon: Package,
    image: SITE_MEDIA.businessSolutions.machineryEquipment,
    href: ROUTES.public.businessMachinery,
  },
  {
    title: "Business Technology",
    description:
      "Technology has the most value when it improves how people work. We help connect business needs to useful systems, clearer information and more efficient workflows.",
    icon: CodeXml,
    image: SITE_MEDIA.businessSolutions.businessTechnology,
    href: ROUTES.public.businessTechnology,
  },
  {
    title: "Business Support",
    description:
      "Business needs do not stop at launch. We provide practical assistance as operations change, questions arise and new opportunities call for a fresh response.",
    icon: Headphones,
    image: SITE_MEDIA.businessSolutions.businessSupport,
    href: ROUTES.public.businessSupport,
  },
];

const overviewValues: IconItem[] = [
  {
    title: "Business-First Thinking",
    description: "Start with your objectives and operating reality.",
    icon: Compass,
  },
  {
    title: "Practical Execution",
    description: "Connect advice to the work that follows.",
    icon: Settings2,
  },
  {
    title: "Connected Services",
    description: "Bring related needs together through one team.",
    icon: Network,
  },
  {
    title: "Scalable Support",
    description: "Adjust the approach as the business develops.",
    icon: TrendingUp,
  },
];

const journey: (IconItem & { step: string })[] = [
  {
    step: "01",
    title: "Idea",
    description: "Test the need, audience and potential value of the idea.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Plan",
    description: "Set priorities, resources and a practical direction.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Setup",
    description: "Coordinate people, suppliers, systems and requirements.",
    icon: Building2,
  },
  {
    step: "04",
    title: "Operate",
    description: "Put the plan into motion and organize day-to-day work.",
    icon: Rocket,
  },
  {
    step: "05",
    title: "Grow",
    description: "Improve capacity, visibility and coordination as demand changes.",
    icon: ChartColumn,
  },
  {
    step: "06",
    title: "Scale",
    description: "Assess what needs to change before taking on a larger opportunity.",
    icon: Globe2,
  },
];

const workingProcess = [
  {
    title: "Understand",
    description: "Discuss the goal, current position and the decision you need to make.",
    icon: Headphones,
  },
  {
    title: "Assess",
    description: "Review practical requirements, constraints and the options available.",
    icon: SearchCheck,
  },
  {
    title: "Plan",
    description: "Set priorities and a sequence of actions suited to the business.",
    icon: ClipboardList,
  },
  {
    title: "Coordinate",
    description: "Bring relevant people, suppliers and services into the work.",
    icon: Network,
  },
  {
    title: "Deliver",
    description: "Work through the agreed steps and review progress as needs change.",
    icon: Check,
  },
  {
    title: "Support",
    description: "Stay available for operational questions and the next stage of work.",
    icon: Headphones,
  },
] as const;

const commonNeeds = [
  {
    title: "Starting a new business",
    description:
      "Clarify an idea, assess the opportunity and organize launch priorities.",
    href: ROUTES.public.businessStart,
  },
  {
    title: "Improving an existing operation",
    description:
      "Review workflows, coordination and the systems that support everyday work.",
    href: ROUTES.public.businessSupport,
  },
  {
    title: "Planning expansion",
    description:
      "Consider capacity, resources and operating changes before moving into a new opportunity.",
    href: ROUTES.public.businessExpansion,
  },
  {
    title: "Introducing technology",
    description: "Match useful digital systems to a defined business problem or process.",
    href: ROUTES.public.businessTechnology,
  },
  {
    title: "Sourcing machinery and equipment",
    description:
      "Define operational needs and compare equipment options and implementation considerations.",
    href: ROUTES.public.businessMachinery,
  },
  {
    title: "Organizing connected support",
    description:
      "Bring planning, setup, sourcing and specialist services into a coordinated approach.",
    href: ROUTES.public.businessConsultation,
  },
] as const;

const connectedServices = [
  {
    title: "IT Solutions",
    description:
      "Digital systems and technology work when an operating need calls for them.",
    href: ROUTES.public.itSolutions,
  },
  {
    title: "Trading Services",
    description:
      "Supplier and buyer connections can support sourcing or market activity.",
    href: ROUTES.public.servicesTrading,
  },
  {
    title: "Import & Export",
    description:
      "Cross-border documentation and logistics support can connect to supply plans.",
    href: ROUTES.public.servicesImportExport,
  },
] as const;

const advantages: IconItem[] = [
  {
    title: "End-to-End Business Support",
    description: "Connect planning, setup, operations and growth.",
    icon: Network,
  },
  {
    title: "Practical Business Guidance",
    description: "Ground decisions in real requirements.",
    icon: Compass,
  },
  {
    title: "Cross-Service Expertise",
    description: "Bring sourcing, operations and other services together.",
    icon: UsersRound,
  },
  {
    title: "Technology Integration",
    description: "Use systems where they improve the work.",
    icon: CodeXml,
  },
  {
    title: "Growth-Focused Solutions",
    description: "Prepare the business for its next stage.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Support",
    description: "Stay connected beyond the first milestone.",
    icon: ShieldCheck,
  },
];

const businessOutcomes = [
  "Clearer Business Direction",
  "Better Organized Operations",
  "Stronger Supplier Coordination",
  "Improved Management Visibility",
  "Better Technology Integration",
  "More Scalable Processes",
  "Stronger Growth Preparation",
  "More Consistent Support",
] as const;

export default function Page() {
  return (
    <main className={`${landingStyles.page} ${landingStyles.solutionPage}`}>
      {/* ── 1. Hero Section: Full-Width Panoramic Hero with Left Overlay ── */}
      <section className="relative isolate overflow-hidden bg-white border-b border-slate-200/80 min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Full-Bleed Panoramic Hero Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: 'url("/images/business-solutions/business-solutions-hero.jpg")',
            backgroundPosition: "right center",
          }}
        />

        {/* Soft-White Gradient on Left Area (ensures 100% crisp legibility on all devices) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:from-white/95 lg:via-white/70 lg:to-transparent/10 pointer-events-none"
        />

        {/* Bottom Gradient Fade to Next Section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
        />

        {/* Left-Aligned Content Container */}
        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-sm">
              <span className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <span>Enterprise Consulting &amp; Business Setup</span>
            </div>

            <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight leading-[1.08]">
              Strategic Advisory.<br />
              For <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Enterprise Setup, Scale</span><br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">&amp; Market Growth.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              From business planning and corporate incorporation to operational scaling, machinery sourcing, technology integration, and executive business consulting.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button asChild size="xl" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3.5 shadow-md inline-flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-0.5">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  <span>Inquiry Now</span>
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white/95 hover:bg-white text-slate-800 font-semibold border-slate-200/90 rounded-xl px-6 py-3.5 shadow-2xs inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-xs">
                <a href="#solutions">Explore 8 Solutions</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section
        aria-labelledby="business-overview-heading"
        containerClassName="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12"
      >
        <SectionHeading
          id="business-overview-heading"
          eyebrow="About Business Solutions"
          title="Practical Support for Every Stage of Business"
          description="Miracle International supports businesses from initial planning and setup through sourcing, technology, operations and growth. We connect the right services around the challenge in front of you."
        />
        <div className="relative">
          <div className="shadow-lift relative aspect-[3/2] overflow-hidden rounded-3xl border border-white">
            <Image
              src={SITE_MEDIA.businessSolutions.overview.src}
              alt={SITE_MEDIA.businessSolutions.overview.alt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy/25 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
          </div>
          <div className="shadow-soft relative mx-4 -mt-8 grid overflow-hidden rounded-2xl border bg-white sm:grid-cols-2">
            {overviewValues.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex gap-3 p-3.5",
                  index % 2 === 1 && "sm:border-l",
                  index > 1 && "border-t",
                )}
              >
                <span className="bg-brand-blue-light text-brand-blue flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-ink text-sm font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="solutions"
        aria-labelledby="business-services-heading"
        className="scroll-mt-24"
      >
        <SectionHeading
          id="business-services-heading"
          align="center"
          eyebrow="Explore Business Solutions"
          title="Find the Support for Your Next Move"
          description="Eight connected services support the business journey from the first idea through daily operations and expansion."
        />
        <ul className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="group/card shadow-soft hover:shadow-lift relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-blue/40 motion-safe:hover:-translate-y-1 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover/card:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
                <span className="text-brand-blue absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold shadow-xs backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-3">
                  <span className="bg-brand-blue-light text-brand-blue group-hover/card:bg-brand-blue flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors group-hover/card:text-white">
                    <service.icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-ink group-hover/card:text-brand-blue text-lg leading-snug font-bold transition-colors">
                    <Link
                      href={service.href}
                      className="outline-none after:absolute after:inset-0"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      {service.title}
                    </Link>
                  </h3>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-auto pt-6">
                  <span className="text-brand-blue group-hover/card:text-brand-blue-dark flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold">
                    Learn More
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/card:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="journey"
        aria-labelledby="business-journey-heading"
        className="bg-white"
      >
        <SectionHeading
          id="business-journey-heading"
          eyebrow="The Business Journey"
          title="A Clearer Path From Idea to Expansion"
          description="The right support at the right moment helps turn uncertainty into practical progress."
        />
        <ol className="border-brand-blue/25 relative mt-8 grid gap-6 border-l pl-6 lg:mt-10 lg:grid-cols-6 lg:gap-4 lg:border-t lg:border-l-0 lg:pl-0">
          {journey.map(({ step, title, description, icon: Icon }, index) => (
            <li
              key={step}
              className="relative flex gap-3.5 lg:flex-col lg:gap-3.5 lg:pt-5"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "ring-white absolute top-4 -left-[1.8rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                  index === 0 ? "bg-brand-red" : "bg-brand-blue",
                )}
              />
              <span className="hidden text-4xl leading-none font-bold text-[#5B7FAE] lg:block">
                {step}
              </span>
              <span className="text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <div>
                <span className="text-brand-blue text-xs font-bold tracking-widest lg:hidden">
                  {step}
                </span>
                <h3 className="text-ink text-base font-bold">{title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="business-process-heading">
        <SectionHeading
          id="business-process-heading"
          eyebrow="How We Work With Businesses"
          title="A Practical Way to Move Work Forward"
          description="The approach starts with your requirement and adapts to its scope. Each step helps connect decisions to the work that follows."
        />
        <ol className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {workingProcess.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="relative flex gap-4 rounded-2xl border border-slate-300 bg-[#f4f8fd] p-7 shadow-soft">
              <span className="text-brand-blue-dark bg-brand-blue-light flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-blue/25 shadow-xs">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <span className="bg-brand-blue inline-flex rounded-md px-2 py-0.5 text-xs font-extrabold tracking-widest text-white">
                  0{index + 1}
                </span>
                <h3 className="text-ink mt-2 text-lg font-extrabold">{title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              {index < workingProcess.length - 1 && (
                <ArrowDown
                  aria-hidden="true"
                  className="text-brand-blue-dark pointer-events-none absolute -bottom-6 left-[42px] size-4 md:hidden"
                />
              )}
              {index < workingProcess.length - 1 && index % 2 === 0 && (
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue-dark pointer-events-none absolute -right-6 top-10 hidden size-4 md:block lg:hidden"
                />
              )}
              {index < workingProcess.length - 1 && index % 2 === 1 && (
                <CornerDownLeft
                  aria-hidden="true"
                  className="text-brand-blue-dark pointer-events-none absolute -bottom-6 right-2 hidden size-5 md:block lg:hidden"
                />
              )}
              {index !== 2 && index < workingProcess.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue-dark pointer-events-none absolute -right-6 top-10 hidden size-4 lg:block"
                />
              )}
              {index === 2 && (
                <CornerDownLeft
                  aria-hidden="true"
                  className="text-brand-blue-dark pointer-events-none absolute -bottom-6 right-2 hidden size-5 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="business-needs-heading">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading
              id="business-needs-heading"
              eyebrow="Common Business Needs"
              title="Support Shaped Around the Work at Hand"
              description="A requirement may start in one area and touch several others. These are examples of the situations our Business Solutions can help you explore."
            />
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {commonNeeds.map(({ title, description, href }) => (
                <li key={title} className="relative cursor-pointer border-b border-slate-200 py-4 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
                  <h3 className="text-ink text-sm font-bold sm:text-base">
                    <Link href={href} className="outline-none after:absolute after:inset-0">{title}</Link>
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                  <span className="text-brand-blue mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                    Explore support <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="border-brand-blue/15 bg-brand-blue-light/35 self-start rounded-3xl border p-6 sm:p-8">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase">
              Connected Business Support
            </span>
            <h3 className="text-ink mt-3 text-2xl font-extrabold tracking-tight">
              When One Requirement Spans Several Services
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Business planning can lead to technology, sourcing or cross-border needs. We
              help identify which services are relevant and coordinate the next steps
              around the same objective.
            </p>
            <ul className="border-brand-blue/15 mt-6 border-t">
              {connectedServices.map(({ title, description, href }) => (
                <li key={title} className="border-brand-blue/15 relative cursor-pointer border-b py-4 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
                  <Link
                    href={href}
                    className="text-brand-blue inline-flex items-center gap-1.5 font-bold hover:underline outline-none after:absolute after:inset-0"
                  >
                    {title} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section
        aria-labelledby="business-advantages-heading"
        containerClassName="grid gap-8 lg:grid-cols-[0.85fr_0.9fr_0.85fr] lg:items-center lg:gap-8"
      >
        <div>
          <SectionHeading
            id="business-advantages-heading"
            eyebrow="Why Miracle International"
            title="A Partner Built Around Your Progress"
            description="We connect practical guidance, people, sourcing and technology around the wider needs of a business."
          />
          <ServiceRequirementDialog
            context="business"
            trigger={
              <Button variant="outline" size="xl" className="mt-5">
                Talk to Our Team
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            }
          />
        </div>
        <div className="shadow-lift relative aspect-[4/4.2] overflow-hidden rounded-3xl">
          <Image
            src={SITE_MEDIA.businessSolutions.partnership.src}
            alt={SITE_MEDIA.businessSolutions.partnership.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>
        <ul className="border-brand-blue/15 border-t">
          {advantages.map(({ title, description, icon: Icon }) => (
            <li key={title} className="border-brand-blue/15 flex gap-3.5 border-b py-3">
              <span className="bg-brand-blue-light text-brand-blue flex size-9 shrink-0 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <div>
                <h3 className="text-ink text-sm font-bold sm:text-base">{title}</h3>
                <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed sm:text-sm">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="business-outcomes-heading">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <SectionHeading
            id="business-outcomes-heading"
            eyebrow="Business Outcomes"
            title="What Stronger Business Support Can Help You Achieve"
            description="The aim is a business that is easier to plan, coordinate, operate and prepare for its next stage."
          />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {businessOutcomes.map((title) => (
              <li
                key={title}
                className="border-brand-blue/15 flex items-center gap-3.5 border-b py-3 sm:py-3.5"
              >
                <span className="text-brand-blue shadow-soft flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold sm:text-base">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner
        serviceContext="business"
        className={landingStyles.ctaSection}
        eyebrow="Ready to Move Forward?"
        title="Let's Turn Your Business Plans Into Practical Progress"
        description="Tell us where your business is today and what you want to achieve next. Our team will help identify the most practical way forward."
        primary={{ label: "Talk to Our Team", href: ROUTES.public.contact }}
        secondary={{
          label: "Request a Consultation",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        headingId="business-cta-heading"
      />
    </main>
  );
}
