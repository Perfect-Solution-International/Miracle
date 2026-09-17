import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Globe2, Plane, Ship, Wrench, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  // The root page uses the default title rather than the "%s | brand" template.
  title: {
    absolute: `${APP_CONFIG.name} | Integrated Global Trade & Business Solutions`,
  },
  description: APP_CONFIG.description,
  alternates: { canonical: "/" },
};

const SERVICES: readonly {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Global Sourcing",
    description: "Verified suppliers across Asia, the Middle East, and Europe.",
    href: ROUTES.public.globalSourcing,
    icon: Globe2,
  },
  {
    title: "Imports & Exports",
    description: "Freight, customs clearance, and end-to-end documentation.",
    href: ROUTES.public.services,
    icon: Ship,
  },
  {
    title: "Business Solutions",
    description: "Company setup, consulting, and project delivery.",
    href: ROUTES.public.businessSolutions,
    icon: Building2,
  },
  {
    title: "Travel & Visa",
    description: "Business travel, visa processing, and tourism services.",
    href: ROUTES.public.travelTourism,
    icon: Plane,
  },
  {
    title: "IT Solutions",
    description: "Software, infrastructure, and digital transformation.",
    href: ROUTES.public.itSolutions,
    icon: Wrench,
  },
];

/**
 * Marketing home page. A Server Component with no client JavaScript, so it is
 * fully prerendered and fast for first-time visitors.
 */
export default function HomePage() {
  // Structured data helps search engines represent the organisation correctly.
  const organisationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    description: APP_CONFIG.description,
    email: APP_CONFIG.support.email,
    telephone: APP_CONFIG.support.phone,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised server-side from a literal, so there is no untrusted input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Integrated global trade and business solutions
          </h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Miracle International connects businesses with verified suppliers worldwide
            and handles sourcing, wholesale, imports, exports, and everything in between.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>Tell us what you need</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={ROUTES.public.services}>Explore services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">What we do</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <Icon className="text-primary size-6" aria-hidden="true" />
                      <CardTitle className="text-lg">
                        <Link href={service.href} className="hover:underline">
                          {service.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
