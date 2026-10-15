import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { BrandLogo } from "@/components/common/brand-logo";
import { SocialLinks } from "@/components/common/social-links";
import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { PUBLIC_FOOTER_NAV } from "@/config/public-navigation";
import { ROUTES } from "@/config/routes";

import { cn } from "@/lib/utils";

const headingClassName =
  "mb-3 text-[0.9375rem] font-[750] tracking-[-0.015em] text-white after:mt-2 after:block after:h-0.5 after:w-7 after:bg-brand-red after:content-['']";
const contactItemClassName =
  "flex items-start gap-3 wrap-anywhere transition-colors duration-180";

function ContactItem({
  icon: Icon,
  label,
  children,
  href,
}: {
  icon: LucideIcon;
  label: string;
  children: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon aria-hidden="true" className="text-brand-red mt-1 size-4 shrink-0" />
      <span>
        <span className="mb-0.5 block text-xs leading-[1.65] font-[650] text-white">
          {label}
        </span>
        {children}
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className={cn(contactItemClassName, "hover:text-white")}>
          {content}
        </a>
      ) : (
        <span className={contactItemClassName}>{content}</span>
      )}
    </li>
  );
}

/** Server-rendered footer; navigation and contact details retain their shared sources. */
export function PublicFooter() {
  const { support } = APP_CONFIG;

  return (
    <footer className="text-brand-blue-muted relative isolate bg-[linear-gradient(115deg,var(--navy-light),var(--navy)_75%)] text-[0.8125rem] leading-[1.65] motion-reduce:[&_a]:transition-none [&_a:focus-visible]:rounded-[3px] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-5 [&_a:focus-visible]:outline-white motion-reduce:[&_svg]:transition-none">
      <div className="container-page">
        <section
          className="relative flex flex-col gap-4 border-b border-white/14 py-5 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
          aria-labelledby="footer-requirement-title"
        >
          <div>
            <p className="text-brand-blue-muted mb-1.5 text-[0.6875rem] font-bold tracking-[0.16em] uppercase">
              One partner. Every possibility.
            </p>
            <h2
              id="footer-requirement-title"
              className="mb-2 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-[750] tracking-[-0.035em] text-white"
            >
              Have a Business Requirement?
            </h2>
            <p className="max-w-xl text-sm leading-[1.65] text-white/74">
              From international product sourcing to complete business setup, tell us what
              you need.
            </p>
          </div>
          <Link
            href={ROUTES.public.tellUsWhatYouNeed}
            className="bg-brand-red hover:bg-brand-red-dark inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-[0.625rem] px-6 py-2.5 text-sm leading-[1.65] font-bold text-white transition-[background-color,transform] duration-180 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:self-start lg:self-center"
          >
            Tell Us What You Need <ArrowRight aria-hidden="true" className="size-4.5" />
          </Link>
        </section>

        <div className="relative grid grid-cols-2 gap-x-4 gap-y-7 py-6 sm:gap-x-7 sm:py-8 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))] xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.05fr)_minmax(0,1.25fr)]">
          <div
            className="text-brand-blue-muted pointer-events-none absolute inset-x-0 top-4 opacity-[0.07]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 640 360" fill="none" className="block max-h-120 w-full">
              <ellipse
                cx="320"
                cy="180"
                rx="266"
                ry="144"
                stroke="currentColor"
                strokeDasharray="1 9"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <ellipse
                cx="320"
                cy="180"
                rx="176"
                ry="144"
                stroke="currentColor"
                strokeDasharray="1 9"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <ellipse
                cx="320"
                cy="180"
                rx="72"
                ry="144"
                stroke="currentColor"
                strokeDasharray="1 9"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M70 130h500M54 180h532M70 230h500M126 82h388M126 278h388"
                stroke="currentColor"
                strokeDasharray="1 9"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M113 132Q320 0 511 230M177 278Q274 90 471 82M113 132Q256 280 511 230"
                stroke="currentColor"
              />
              <g fill="currentColor">
                <circle cx="113" cy="132" r="4" />
                <circle cx="511" cy="230" r="4" />
                <circle cx="177" cy="278" r="4" />
                <circle cx="471" cy="82" r="4" />
              </g>
            </svg>
          </div>

          <div className="z-1 col-span-full min-w-0 lg:col-span-1">
            <BrandLogo
              variant="inverse"
              className="max-w-full rounded-lg bg-white px-3.5 py-3"
              imageClassName="h-auto w-47 max-w-full sm:h-auto"
            />
            <p className="mt-4 max-w-100 text-sm leading-[1.7] text-white/76 xl:text-[0.8125rem]">
              Your global partner for sourcing, business setup, trade, travel, IT
              solutions and more. Tell us what your business needs, and we provide or
              coordinate the solution from A to Z.
            </p>
            <p className="relative mt-4 pl-7.5 text-[0.8125rem] font-[650] text-white">
              <Globe2
                aria-hidden="true"
                className="text-brand-blue-muted absolute top-1 left-0 size-4.5"
              />
              Global Connections.
              <br />
              Real Opportunities.
            </p>
            <SocialLinks
              tone="inverse"
              configuredOnly
              className="[&_a:hover]:border-brand-red [&_a:hover]:bg-brand-red mt-4 flex-wrap"
            />
          </div>

          {PUBLIC_FOOTER_NAV.map((group) => (
            <nav
              key={group.title}
              aria-label={`Footer ${group.title}`}
              className="z-1 min-w-0"
            >
              <h2 className={headingClassName}>{group.title}</h2>
              <ul className="grid gap-0.5">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group flex w-fit max-w-full items-baseline gap-1.5 py-0.75 transition-colors duration-180 hover:text-white sm:py-0.5",
                        link.title === "Tell Us What You Need" && "font-[750] text-white",
                      )}
                    >
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "text-brand-blue-muted/55 group-hover:text-brand-red relative top-0.5 size-3 shrink-0 transition-[transform,color] duration-180 group-hover:translate-x-0.75 motion-reduce:group-hover:translate-x-0",
                          link.title === "Tell Us What You Need" && "text-brand-red",
                        )}
                      />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section className="z-1 min-w-0" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className={headingClassName}>
              Get in Touch
            </h2>
            <address className="not-italic">
              <ul className="grid gap-3">
                <ContactItem icon={MapPin} label="Our office">
                  {support.address}
                </ContactItem>
                <ContactItem
                  icon={Phone}
                  label="Call us"
                  href={`tel:${support.phone.replace(/\s+/g, "")}`}
                >
                  {support.phone}
                </ContactItem>
                <ContactItem
                  icon={Mail}
                  label="Email us"
                  href={`mailto:${support.email}`}
                >
                  {support.email}
                </ContactItem>
                {support.hours && (
                  <ContactItem icon={Clock} label="Business hours">
                    {support.hours}
                  </ContactItem>
                )}
              </ul>
            </address>
            <div className="mt-4 border-t border-white/12 pt-4">
              <p className="mb-2.5 text-white/76">Let’s move your business forward.</p>
              <Link
                href={ROUTES.public.contact}
                className="hover:text-brand-blue-muted inline-flex min-h-8 items-center gap-2 font-bold text-white"
              >
                Talk to our team <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-white/12 bg-black/12 text-[0.6875rem] text-white/65">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-center lg:flex-row lg:flex-wrap lg:text-left">
          <p>
            &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
          </p>
          <nav aria-label="Footer legal">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 [&_a]:inline-block [&_a]:py-1.5 [&_a]:transition-colors [&_a]:duration-180 [&_a:hover]:text-white">
              <li>
                <a href={ROUTES.sitemap}>Sitemap</a>
              </li>
              <li>
                <Link href={ROUTES.public.terms}>Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href={ROUTES.public.privacyPolicy}>Privacy Policy</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2.5">
            <span>Developed by</span>
            <Image
              src="/brand/perfect-solution-logo.png"
              alt="Perfect Solution International (Pvt) Ltd"
              width={160}
              height={160}
              className="h-7 w-auto rounded-sm object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
