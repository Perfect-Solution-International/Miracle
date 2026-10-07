import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Miracle International collects, uses, and protects your information.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.privacyPolicy,
});

const LAST_UPDATED = "1 October 2025";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Miracle International (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
          personal information and your right to privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website or
          use our services.
        </p>
        <p className="mt-3">
          Please read this policy carefully. If you disagree with the terms of this Privacy
          Policy, please discontinue use of the website.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>
            <strong>Personal identification information</strong> — Name, email address, phone
            number, company name, and similar contact details you provide when filling out
            forms or contacting us.
          </li>
          <li>
            <strong>Business information</strong> — Details about your business requirements,
            product specifications, project descriptions, and related information you share
            when requesting services or quotations.
          </li>
          <li>
            <strong>Usage data</strong> — Information about how you access and interact with
            our website, including IP addresses, browser type, pages visited, and time spent.
          </li>
          <li>
            <strong>Communication records</strong> — Records of correspondence you send us,
            including emails, form submissions, and support messages.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Process and respond to your service requests and inquiries</li>
          <li>Prepare and deliver quotations, proposals, and project documentation</li>
          <li>Coordinate with our suppliers, partners, and service providers on your behalf</li>
          <li>Communicate updates regarding your requirements or orders</li>
          <li>Improve the content, functionality, and performance of our website</li>
          <li>Send you relevant service information or updates where you have consented</li>
          <li>Comply with applicable legal and regulatory obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "4. Sharing of Information",
    content: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may
          share your information with:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>
            <strong>Verified suppliers and service partners</strong> — Only to the extent
            necessary to fulfil a request or quotation you have initiated.
          </li>
          <li>
            <strong>Professional advisors</strong> — Legal, accounting, or compliance
            professionals where required.
          </li>
          <li>
            <strong>Regulatory authorities</strong> — Where required by applicable law, court
            order, or government regulation.
          </li>
        </ul>
        <p className="mt-3">
          Any third parties with whom we share information are required to maintain
          confidentiality and use the information only for the specified purpose.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: (
      <p>
        We implement appropriate technical and organisational measures to protect your
        personal information against unauthorised access, alteration, disclosure, or
        destruction. However, no method of transmission over the internet or electronic
        storage is 100% secure. While we strive to use commercially acceptable means to
        protect your information, we cannot guarantee its absolute security.
      </p>
    ),
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: (
      <p>
        We retain your personal information for as long as necessary to fulfil the purposes
        described in this policy, unless a longer retention period is required or permitted
        by law. When information is no longer needed, we will securely delete or anonymise it.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: (
      <>
        <p>
          You have the right to request access to, correction of, or deletion of personal
          information we hold about you. You may also object to or request restriction of
          processing, and request data portability where applicable. To exercise any of these
          rights, please contact us at the details below.
        </p>
        <p className="mt-3">
          We will respond to your request within a reasonable timeframe and in accordance
          with applicable data protection legislation.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "8. Cookies",
    content: (
      <p>
        Our website uses cookies and similar tracking technologies to improve your experience
        and analyse website traffic. For more information about how we use cookies and how
        you can manage your preferences, please review our{" "}
        <Link
          href={ROUTES.public.cookiePolicy}
          className="text-brand-blue font-medium hover:underline"
        >
          Cookie Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "9. Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites. We have no control over the
        content, privacy policies, or practices of those sites and accept no responsibility
        for them. We encourage you to review the privacy policy of any third-party website
        you visit.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on
        this page with an updated effective date. We encourage you to review this policy
        periodically to stay informed about how we protect your information.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: (
      <p>
        If you have questions, concerns, or requests relating to this Privacy Policy, please
        contact us via the{" "}
        <Link
          href={ROUTES.public.contact}
          className="text-brand-blue font-medium hover:underline"
        >
          Contact page
        </Link>{" "}
        or email us directly at the address listed there.
      </p>
    ),
  },
] as const;

export default function Page() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        aria-labelledby="privacy-hero-heading"
        className="border-b border-slate-100 bg-slate-50/60 py-16 sm:py-20"
      >
        <div className="container-page max-w-3xl">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
            Legal
          </span>
          <h1
            id="privacy-hero-heading"
            className="text-navy mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            This policy explains how Miracle International collects, uses, and protects your
            personal information. We are committed to handling your data with care and
            transparency.
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
        description="If you have any questions about how we handle your data, our team is happy to assist."
        primary={{ label: "Contact Us", href: ROUTES.public.contact }}
        secondary={{ label: "View Cookie Policy", href: ROUTES.public.cookiePolicy }}
        headingId="privacy-cta-heading"
      />
    </main>
  );
}
