"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Code2,
  Globe2,
  HelpCircle,
  Megaphone,
  Package,
  Plane,
  Search,
  Sparkles,
  Stamp,
  Store,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

interface FaqCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface FaqItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}

const FAQ_CATEGORIES: readonly FaqCategory[] = [
  { id: "all", label: "All Questions", icon: Sparkles },
  { id: "general", label: "General", icon: HelpCircle },
  { id: "import-export", label: "Import & Export", icon: Globe2 },
  { id: "wholesale", label: "Wholesale & Products", icon: Package },
  { id: "trading", label: "Trading", icon: Warehouse },
  { id: "travel", label: "Travel & Tourism", icon: Plane },
  { id: "visa", label: "Visa Services", icon: Stamp },
  { id: "business", label: "Business Solutions", icon: Briefcase },
  { id: "franchise", label: "Franchise", icon: Store },
  { id: "investment", label: "Investment", icon: TrendingUp },
  { id: "it", label: "IT Solutions", icon: Code2 },
  { id: "marketing", label: "Marketing & Advertising", icon: Megaphone },
];

const FAQS: readonly FaqItem[] = [
  // General
  {
    id: "gen-1",
    categoryId: "general",
    question: "What is Miracle International?",
    answer:
      "Miracle International is a multi-sector solutions platform that connects businesses and individuals with international trade, enterprise IT, business setup, and curated travel services.",
  },
  {
    id: "gen-2",
    categoryId: "general",
    question: "What services does Miracle International provide?",
    answer:
      "We provide structured support across Business Solutions, IT & Digital Solutions, Travel & Tourism, Trade Operations (Trading, Import & Export, Franchise, Investment), and Wholesale Sourcing.",
  },
  {
    id: "gen-3",
    categoryId: "general",
    question: "How can I contact Miracle International?",
    answer:
      "You can contact our team via our website Contact page, by phone, via email, or by submitting your requirement directly through our 'Tell Us What You Need' form.",
  },
  {
    id: "gen-4",
    categoryId: "general",
    question: "How do I submit a requirement?",
    answer:
      "Visit our 'Tell Us What You Need' page, select the relevant category for your inquiry, enter your project details and contact information, and our specialists will get in touch with you.",
  },

  // Import & Export
  {
    id: "ie-1",
    categoryId: "import-export",
    question: "Can I request products or equipment from other countries?",
    answer:
      "Yes. We assist businesses with international product sourcing, supplier coordination, and cross-border import/export documentation.",
  },
  {
    id: "ie-2",
    categoryId: "import-export",
    question: "Can I submit bulk import or export requirements?",
    answer:
      "Yes. We handle commercial and bulk requests for businesses requiring consistent supply, raw materials, or specialized machinery.",
  },
  {
    id: "ie-3",
    categoryId: "import-export",
    question: "What information should I provide for an import or export request?",
    answer:
      "Helpful details include product specifications, target quantities, desired delivery timeline, and the destination country or port.",
  },

  // Wholesale & Products
  {
    id: "ws-1",
    categoryId: "wholesale",
    question: "What product categories are available for wholesale sourcing?",
    answer:
      "We coordinate sourcing across machinery, industrial equipment, electronics, furniture, apparel, and raw materials from verified suppliers.",
  },
  {
    id: "ws-2",
    categoryId: "wholesale",
    question: "How does the wholesale order process work?",
    answer:
      "You submit your product requirements, and our sourcing team coordinates pricing, specifications, and logistics with verified supplier networks.",
  },

  // Trading
  {
    id: "tr-1",
    categoryId: "trading",
    question: "How does trading support work with Miracle International?",
    answer:
      "We help identify and connect reliable suppliers and buyers, and assist in coordinating trade documentation and order logistics.",
  },
  {
    id: "tr-2",
    categoryId: "trading",
    question: "Can you assist with local and cross-border trading?",
    answer:
      "Yes. We support both domestic trade operations within Sri Lanka and international cross-border trading partnerships.",
  },

  // Travel & Tourism
  {
    id: "tv-1",
    categoryId: "travel",
    question: "Do you provide inbound travel services to Sri Lanka?",
    answer:
      "Yes. We offer tailored inbound itineraries covering cultural heritage, hill country, wildlife expeditions, and coastal retreats across Sri Lanka.",
  },
  {
    id: "tv-2",
    categoryId: "travel",
    question: "Do you provide outbound travel services?",
    answer:
      "Yes. We coordinate outbound holiday packages, flight bookings, and travel advisory for international destinations.",
  },
  {
    id: "tv-3",
    categoryId: "travel",
    question: "Can I customize a travel package?",
    answer:
      "Yes. You can customize destinations, duration, accommodation preferences, and activities to match your schedule and travel plans.",
  },
  {
    id: "tv-4",
    categoryId: "travel",
    question: "Can I request flight ticket assistance?",
    answer:
      "Yes. Our travel desk assists with flight reservations, airline options, and ticketing for individual and group travel.",
  },

  // Visa Services
  {
    id: "vs-1",
    categoryId: "visa",
    question: "Do you provide visa guidance and document preparation?",
    answer:
      "Yes. We provide structured document auditing, embassy checklist guidance, and appointment scheduling support for travel and work visas.",
  },
  {
    id: "vs-2",
    categoryId: "visa",
    question: "Do you guarantee visa approvals?",
    answer:
      "No. Official visa approvals remain the exclusive prerogative of the respective government authorities and embassies. We ensure your documentation is accurately prepared according to official requirements.",
  },
  {
    id: "vs-3",
    categoryId: "visa",
    question: "How early should I prepare my visa documentation?",
    answer:
      "We recommend preparing documentation 4 to 8 weeks prior to your intended departure date to allow sufficient time for verifications and appointments.",
  },

  // Business Solutions
  {
    id: "bs-1",
    categoryId: "business",
    question: "Can Miracle International help with starting a business?",
    answer:
      "Yes. We offer practical advisory for new ventures, including business planning, setup guidance, equipment sourcing, and operational planning.",
  },
  {
    id: "bs-2",
    categoryId: "business",
    question: "What is included in business consultation and planning?",
    answer:
      "Consultation includes strategic guidance on business models, market positioning, setup requirements, and practical operational steps.",
  },

  // Franchise
  {
    id: "fr-1",
    categoryId: "franchise",
    question: "Do you provide franchise opportunities?",
    answer:
      "Yes. We assist entrepreneurs and investors in exploring franchise business models across food & beverage, retail, services, and other sectors.",
  },
  {
    id: "fr-2",
    categoryId: "franchise",
    question: "What support is available for franchise setup and opening?",
    answer:
      "We help with franchise model selection, planning, equipment sourcing coordination, and launch preparation.",
  },

  // Investment
  {
    id: "iv-1",
    categoryId: "investment",
    question: "Can I submit an investment or business opportunity inquiry?",
    answer:
      "Yes. Individuals and businesses looking to explore new ventures, expand operations, or find commercial partnerships can submit an inquiry.",
  },
  {
    id: "iv-2",
    categoryId: "investment",
    question: "How are investment inquiries reviewed?",
    answer:
      "Our team reviews your sector of interest, resources, and objectives to explore practical, verified business opportunities.",
  },

  // IT Solutions
  {
    id: "it-1",
    categoryId: "it",
    question: "What type of IT and software solutions do you offer?",
    answer:
      "We provide modern website development, custom software engineering, POS systems, business management tools, and workflow automation.",
  },
  {
    id: "it-2",
    categoryId: "it",
    question: "Do you provide ongoing support after software delivery?",
    answer:
      "Yes. We provide deployment support, maintenance guidance, and updates to keep your digital systems performing reliably.",
  },

  // Marketing & Advertising
  {
    id: "mkt-1",
    categoryId: "marketing",
    question: "What marketing and promotion services do you offer?",
    answer:
      "We help businesses with brand positioning, digital marketing strategies, creative materials, and multi-channel campaign coordination.",
  },
  {
    id: "mkt-2",
    categoryId: "marketing",
    question: "Can marketing support be connected with our product launch or expansion?",
    answer:
      "Yes. Our marketing services can be aligned directly with your business setup, product sourcing, or market expansion plans.",
  },
];

