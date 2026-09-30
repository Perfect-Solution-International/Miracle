import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  FileText,
  MessageSquare,
  Plane,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { SocialLinks } from "@/components/common/social-links";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  CONTACT_CHANNELS,
  ContactForm,
  LocationSection,
  type ContactChannel,
} from "@/features/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

import lightPageStyles from "../light-page.module.css";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Reach out to us for inquiries, quotations or any business requirements. Our team will get back to you as soon as possible.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.contact,
  image: SITE_MEDIA.handshake,
});

const serviceDirections = [
  {
    title: "General Inquiry",
    description: "Start with a question or tell us what you need.",
    href: "#contact-form",
    icon: MessageSquare,
  },
  {
    title: "Business Solutions",
    description: "Planning, setup, equipment, growth and business support.",
    href: ROUTES.public.businessSolutions,
    icon: BriefcaseBusiness,
  },
  {
    title: "IT Solutions",
    description: "Websites, software, systems, consulting and automation.",
    href: ROUTES.public.itSolutions,
    icon: Code2,
  },
  {
    title: "Travel & Tourism",
    description: "Travel planning, visas, flights and tourism services.",
    href: ROUTES.public.travelTourism,
    icon: Plane,
  },
  {
    title: "Services & Quotations",
    description: "Explore services or send a specific quotation request.",
    href: ROUTES.public.requestQuotation,
    icon: FileText,
  },
] as const;

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const { icon: Icon, tone, title, lines, href } = channel;
  const content = (
    <>
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl text-white",
          tone === "blue" ? "bg-brand-blue" : "bg-brand-red",
        )}
      >
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-ink font-bold">{title}</p>
        {lines.map((line) => (
          <p
            key={line}
            className="text-muted-foreground text-sm leading-relaxed break-words"
          >
            {line}
          </p>
        ))}
      </div>
      {href ? (
        <ChevronRight aria-hidden="true" className="text-brand-blue/60 size-4 shrink-0" />
      ) : null}
    </>
  );
  const className =
    "flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all";

  if (!href) return <div className={className}>{content}</div>;

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        className,
        "hover:border-brand-blue hover:shadow-lift hover:-translate-y-0.5",
      )}
    >
      {content}
    </a>
  );
}

export default function Page() {
  const phone = CONTACT_CHANNELS.find((channel) => channel.title === "Phone");
  const email = CONTACT_CHANNELS.find((channel) => channel.title === "Email");

  return (
    <main className="bg-white">
      <section
        aria-labelledby="contact-hero-heading"
        className="relative isolate flex min-h-[580px] items-center overflow-hidden border-b border-slate-200/80 bg-white lg:min-h-[660px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("${SITE_MEDIA.contactHero.src}")`,
            backgroundPosition: "right center",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent max-sm:via-white/95 max-sm:to-white/65 lg:from-white/95 lg:via-white/70 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent"
        />

        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
              <span aria-hidden="true" className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              Direct Support &amp; Client Advisory
            </div>

            <h1
              id="contact-hero-heading"
              className="text-3xl leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              Let&apos;s Talk About{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                What You Need.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Reach out with an inquiry, quotation request or business requirement. Our
              multidisciplinary team is ready to structure the right solution for you.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button asChild size="xl" className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg">
                <a href="#contact-form">
                  Send an Inquiry
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="rounded-xl border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <Link href={ROUTES.public.tellUsWhatYouNeed}>Share a Requirement</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3">
              {[phone, email].map((channel) => {
                if (!channel) return null;
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.title}
                    href={channel.href}
                    className="group flex min-w-0 items-center gap-3 text-navy"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-blue/15 bg-white text-brand-blue">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold">
                        {channel.title}
                      </span>
                      <span className="block truncate text-xs text-slate-700 group-hover:text-brand-blue">
                        {channel.lines[0]}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Section
        aria-labelledby="contact-details-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16"
      >
        <div>
          <SectionHeading
            id="contact-details-heading"
            eyebrow="Our Contact Details"
            title="Start the Conversation Your Way"
            description="Whether you need products, suppliers, business consultation, travel assistance, technology or another form of support, our team is ready to assist."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {CONTACT_CHANNELS.map((channel) => (
              <ContactChannelCard key={channel.title} channel={channel} />
            ))}
          </div>
          <div className="mt-8">
            <p className="text-ink mb-3 font-bold">Follow Us</p>
            <SocialLinks />
          </div>
        </div>
        <ContactForm />
      </Section>

      <Section
        aria-labelledby="service-direction-heading"
        className="border-y border-slate-100"
      >
        <SectionHeading
          id="service-direction-heading"
          align="center"
          eyebrow="Find the Right Direction"
          title="Choose the Area Closest to Your Requirement"
          description="Use the general inquiry form or go directly to the service area that best matches what you need."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {serviceDirections.map(({ title, description, href, icon: Icon }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl public-card-clickable p-6"
              >
                <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue flex size-11 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-ink mt-5 font-bold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {description}
                </p>
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue mt-auto box-content size-4 pt-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <LocationSection />

      <CtaBanner
        eyebrow="Need More Detail?"
        title="Tell Us the Requirement and We'll Help You Move Forward"
        description="For a detailed product, service or project request, send us the specifications and our team will review the next steps with you."
        primary={{ label: "Request a Quotation", href: ROUTES.public.requestQuotation }}
        secondary={{ label: "Visit Our FAQ", href: ROUTES.public.faq }}
        headingId="contact-cta-heading"
        className={lightPageStyles.lightCta}
      />
    </main>
  );
}

