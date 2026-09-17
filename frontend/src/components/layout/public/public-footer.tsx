import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/common/brand-logo";
import { SocialLinks } from "@/components/common/social-links";
import { APP_CONFIG, CURRENT_YEAR } from "@/config/app";
import { PUBLIC_FOOTER_NAV, PUBLIC_LEGAL_NAV } from "@/config/public-navigation";

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
      <div
        aria-hidden="true"
        className="bg-grid-inverse absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      {/* Brand accent: blue-to-red hairline along the top edge. */}
      <div
        aria-hidden="true"
        className="from-brand-blue via-brand-blue to-brand-red h-1 bg-gradient-to-r"
      />

      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-4 lg:pr-8">
            <BrandLogo variant="inverse" />
            <p className="max-w-sm text-sm leading-relaxed">
              A global B2B, wholesale, and business solutions platform connecting
              businesses with suppliers, logistics, technology, and professional services
              across international markets.
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
            <SocialLinks tone="inverse" />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8"
          >
            {PUBLIC_FOOTER_NAV.map((group) => (
              <div key={group.title} className="space-y-5">
                <h2 className="text-sm font-bold tracking-wide text-white">
                  {group.title}
                </h2>
                <ul className="space-y-3 text-sm">
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

        <div className="mt-16 flex flex-col-reverse gap-5 border-t border-white/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {CURRENT_YEAR} {APP_CONFIG.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {PUBLIC_LEGAL_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
