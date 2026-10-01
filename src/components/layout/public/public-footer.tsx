import Image from "next/image";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/common/brand-logo";
import { SocialLinks } from "@/components/common/social-links";
import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { PUBLIC_FOOTER_NAV } from "@/config/public-navigation";

function ContactItem({
  icon: Icon,
  children,
  href,
}: {
  icon: LucideIcon;
  children: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon aria-hidden="true" className="text-brand-blue-muted mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-start gap-3 rounded-sm transition-colors hover:text-white"
        >
          {content}
        </a>
      ) : (
        <span className="flex items-start gap-3">{content}</span>
      )}
    </li>
  );
}

/** Large navy footer. Fully server-rendered; link data from `public-navigation`. */
export function PublicFooter() {
  const { support } = APP_CONFIG;

  return (
    <footer className="bg-navy relative isolate overflow-hidden text-white/70">
      {/* Brand accent: blue-to-red hairline along the top edge. */}
      <div
        aria-hidden="true"
        className="from-brand-blue via-brand-blue to-brand-red h-1 bg-gradient-to-r"
      />

      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Contact Column */}
          <div className="space-y-6 lg:col-span-4 lg:pr-8">
            <BrandLogo variant="inverse" />
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              A trusted global platform connecting businesses with international suppliers,
              enterprise IT &amp; software solutions, end-to-end trade operations, and premium
              inbound &amp; outbound travel services.
            </p>

            <ul className="space-y-3 text-sm">
              <ContactItem icon={MapPin}>{support.address}</ContactItem>
              <ContactItem icon={Phone} href={`tel:${support.phone.replace(/\s+/g, "")}`}>
                {support.phone}
              </ContactItem>
              <ContactItem icon={Mail} href={`mailto:${support.email}`}>
                {support.email}
              </ContactItem>
              <ContactItem icon={Clock}>{support.hours}</ContactItem>
            </ul>

            <div className="pt-2">
              <SocialLinks tone="inverse" />
            </div>
          </div>

          {/* Navigation Columns (5 balanced categories matching site offerings) */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5 lg:col-span-8"
          >
            {PUBLIC_FOOTER_NAV.map((group) => (
              <div key={group.title} className="space-y-4">
                <h2 className="text-sm font-bold tracking-wide text-white border-b border-white/10 pb-2">
                  {group.title}
                </h2>
                <ul className="space-y-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.title}`}>
                      <Link
                        href={link.href}
                        className="inline-block rounded-sm transition-colors hover:text-white"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Bar: Copyright & Developer Credit */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2.5">
            <span className="text-white/60">Developed by</span>
            <div className="inline-flex items-center">
              <Image
                src="/brand/perfect-solution-logo.png"
                alt="Perfect Solution International (Pvt) Ltd"
                width={160}
                height={160}
                className="h-8 w-auto rounded-sm object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
