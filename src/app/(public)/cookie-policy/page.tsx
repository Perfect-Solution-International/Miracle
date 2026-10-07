import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Cookie Policy";
const DESCRIPTION =
  "How this website uses cookies and how you can manage your preferences.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.cookiePolicy,
});

const LAST_UPDATED = "1 October 2025";

type CookieType = {
  name: string;
  purpose: string;
  duration: string;
};

const COOKIE_TYPES: CookieType[] = [
  {
    name: "Strictly Necessary",
    purpose:
      "These cookies are essential for the website to function correctly. They enable core features such as page navigation, form submission, and access to secure areas. The website cannot function properly without these cookies.",
    duration: "Session or up to 12 months",
  },
  {
    name: "Functional",
    purpose:
      "These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personalised features. They may be set by us or by third-party providers whose services appear on our pages.",
    duration: "Up to 12 months",
  },
  {
    name: "Analytics & Performance",
    purpose:
      "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to identify which pages are most visited and improve the overall experience.",
    duration: "Up to 24 months",
  },
  {
    name: "Marketing",
    purpose:
      "These cookies may be set by our advertising partners through our website. They may be used to build a profile of your interests and show you relevant content on other sites. They do not store directly personal information but identify your browser and device uniquely.",
    duration: "Up to 12 months",
  },
];

const sections = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    content: (
      <p>
        Cookies are small text files placed on your device (computer, tablet, or mobile) by
        websites you visit. They are widely used to make websites work or work more
        efficiently, as well as to provide information to the website owners. Cookies cannot
        run programmes or deliver viruses to your device.
      </p>
    ),
  },
  {
    id: "how-we-use",
    title: "2. How We Use Cookies",
    content: (
      <p>
        The Miracle International website uses cookies to improve your experience, analyse
        site traffic, and support certain functionality. We may also use cookies to remember
        your preferences or to provide features requested by you. We do not use cookies to
        collect or store personal information beyond what is necessary for these purposes.
      </p>
    ),
  },
  {
    id: "types",
    title: "3. Types of Cookies We Use",
    content: (
      <div className="mt-1 space-y-6">
        {COOKIE_TYPES.map((type) => (
          <div key={type.name} className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
            <h3 className="text-ink font-bold">{type.name}</h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{type.purpose}</p>
            <p className="text-muted-foreground mt-2 text-xs">
              <strong className="text-ink font-semibold">Typical duration:</strong>{" "}
              {type.duration}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "third-party",
    title: "4. Third-Party Cookies",
    content: (
      <p>
        Some pages on our website may include content or tools provided by third parties
        (such as embedded maps, analytics platforms, or social media plugins). These third
        parties may set their own cookies and we do not have control over their use of those
        cookies. We encourage you to review the privacy and cookie policies of any third-party
        services you interact with through our website.
      </p>
    ),
  },
  {
    id: "managing",
    title: "5. Managing Your Cookie Preferences",
    content: (
      <>
        <p>
          You can control and manage cookies in a number of ways. Most browsers allow you to
          refuse or delete cookies. However, please note that disabling or blocking certain
          cookies may affect the functionality and features available on our website.
        </p>
        <p className="mt-3">
          To manage cookies through your browser, refer to your browser&apos;s help
          documentation:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm">
          <li>Google Chrome: Settings &gt; Privacy and security &gt; Cookies and other site data</li>
          <li>Mozilla Firefox: Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
          <li>Safari: Preferences &gt; Privacy &gt; Cookies and website data</li>
          <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "6. Changes to This Cookie Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time as our use of cookies or
        applicable regulations change. Any updates will be posted on this page with a revised
        effective date. We encourage you to review this page periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "7. Contact Us",
    content: (
      <p>
        If you have questions about our use of cookies, please contact us through the{" "}
        <Link
          href={ROUTES.public.contact}
          className="text-brand-blue font-medium hover:underline"
        >
          Contact page
        </Link>
        . For more information on how we handle your personal data more broadly, please see
        our{" "}
        <Link
          href={ROUTES.public.privacyPolicy}
          className="text-brand-blue font-medium hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
] as const;

export default function Page() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        aria-labelledby="cookie-hero-heading"
        className="border-b border-slate-100 bg-slate-50/60 py-16 sm:py-20"
      >
        <div className="container-page max-w-3xl">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
            Legal
          </span>
          <h1
            id="cookie-hero-heading"
            className="text-navy mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            This policy explains what cookies are, how we use them on the Miracle International
            website, and what control you have over your preferences.
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            <strong className="text-ink font-semibold">Last updated:</strong> {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <Section spacing="default">
        <div className="max-w-3xl space-y-10">
          {sections.map(({ id, title, content }) => (
            <article key={id} id={id} className="scroll-mt-24">
              <h2 className="text-ink text-xl font-bold sm:text-2xl">{title}</h2>
              <div className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
                {content}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBanner
        eyebrow="Questions?"
        title="We're Here to Help"
        description="If you need clarification on how we use cookies, our team is happy to assist."
        primary={{ label: "Contact Us", href: ROUTES.public.contact }}
        secondary={{ label: "Read Our Privacy Policy", href: ROUTES.public.privacyPolicy }}
        headingId="cookie-cta-heading"
      />
    </main>
  );
}
