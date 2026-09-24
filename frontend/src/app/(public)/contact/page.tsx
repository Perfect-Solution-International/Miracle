import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { ContactDetailsSection, ContactHero, LocationSection } from "@/features/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Reach out to us for inquiries, quotations or any business requirements. Our team will get back to you as soon as possible.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.contact,
  image: SITE_MEDIA.heroPort,
});

export default function Page() {
  return (
    <>
      <ContactHero />
      <ContactDetailsSection />
      <LocationSection />
    </>
  );
}
