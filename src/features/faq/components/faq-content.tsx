"use client";

import { useState, useMemo } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Briefcase,
  Plane,
  Code2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: Sparkles },
  { id: "sourcing", label: "Global Sourcing & Trade", icon: Briefcase },
  { id: "it", label: "IT & Digital Solutions", icon: Code2 },
  { id: "travel", label: "Travel & Tourism", icon: Plane },
  { id: "orders", label: "Quotations & Orders", icon: ShieldCheck },
];

const FAQS: FaqItem[] = [
  {
    id: "sourcing-1",
    category: "sourcing",
    question: "How does Miracle International source products globally?",
    answer:
      "We operate an extensive network of verified manufacturing and wholesale partners across Asia, the Middle East, and Europe. Our specialists manage supplier discovery, quality compliance inspections, price negotiation, and international freight logistics end-to-end.",
  },
  {
    id: "sourcing-2",
    category: "sourcing",
    question: "What is the typical lead time for international sourcing orders?",
    answer:
      "Initial quotation and supplier verification typically take 24–48 hours. Production and freight timelines depend on order volume and shipping mode (air freight ~5-10 days, sea freight ~20-35 days). You will receive full tracking updates.",
  },
  {
    id: "sourcing-3",
    category: "sourcing",
    question: "Can I request custom machinery, equipment, or bespoke products?",
    answer:
      "Yes. We specialize in custom manufacturing and machinery procurement. You can share your technical specifications, drawings, or volume requirements through our 'Tell Us What You Need' portal, and our engineering & trade team will provide tailored options.",
  },
  {
    id: "it-1",
    category: "it",
    question: "What custom IT and software solutions do you develop?",
    answer:
      "We engineer enterprise resource planning (ERP) platforms, POS systems, custom management systems, cloud SaaS architectures, modern high-converting websites, and mobile applications tailored precisely to your operational workflow.",
  },
  {
    id: "it-2",
    category: "it",
    question: "Do you offer ongoing technical maintenance and system support?",
    answer:
      "Absolutely. All our IT and digital deployments include post-launch warranty support, ongoing infrastructure monitoring, security updates, and SLA-backed maintenance packages to ensure 99.9% uptime.",
  },
  {
    id: "travel-1",
    category: "travel",
    question: "How do your inbound Sri Lanka travel packages work?",
    answer:
      "Our Sri Lanka travel packages include luxury accommodation reservations, private air-conditioned chauffeured vehicles with professional tourist drivers, tailored daily itineraries, airport meet-and-greet, and 24/7 on-ground assistance.",
  },
  {
    id: "travel-2",
    category: "travel",
    question: "Can I customize an existing travel itinerary or create a private tour?",
    answer:
      "Yes! Every package can be fully personalized. You can click 'Customize This Package' on any package detail page to modify duration, hotel tiers, activities, and budget according to your preferences.",
  },
  {
    id: "travel-3",
    category: "travel",
    question: "Do you assist with flight bookings and visa requirements?",
    answer:
      "Yes, our dedicated travel desk handles worldwide flight ticketing, group flight arrangements, tourist ETA visas for Sri Lanka, and outbound visa application guidance.",
  },
  {
    id: "orders-1",
    category: "orders",
    question: "How do I request an official quotation?",
    answer:
      "You can submit your requirements through our 'Tell Us What You Need' form or our Contact page. Our project managers will review your details and send a formal itemized quotation within 24 hours.",
  },
  {
    id: "orders-2",
    category: "orders",
    question: "What payment terms and currencies do you support?",
    answer:
      "We accommodate major international payment methods including wire transfers (T/T), Letters of Credit (L/C), and secure online card payments in USD, EUR, GBP, AED, and LKR.",
  },
];

export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "sourcing-1": true,
    "it-1": true,
  });

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col">
      {/* ─── Modern Liquid Hero ─── */}
      <section className="relative isolate overflow-hidden border-b border-border/40 bg-white/70 backdrop-blur-md pt-8 pb-14 lg:pb-20">
        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -z-10 -translate-x-1/2 h-96 w-full max-w-6xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[100px]"
        />

        <div className="container-page flex flex-col items-center text-center">
          {/* Glowing Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              Help Center & Knowledge Base
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-brand-blue to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Clear, instant answers regarding our international sourcing, enterprise IT
            engineering, travel packages, and project coordination.
          </p>

          {/* Search Box */}
          <div className="relative mt-8 w-full max-w-xl">
            <Search className="text-brand-blue absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, service, or keyword..."
              className="h-14 rounded-2xl border-brand-blue/20 bg-white/95 pl-12 pr-4 text-base shadow-lg shadow-brand-blue/5 backdrop-blur-md transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
            />
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <Section tone="surface" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Left Category Filter Pills */}
          <aside className="flex flex-col gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
              Categories
            </div>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-bold transition-all",
                    isActive
                      ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                      : "bg-white text-ink/80 hover:bg-brand-blue/5 hover:text-brand-blue border border-border/70",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}

            {/* Direct Advisor Card */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-blue text-white mb-3">
                <MessageSquare className="size-5" />
              </div>
              <h3 className="font-bold text-ink text-base">Have another question?</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Our support team is online 24/7 to help you with bespoke requirements.
              </p>
              <Button asChild variant="accent" size="sm" className="mt-4 w-full rounded-xl">
                <Link href={ROUTES.public.contact}>Contact Support</Link>
              </Button>
            </div>
          </aside>

          {/* Right Accordion List */}
          <div className="flex flex-col gap-4">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-white p-12 text-center">
                <HelpCircle className="mx-auto size-12 text-muted-foreground/50 mb-3" />
                <h3 className="text-lg font-bold text-ink">No matching questions found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search term or select &quot;All Questions&quot;.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 rounded-xl"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = !!openIds[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft transition-all duration-200 hover:border-brand-blue/30"
                  >
                    <button
                      onClick={() => toggleOpen(faq.id)}
                      type="button"
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50/50 sm:p-6"
                    >
                      <span className="text-base font-bold text-ink sm:text-lg">
                        {faq.question}
                      </span>
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue transition-transform duration-300",
                          isOpen && "rotate-180 bg-brand-blue text-white",
                        )}
                      >
                        <ChevronDown className="size-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="border-t border-border/40 bg-slate-50/40 px-5 pt-4 pb-6 text-sm sm:px-6 sm:text-base leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Section>

      {/* ─── Bottom CTA ─── */}
      <CtaBanner
        title="Still Have Questions About Our Capabilities?"
        description="Connect directly with our senior project managers or submit your custom inquiry."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{
          label: "Contact Advisors",
          href: ROUTES.public.contact,
        }}
      />
    </div>
  );
}
