import type { Metadata } from "next";
import { JsonLd } from "@/components/common/json-ld";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { HomeGateway } from "@/features/marketing/components/home-gateway";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  // The root page uses the full brand title rather than the "%s | brand" template.
  title: { absolute: `${APP_CONFIG.name} | Global Trade, Sourcing & Business Solutions` },
  description:
    "Miracle International connects businesses with global suppliers, wholesale products, logistics, business setup, technology, and travel services — coordinated by one partner.",
  path: ROUTES.public.home,
  image: SITE_MEDIA.heroPort,
});

/**
 * Homepage. Composes feature sections only; each section owns its layout and
 * content. Server-rendered throughout, with client JavaScript limited to the
 * header islands.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: APP_CONFIG.name,
          url: APP_CONFIG.url,
          logo: new URL("/brand/miracle-logo.svg", APP_CONFIG.url).toString(),
          description: APP_CONFIG.description,
          email: APP_CONFIG.support.email,
          telephone: APP_CONFIG.support.phone,
          sameAs: [
            APP_CONFIG.social.facebook,
            APP_CONFIG.social.instagram,
            APP_CONFIG.social.linkedin,
          ],
        }}
      />

      <HomeGateway />
    </>
  );
}