export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "gen-1": true,
    "gen-2": true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.categoryId === activeCategory;
      const matchesQuery =
        query === "" ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="bg-white">
      {/* ── 1. Hero Section ── */}
      <section
        aria-labelledby="faq-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/80 min-h-[500px] lg:min-h-[560px] flex items-center"
      >
        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: `url("${SITE_MEDIA.contactHero.src}")`,
            backgroundPosition: "right center",
          }}
        />

        {/* Soft-White Gradient on Left Area */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:from-white/95 lg:via-white/70 lg:to-transparent/20 pointer-events-none"
        />

        {/* Bottom Fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
        />

        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">
              FAQ
            </p>

            <h1
              id="faq-hero-heading"
              className="text-navy text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Frequently Asked Questions
            </h1>

            <p className="max-w-2xl text-base leading-relaxed font-medium text-slate-700 sm:text-lg">
              Find answers to common questions about our services, travel solutions, sourcing, business support, and customer inquiries.
            </p>

            {/* Dynamic Search Box */}
            <div className="relative mt-8 max-w-xl">
              <Search
                aria-hidden="true"
                className="text-brand-blue absolute top-1/2 left-4 size-5 -translate-y-1/2 pointer-events-none"
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search frequently asked questions..."
                className="h-14 rounded-2xl border-slate-300 bg-white/95 pl-12 pr-4 text-base shadow-soft transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FAQ Categories & Accordion Section ── */}
      <section className="section-y bg-slate-50/60 border-b border-slate-200/80">
        <div className="container-page space-y-10">
          {/* Category Tabs / Filter Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {FAQ_CATEGORIES.map(({ id, label, icon: Icon }) => {
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveCategory(id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-2xs",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:text-blue-600",
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 max-w-4xl">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-2xs">
                <HelpCircle className="mx-auto size-12 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-ink">No matching questions found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search query or reset the category filter.
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
              filteredFaqs.map(({ id, question, answer }) => {
                const isOpen = !!openIds[id];
                return (
                  <div
                    key={id}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs transition-all duration-200 hover:border-brand-blue/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50/50 sm:p-6"
                    >
                      <span className="text-base font-bold text-ink sm:text-lg">
                        {question}
                      </span>
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue transition-transform duration-300",
                          isOpen && "rotate-180 bg-brand-blue text-white",
                        )}
                      >
                        <ChevronDown className="size-4" aria-hidden="true" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 bg-slate-50/40 px-5 pt-4 pb-6 text-sm sm:px-6 sm:text-base leading-relaxed text-slate-600">
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
