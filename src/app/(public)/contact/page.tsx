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
        className="public-hero"
      >
        <div
          aria-hidden="true"
          className="public-hero-media bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("${SITE_MEDIA.contactHero.src}")`,
            backgroundPosition: "right center",
          }}
        />
        <div
          aria-hidden="true"
          className="public-hero-haze"
        />
        <div
          aria-hidden="true"
          className="public-hero-fade"
        />

        <div className="container-page public-hero-content">
          <div className="public-hero-copy">
            <div className="public-hero-badge">
              <span aria-hidden="true" className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              Direct Support &amp; Client Advisory
            </div>

            <h1
              id="contact-hero-heading"
              className="public-hero-title"
            >
              Let&apos;s Talk About{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                What You Need.
              </span>
            </h1>

            <p className="public-hero-description">
              Reach out with an inquiry, quotation request or business requirement. Our
              multidisciplinary team is ready to structure the right solution for you.
            </p>

            <div className="public-hero-actions">
              <Button asChild size="xl" variant="accent" className="shadow-md">
                <a href="#contact-form">
                  Send an Inquiry
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="secondary-hero"
                size="xl"
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

    </main>
  );
}

