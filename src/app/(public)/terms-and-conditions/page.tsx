import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "The terms that apply when you use Miracle International services and this website.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.terms,
});

const LAST_UPDATED = "1 October 2025";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using the Miracle International website and services, you confirm that
        you have read, understood, and agree to be bound by these Terms &amp; Conditions. If
        you do not agree to these terms, please do not use our website or services.
      </p>
    ),
  },
  {
    id: "services",
    title: "2. Services",
    content: (
      <>
        <p>
          Miracle International provides integrated business solutions including but not
          limited to: import and export facilitation, global sourcing, wholesale trading,
          business consultation, investment support, franchise guidance, travel and tourism
          services, and IT solutions.
        </p>
        <p className="mt-3">
          The scope, pricing, timelines, and deliverables for any specific service engagement
          will be agreed in a separate quotation or service agreement. These Terms apply
          alongside, and do not replace, any specific agreement.
        </p>
      </>
    ),
  },
  {
    id: "quotations",
    title: "3. Quotations and Orders",
    content: (
      <>
        <p>
          All quotations issued by Miracle International are subject to the following
          conditions:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Quotations are valid for the period stated, or 14 days where no period is given.</li>
          <li>
            Acceptance of a quotation constitutes an agreement to proceed on the terms stated.
          </li>
          <li>
            We reserve the right to withdraw or revise a quotation before formal acceptance.
          </li>
          <li>
            Changes to requirements after acceptance may affect pricing, timelines, or scope.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payment",
    title: "4. Payment",
    content: (
      <>
        <p>
          Payment terms will be specified in the applicable quotation or service agreement.
          Unless otherwise agreed in writing:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Invoices are due within the payment period stated on the invoice.</li>
          <li>Late payments may be subject to interest or a late fee as permitted by law.</li>
          <li>
            We reserve the right to suspend or terminate services for outstanding payments.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "5. Confidentiality",
    content: (
      <p>
        Both parties agree to keep confidential any proprietary information disclosed in the
        course of the business relationship and not to disclose such information to third
        parties without prior written consent, except where required by law. This obligation
        survives the conclusion of any specific engagement.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: (
      <p>
        All content on the Miracle International website — including text, graphics, logos,
        images, and software — is the property of Miracle International or its content
        suppliers and is protected by applicable intellectual property laws. You may not
        reproduce, distribute, or create derivative works without our express written
        permission.
      </p>
    ),
  },
  {
    id: "limitation",
    title: "7. Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Miracle International will not
          be liable for any indirect, incidental, special, consequential, or punitive damages,
          including but not limited to loss of profits, data, or business opportunities.
        </p>
        <p className="mt-3">
          Our total liability for any claim arising from or related to our services shall not
          exceed the total amount paid by you for the specific service giving rise to the
          claim.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "8. Third-Party Services",
    content: (
      <p>
        Some services we provide involve coordination with third-party suppliers, carriers,
        or service providers. While we endeavour to work with reliable partners, we cannot
        guarantee the performance of third parties and accept no liability for failures,
        delays, or losses attributable to them beyond the commercially reasonable steps we
        take on your behalf.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "9. Disputes and Governing Law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with applicable law. Any
        disputes will first be pursued through good-faith discussion. If resolution cannot be
        reached, disputes may be referred to an appropriate jurisdiction as agreed between
        the parties.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    content: (
      <p>
        We reserve the right to update these Terms &amp; Conditions at any time. Changes
        will be published on this page with an updated effective date. Continued use of our
        website or services after such changes constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact",
    content: (
      <p>
        If you have questions about these Terms, please reach out to us through the{" "}
        <Link
          href={ROUTES.public.contact}
          className="text-brand-blue font-medium hover:underline"
        >
          Contact page
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
        aria-labelledby="terms-hero-heading"
        className="border-b border-slate-100 bg-slate-50/60 py-16 sm:py-20"
      >
        <div className="container-page max-w-3xl">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
            Legal
          </span>
          <h1
            id="terms-hero-heading"
            className="text-navy mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            These terms govern the use of the Miracle International website and the services
            we provide. Please read them carefully before engaging with us.
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
        description="If you need clarification on any of these terms, please get in touch with our team."
        primary={{ label: "Contact Us", href: ROUTES.public.contact }}
        secondary={{ label: "Read Our Privacy Policy", href: ROUTES.public.privacyPolicy }}
        headingId="terms-cta-heading"
      />
    </main>
  );
}
