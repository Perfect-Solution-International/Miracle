"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  FileUp,
  Factory,
  Globe2,
  Home,
  Laptop2,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

const COUNTRY_CODES =
  `AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SJ SB SO ZA GS SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW`.split(
    " ",
  );
const COUNTRIES = COUNTRY_CODES.map((code) => ({
  code,
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
})).sort((a, b) => a.name.localeCompare(b.name));

const PROCESS = [
  [
    "01",
    "Submit Your Requirement",
    "Tell us what product or trade requirement you have.",
  ],
  ["02", "Requirement Review", "Our team reviews your product and trade details."],
  [
    "03",
    "Source & Coordinate",
    "We identify suitable suppliers, buyers or trade options.",
  ],
  ["04", "Review the Options", "Review the available information and options."],
  [
    "05",
    "Coordinate the Process",
    "We help coordinate the next steps of the requirement.",
  ],
] as const;

const CATEGORIES: readonly [string, string, LucideIcon, SiteImage][] = [
  [
    "Consumer Products",
    "Everyday consumer goods, household products, personal-use items, and general merchandise.",
    Home,
    SITE_MEDIA.productCategories.consumer,
  ],
  [
    "Food & Beverages",
    "Packaged foods, beverages, ingredients, agricultural products, and food-related commercial products.",
    PackageCheck,
    SITE_MEDIA.productCategories.food,
  ],
  [
    "Electronics & Technology",
    "Electronic devices, computer accessories, smart products, technology equipment, and commercial solutions.",
    Laptop2,
    SITE_MEDIA.productCategories.electronics,
  ],
  [
    "Electrical Items",
    "Electrical equipment, cables, switches, lighting products, components, and commercial electrical supplies.",
    ShieldCheck,
    SITE_MEDIA.productCategories.electrical,
  ],
  [
    "Vehicles & Automotive",
    "Vehicles, automotive products, spare parts, accessories, and commercial transportation solutions.",
    Truck,
    SITE_MEDIA.productCategories.vehicles,
  ],
  [
    "Clothing & Apparel",
    "Garments, apparel, uniforms, textiles, fashion products, and commercial clothing requirements.",
    Users,
    SITE_MEDIA.productCategories.clothing,
  ],
  [
    "Home & Office Products",
    "Furniture, office equipment, home products, storage solutions, and workplace essentials.",
    BriefcaseBusiness,
    SITE_MEDIA.productCategories.homeOffice,
  ],
  [
    "Furniture",
    "Home, office, hospitality, institutional and customized furniture requirements.",
    Home,
    SITE_MEDIA.productCategories.furniture,
  ],
  [
    "Machinery & Equipment",
    "Industrial machinery, production equipment, tools, commercial equipment, and business-use machinery.",
    Factory,
    SITE_MEDIA.productCategories.machinery,
  ],
  [
    "Industrial Products",
    "Industrial materials, components, equipment, manufacturing supplies, and commercial products.",
    Factory,
    SITE_MEDIA.productCategories.industrial,
  ],
  [
    "Packaging & Plastic Products",
    "Packaging materials, plastic products, containers, bottles, bags, and customized packaging solutions.",
    Truck,
    SITE_MEDIA.productCategories.packaging,
  ],
  [
    "Construction & Building Materials",
    "Construction materials, project supplies, tools, aggregates, cement, rebar, and related requirements.",
    Factory,
    SITE_MEDIA.productCategories.construction,
  ],
  [
    "Agricultural Products",
    "Fresh produce, farm products, agricultural supplies, and related commercial requirements.",
    Home,
    SITE_MEDIA.productCategories.agriculture,
  ],
  [
    "Beauty & Personal Care Products",
    "Beauty products, personal care items, cosmetics, wellness products, and commercial supplies.",
    PackageCheck,
    SITE_MEDIA.productCategories.beauty,
  ],
  [
    "Medical & Healthcare Products",
    "Medical equipment, healthcare products, supplies, devices, and professional requirements.",
    ShieldCheck,
    SITE_MEDIA.productCategories.medical,
  ],
  [
    "Business & Commercial Products",
    "Products, equipment and supplies for companies, organizations and commercial projects.",
    BriefcaseBusiness,
    SITE_MEDIA.productCategories.business,
  ],
  [
    "Other Products",
    "Have a different requirement? Tell us and we will review it.",
    CircleHelp,
    SITE_MEDIA.productCategories.other,
  ],
];

type DetailContent = {
  title: string;
  description: string;
  image: SiteImage;
  intro: string;
  sections: readonly [string, readonly string[]][];
  requestLabel: string;
};

const CATEGORY_DETAILS: Readonly<Record<string, DetailContent>> = {
  "Construction Materials": {
    title: "Construction Materials",
    description:
      "Construction materials for infrastructure, building projects and commercial supply requirements.",
    image: SITE_MEDIA.manufacturing,
    intro:
      "We coordinate construction material sourcing with quality, inspection, packaging and delivery requirements in mind.",
    sections: [
      [
        "Product examples",
        [
          "Aggregates",
          "Boulders",
          "River sand",
          "Cement",
          "Rebar",
          "Tools and miscellaneous supplies",
        ],
      ],
      [
        "Support",
        [
          "Product sourcing",
          "Supplier coordination",
          "Wholesale and bulk supply",
          "Import and export support",
          "Delivery and logistics coordination",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Food Products": {
    title: "Food Products",
    description:
      "Food products, ingredients and processed goods for bulk, retail and commercial supply.",
    image: SITE_MEDIA.foodProducts,
    intro:
      "We help source food products with practical attention to processing, packaging, storage and international trade requirements.",
    sections: [
      [
        "Product examples",
        [
          "Frozen meats and eggs",
          "Sausages",
          "Coconut oil and powder",
          "Sunflower oil",
          "Soya oil",
          "Cashew nuts, butter and oil",
        ],
      ],
      [
        "Support",
        [
          "Supplier search",
          "Quality and packaging review",
          "Bulk purchasing",
          "International sourcing",
          "Import and export coordination",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Fresh Fruits": {
    title: "Fresh Fruits",
    description:
      "Fresh and processed fruit supply coordinated around seasonal availability and destination requirements.",
    image: SITE_MEDIA.foodProducts,
    intro:
      "Fruit export requirements are coordinated with seasonal availability, freshness, cold-chain logistics and destination needs.",
    sections: [
      [
        "Product examples",
        ["Guava", "Rambutan", "Mangosteen", "Banana", "Mango", "Durian and watermelon"],
      ],
      [
        "Support",
        [
          "Seasonal availability guidance",
          "Supplier coordination",
          "Cold-chain logistics",
          "Processed fruit options",
          "Export documentation",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  Vegetables: {
    title: "Vegetables",
    description:
      "Fresh vegetables sourced from suitable farms for commercial and international supply requirements.",
    image: SITE_MEDIA.distributionCentre,
    intro:
      "We coordinate fresh vegetable requirements with supplier quality, seasonal availability, packaging and delivery in mind.",
    sections: [
      [
        "Product examples",
        [
          "Carrot and cabbage",
          "Tomato and green chili",
          "Radish and brinjal",
          "Bitter gourd",
          "Pumpkin and ridged gourd",
          "Long beans, beans and more",
        ],
      ],
      [
        "Support",
        [
          "Farm and supplier search",
          "Product inspection",
          "Bulk purchasing",
          "Export coordination",
          "Delivery and logistics support",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Import Products": {
    title: "Import Products",
    description:
      "International products sourced according to client demand, quality expectations and market needs.",
    image: SITE_MEDIA.warehouse,
    intro:
      "Tell us what your market needs and we can help coordinate suitable international products, suppliers and trade requirements.",
    sections: [
      [
        "Sourcing options",
        [
          "Client-demand sourcing",
          "Supplier search and verification",
          "Wholesale purchasing",
          "International product options",
        ],
      ],
      [
        "Support",
        [
          "Import coordination",
          "CIF and FOB terms",
          "20ft and 40ft containers",
          "Customs and documentation",
          "Delivery coordination",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Machinery & Equipment": {
    title: "Machinery & Equipment",
    description:
      "Tools, machinery and commercial equipment for projects, manufacturing and business operations.",
    image: SITE_MEDIA.manufacturing,
    intro:
      "We help businesses identify equipment options and coordinate supplier conversations for operational requirements.",
    sections: [
      [
        "Product examples",
        [
          "Production equipment",
          "Commercial machinery",
          "Industrial tools",
          "Processing equipment",
          "Packaging equipment",
        ],
      ],
      [
        "Support",
        [
          "Specification review",
          "Supplier quotations",
          "Bulk and commercial supply",
          "Import coordination",
          "Delivery and logistics support",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Packaging & Processing": {
    title: "Packaging & Processing",
    description:
      "Packaging materials, processing support and supply solutions for food and commercial products.",
    image: SITE_MEDIA.distributionCentre,
    intro:
      "Coordinate packaging and processing requirements for hygienic handling, storage, bulk supply and retail-ready products.",
    sections: [
      [
        "Product examples",
        [
          "Packaging materials",
          "Containers and bottles",
          "Bags and customized packaging",
          "Food processing",
          "Storage solutions",
        ],
      ],
      [
        "Support",
        [
          "Supplier search",
          "Packaging review",
          "Bulk purchasing",
          "Documentation support",
          "Delivery coordination",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
  "Other Products": {
    title: "Other Products",
    description:
      "A flexible starting point for product requirements outside the listed categories.",
    image: SITE_MEDIA.productCategories.other,
    intro:
      "Share the product, specification or commercial requirement and our team will review suitable sourcing and supply options.",
    sections: [
      [
        "What you can share",
        [
          "Product name",
          "Specifications",
          "Required market",
          "Packaging requirements",
          "Delivery destination",
        ],
      ],
      [
        "Support",
        [
          "Product sourcing",
          "Supplier search",
          "Wholesale purchasing",
          "Import and export support",
          "Logistics coordination",
        ],
      ],
    ],
    requestLabel: "Request This Category",
  },
};

const CATEGORY_EXAMPLES: Readonly<Record<string, readonly string[]>> = {
  "Consumer Products": [
    "Household products",
    "Personal-use items",
    "General merchandise",
    "Daily-use goods",
  ],
  "Food & Beverages": [
    "Packaged foods",
    "Beverages",
    "Ingredients",
    "Agricultural products",
    "Oils and powders",
  ],
  "Electronics & Technology": [
    "Mobile accessories",
    "Consumer electronics",
    "Computer accessories",
    "Smart devices",
    "Office technology",
  ],
  "Electrical Items": [
    "Electrical cables",
    "Switches and sockets",
    "Lighting products",
    "LED products",
    "Circuit protection",
    "Power accessories",
  ],
  "Vehicles & Automotive": [
    "Passenger vehicles",
    "Commercial vehicles",
    "Trucks and buses",
    "Electric vehicles",
    "Motorcycles",
    "Auto parts and tyres",
    "Garage equipment",
  ],
  "Clothing & Apparel": [
    "T-shirts and shirts",
    "Trousers and dresses",
    "Uniforms",
    "Sportswear and workwear",
    "Children's clothing",
    "Textiles and fabrics",
    "Fashion accessories",
  ],
  "Home & Office Products": [
    "Office equipment",
    "Storage solutions",
    "Workplace essentials",
    "Home products",
    "Organization supplies",
  ],
  Furniture: [
    "Home furniture",
    "Office furniture",
    "Hospitality furniture",
    "Institutional furniture",
    "Customized furniture",
  ],
  "Machinery & Equipment": [
    "Production equipment",
    "Industrial machinery",
    "Commercial equipment",
    "Tools",
    "Processing equipment",
    "Packaging equipment",
  ],
  "Industrial Products": [
    "Industrial materials",
    "Components",
    "Manufacturing supplies",
    "Plant equipment",
    "Commercial products",
  ],
  "Packaging & Plastic Products": [
    "Containers and bottles",
    "Bags",
    "Plastic products",
    "Packaging materials",
    "Customized packaging solutions",
  ],
  "Construction & Building Materials": [
    "Aggregates",
    "Boulders",
    "River sand",
    "Cement",
    "Rebar",
    "Construction tools",
    "Project supplies",
  ],
  "Agricultural Products": [
    "Fresh fruits",
    "Fresh vegetables",
    "Farm products",
    "Agricultural supplies",
    "Processed produce",
  ],
  "Beauty & Personal Care Products": [
    "Beauty products",
    "Cosmetics",
    "Personal care items",
    "Wellness products",
    "Salon supplies",
  ],
  "Medical & Healthcare Products": [
    "Medical equipment",
    "Professional devices",
    "Clinic products",
    "Safety and care products",
  ],
  "Business & Commercial Products": [
    "Commercial supplies",
    "Organization products",
    "Business equipment",
    "Project requirements",
    "Institutional products",
  ],
  "Other Products": [
    "Any product requirement",
    "Custom specifications",
    "Specialized products",
    "Market-specific products",
    "Products outside the listed categories",
  ],
};

const EXPORT_FROM_SRI_LANKA = new Set([
  "Consumer Products",
  "Food & Beverages",
  "Clothing & Apparel",
  "Furniture",
  "Beauty & Personal Care Products",
  "Industrial Products",
  "Packaging & Plastic Products",
  "Agricultural Products",
  "Other Products",
]);

function getCategoryDetail(
  title: string,
  description: string,
  image: SiteImage,
): DetailContent {
  const base = CATEGORY_DETAILS[title] ?? {
    title,
    description,
    image,
    intro:
      "This category is an example service area, not a fixed catalogue. Share your exact requirement and our team will explore suitable options.",
    sections: [],
    requestLabel: "Request This Category",
  };
  const examples = CATEGORY_EXAMPLES[title] ?? [
    "Your required product",
    "Related products",
    "Customized requirements",
    "Other products in this category",
  ];
  const sections: readonly [string, readonly string[]][] = [
    [
      "What You Can Request",
      [...examples, "Examples only - other related products can also be requested."],
    ],
    ...(EXPORT_FROM_SRI_LANKA.has(title)
      ? [
          [
            "Export from Sri Lanka",
            [
              "Tell us your target country and product requirements. We will review the export request.",
            ],
          ] as [string, readonly string[]],
        ]
      : []),
  ];
  return { ...base, sections };
}

type RequestType = "import" | "export";

const REQUEST_TYPES: readonly [RequestType, string][] = [
  ["import", "Import"],
  ["export", "Export"],
];

const INITIAL_FORM = {
  requestType: "import" as RequestType,
  fromCountry: "",
  toCountry: "Sri Lanka",
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  productDescription: "",
  specifications: "",
  additionalRequirements: "",
  confirmation: false,
};

type FormState = typeof INITIAL_FORM;

function CountryPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = COUNTRIES.find((country) => country.name === value);
  const matches = useMemo(
    () =>
      COUNTRIES.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 80),
    [query],
  );

  return (
    <div className="relative">
      <label className="text-ink mb-2 block text-sm font-semibold">
        {label} <span className="text-brand-red">*</span>
      </label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="border-input bg-background text-ink flex h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-sm"
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected?.name ?? "Select a country"}
        </span>
        <ChevronDown aria-hidden="true" className="text-muted-foreground size-4" />
      </button>
      {open ? (
        <div className="bg-popover ring-foreground/10 absolute top-full z-30 mt-2 w-full overflow-hidden rounded-xl p-2 shadow-xl ring-1">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all countries"
              className="pl-9"
            />
          </div>
          <div className="mt-2 max-h-52 overflow-y-auto">
            {matches.map((country) => (
              <button
                type="button"
                key={country.code}
                onClick={() => {
                  onChange(country.name);
                  setOpen(false);
                  setQuery("");
                }}
                className="text-ink hover:bg-brand-blue-light w-full rounded-lg px-3 py-2 text-left text-sm"
              >
                {country.name}
              </button>
            ))}
            {matches.length === 0 ? (
              <p className="text-muted-foreground p-3 text-sm">No countries found.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DetailModal({
  detail,
  onClose,
  onRequest,
}: {
  detail: DetailContent | null;
  onClose: () => void;
  onRequest: (type?: RequestType) => void;
}) {
  useEffect(() => {
    if (!detail) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [detail, onClose]);

  if (!detail) return null;

  const requestSection = detail.sections.find(([title]) => title === "What You Can Request");
  const exportSection = detail.sections.find(([title]) => title === "Export from Sri Lanka");
  const otherSections = detail.sections.filter(
    ([title]) => title !== "What You Can Request" && title !== "Export from Sri Lanka",
  );

  return (
    <div
      className="bg-navy/40 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-4xl flex-col overflow-hidden rounded-[2rem] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-64 sm:min-h-72 lg:min-h-full">
            <Image
              src={detail.image.src}
              alt={detail.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy/65 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
            <p className="text-brand-blue-dark shadow-soft absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase">
              Miracle International
            </p>
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
            <div>
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Trade detail
              </p>
              <h2
                id="detail-modal-title"
                className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                {detail.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {detail.description}
              </p>
              <p className="text-ink mt-4 text-sm leading-relaxed">{detail.intro}</p>

              {requestSection ? (
                <div className="mt-6">
                  <h3 className="text-ink text-xs font-bold tracking-wider uppercase">
                    {requestSection[0]}
                  </h3>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {requestSection[1].map((item) => (
                      <li
                        key={item}
                        className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <Check
                          aria-hidden="true"
                          className="text-brand-blue mt-0.5 size-4 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {otherSections.map(([title, items]) => (
                <div key={title} className="mt-5">
                  <h3 className="text-ink text-xs font-bold tracking-wider uppercase">{title}</h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <Check
                          aria-hidden="true"
                          className="text-brand-blue mt-0.5 size-4 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {exportSection ? (
                <div className="border-brand-blue/15 bg-brand-blue-light/50 mt-6 rounded-2xl border p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Globe2
                      aria-hidden="true"
                      className="text-brand-blue mt-0.5 size-5 shrink-0"
                    />
                    <div>
                      <h4 className="text-ink text-xs font-bold tracking-wider uppercase">
                        Export from Sri Lanka
                      </h4>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
                        {exportSection[1][0]}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t pt-5">
              <Button size="xl" onClick={() => onRequest()}>
                Submit Import / Export Request
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              {exportSection ? (
                <Button size="xl" variant="outline" onClick={() => onRequest("export")}>
                  Submit Export Requirement
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestModal({
  open,
  onClose,
  initialRequestType = "import",
}: {
  open: boolean;
  onClose: () => void;
  initialRequestType?: RequestType;
}) {
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    requestType: initialRequestType,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [initialRequestType, onClose, open]);

  if (!open) return null;
  const update = (field: keyof FormState, value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));
  const close = () => {
    setForm({ ...INITIAL_FORM, requestType: initialRequestType });
    setFiles([]);
    setSubmitted(false);
    setError("");
    onClose();
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.fromCountry ||
      !form.toCountry ||
      !form.fullName ||
      !form.contactNumber ||
      !form.email ||
      !form.productDescription ||
      !form.confirmation
    ) {
      setError("Please complete the required fields and confirm your information.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div
      className="bg-navy/35 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close request form"
          className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center rounded-full"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full">
              <Check aria-hidden="true" className="size-8" />
            </span>
            <h2
              id="request-modal-title"
              className="text-ink mt-7 text-3xl font-extrabold tracking-tight"
            >
              Request Submitted Successfully
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Thank you. Our team will review your requirement and contact you shortly.
            </p>
            <Button size="lg" onClick={close} className="mt-8">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Miracle International
              </p>
              <h2
                id="request-modal-title"
                className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl"
              >
                Submit Import / Export Request
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                Tell us what you need and our team will review the requirement.
              </p>
            </div>
            <form
              onSubmit={submit}
              className="overflow-y-auto px-6 py-6 sm:px-8"
              noValidate
            >
              <div className="bg-brand-blue-light grid gap-1 rounded-xl p-1 sm:grid-cols-2 lg:grid-cols-3">
                {REQUEST_TYPES.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update("requestType", value)}
                    aria-pressed={form.requestType === value}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-bold",
                      form.requestType === value
                        ? "bg-brand-blue text-white shadow"
                        : "text-brand-blue-dark",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <CountryPicker
                  label="Source Country"
                  value={form.fromCountry}
                  onChange={(value) => update("fromCountry", value)}
                />
                <CountryPicker
                  label="Destination Country"
                  value={form.toCountry}
                  onChange={(value) => update("toCountry", value)}
                />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full Name *">
                  <Input
                    required
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Email *">
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Contact Number *">
                  <Input
                    required
                    type="tel"
                    value={form.contactNumber}
                    onChange={(event) => update("contactNumber", event.target.value)}
                    placeholder="Your phone number"
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <Input
                    type="tel"
                    value={form.whatsappNumber}
                    onChange={(event) => update("whatsappNumber", event.target.value)}
                    placeholder="Your WhatsApp number"
                  />
                </Field>
              </div>
              <div className="mt-6 grid gap-4">
                <Field label="Product Name / Description *">
                  <Textarea
                    required
                    rows={3}
                    value={form.productDescription}
                    onChange={(event) => update("productDescription", event.target.value)}
                    placeholder="What product or trade requirement do you have?"
                  />
                </Field>
                <Field label="Product Requirements / Specifications">
                  <Textarea
                    rows={3}
                    value={form.specifications}
                    onChange={(event) => update("specifications", event.target.value)}
                    placeholder="Sizes, materials, standards or other details"
                  />
                </Field>
                <Field label="Additional Requirements">
                  <Textarea
                    rows={3}
                    value={form.additionalRequirements}
                    onChange={(event) =>
                      update("additionalRequirements", event.target.value)
                    }
                    placeholder="Anything else we should know?"
                  />
                </Field>
              </div>
              <label className="border-input bg-surface mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-sm font-semibold">
                <FileUp aria-hidden="true" className="text-brand-blue size-5" />
                <span>
                  Optional Document Upload
                  <Input
                    type="file"
                    multiple
                    onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                    className="mt-2 block h-auto border-0 p-0 text-xs shadow-none"
                  />
                  {files.length > 0 ? (
                    <small className="text-muted-foreground block font-normal">
                      {files.length} file{files.length === 1 ? "" : "s"} selected
                    </small>
                  ) : null}
                </span>
              </label>
              <label className="text-ink mt-6 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.confirmation}
                  onChange={(event) => update("confirmation", event.target.checked)}
                  className="accent-brand-blue mt-0.5 size-4"
                />
                <span>
                  I confirm that the information provided is accurate.{" "}
                  <span className="text-brand-red">*</span>
                </span>
              </label>
              {error ? (
                <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" size="xl" className="mt-6 w-full">
                Submit Request
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="text-ink text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}


function FeatureCard({
  title,
  description,
  image,
  points,
  action,
  onAction,
}: {
  title: string;
  description: string;
  image: SiteImage;
  points: readonly string[];
  action: string;
  onAction: () => void;
}) {
  return (
    <article className="group shadow-soft hover:shadow-lift overflow-hidden rounded-3xl border bg-white transition-shadow">
      <div className="relative aspect-[1.8] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7 sm:p-8">
        <h3 className="text-ink text-2xl font-extrabold">{title}</h3>
        <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="text-ink flex items-center gap-2 text-sm font-semibold"
            >
              <Check aria-hidden="true" className="text-brand-blue size-4 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
        <Button size="lg" onClick={onAction} className="mt-7">
          {action}
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}

export function ImportExportLanding({
  breadcrumbs = [{ label: "Import & Export" }],
}: {
  breadcrumbs?: readonly BreadcrumbItem[];
} = {}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>("import");
  const [selectedDetail, setSelectedDetail] = useState<DetailContent | null>(null);
  const openForm = (type: RequestType = "import") => {
    setRequestType(type);
    setIsFormOpen(true);
  };
  const openDetailRequest = (type?: RequestType) => {
    setSelectedDetail(null);
    openForm(type);
  };

  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-24">
            <div className="max-w-2xl">
              <Breadcrumb items={breadcrumbs} />
              <p className="mt-8 text-brand-red text-xs font-bold tracking-[0.2em] uppercase">
                Import &amp; Export
              </p>
              <h1 className="text-ink mt-5 text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Connecting Products With Global Markets
              </h1>
              <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed sm:text-xl">
                We help businesses source products internationally and coordinate import
                and export requirements through practical, end-to-end trade support.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="xl" onClick={() => openForm()}>
                  Submit Import / Export Request
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <a href="#services">Explore Our Services</a>
                </Button>
              </div>
            </div>
            <div className="shadow-lift relative aspect-[4/3] overflow-hidden rounded-[2rem] border-8 border-white lg:-mr-24 lg:aspect-[16/9] lg:translate-x-6 xl:-mr-40">
              <Image
                src={SITE_MEDIA.portAerial.src}
                alt=""
                fill
                aria-hidden="true"
                sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 56vw, 100vw"
                className="scale-105 object-cover opacity-60 blur-md"
              />
              <Image
                src={SITE_MEDIA.portAerial.src}
                alt={SITE_MEDIA.portAerial.alt}
                fill
                priority
                sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 56vw, 100vw"
                className="scale-[1.02] object-cover brightness-[0.98] saturate-[0.9]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/65 via-white/15 to-transparent"
              />
              <span className="text-ink shadow-soft absolute top-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold">
                <Globe2
                  aria-hidden="true"
                  className="text-brand-blue mr-2 inline size-4"
                />
                International trade activity
              </span>
            </div>
          </div>
        </section>

        <section id="services" className="section-y bg-white">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Two ways to move forward
              </p>
              <h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Import &amp; Export Solutions
              </h2>
              <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
                Tell us what you need to import or export, and our team will help
                coordinate the relevant sourcing and trade requirements.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <FeatureCard
                title="Import"
                description="Source products from international markets and coordinate the import process based on your requirements."
                image={SITE_MEDIA.portAerial}
                points={[
                  "Product Sourcing",
                  "International Suppliers",
                  "Supplier Coordination",
                  "Shipping Support",
                  "Import Documentation",
                ]}
                action="Submit Import Request"
                onAction={() => openForm("import")}
              />
              <FeatureCard
                title="Export"
                description="Connect products with international markets and coordinate export requirements with suitable buyers and partners."
                image={SITE_MEDIA.distributionCentre}
                points={[
                  "Export Requirements",
                  "International Buyers",
                  "Market Connections",
                  "Shipping Coordination",
                  "Export Documentation",
                ]}
                action="Submit Export Request"
                onAction={() => openForm("export")}
              />
            </div>
          </div>
        </section>

        <section className="section-y bg-surface">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Product categories
              </p>
              <h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Product Categories
              </h2>
              <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
                Explore the types of products we can help you source, supply, import, or
                export. These categories are examples, not limitations. If you need a
                product that is not listed, simply tell us what you need and we will
                review your requirement.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map(([title, description, Icon, image]) => (
                <article
                  key={title}
                  className="group shadow-soft flex min-h-96 flex-col overflow-hidden rounded-2xl border bg-white"
                >
                  <div className="relative aspect-[1.45] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="from-navy/65 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    <Icon
                      aria-hidden="true"
                      className="absolute bottom-4 left-4 size-6 text-white"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-ink font-bold">{title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDetail(getCategoryDetail(title, description, image))
                      }
                      className="text-brand-blue mt-4 inline-flex items-center gap-2 text-sm font-bold"
                    >
                      View Details
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="bg-brand-blue-light mt-8 grid overflow-hidden rounded-3xl lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-64 lg:min-h-80">
                <Image
                  src={SITE_MEDIA.portAerial.src}
                  alt="Aerial view of a container terminal connecting products to global markets"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="to-brand-blue-light/60 lg:to-brand-blue-light absolute inset-0 bg-gradient-to-r from-transparent lg:from-transparent"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                  Tell Us What You Need
                </p>
                <h3 className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Any Product. Any Category. Based on Your Requirement.
                </h3>
                <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Tell us the product you
                  need, where you want it sourced from, where it needs to go, and any
                  specific requirements. Our team will review your request and explore
                  suitable sourcing, import, or export options.
                </p>
                <Button size="xl" onClick={() => openForm()} className="mt-7 self-start">
                  Tell Us What You Need
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                A practical process
              </p>
              <h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                How We Support Your Requirement
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-5">
              {PROCESS.map(([number, title, description], index) => (
                <div key={number} className="relative">
                  <span className="text-brand-blue text-sm font-bold">{number}</span>
                  <h3 className="text-ink mt-3 text-lg font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {description}
                  </p>
                  {index < PROCESS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="bg-brand-blue-muted absolute top-2 left-9 hidden h-px w-[calc(100%-2rem)] md:block"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="section-y bg-surface">
          <div className="container-page">
            <div className="shadow-soft relative overflow-hidden rounded-3xl bg-white px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:py-16">
              <div>
                <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                  Ready to move forward?
                </p>
                <h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Ready to Explore Global Trade?
                </h2>
                <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
                  Tell us what you need to import or export, and let our team help you
                  explore the right trade solution.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="xl" onClick={() => openForm()}>
                    Submit Your Requirement
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Button>
                  <Button size="xl" variant="outline" asChild>
                    <a href="/contact">Contact Us</a>
                  </Button>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="border-brand-blue-light absolute -right-12 -bottom-20 hidden size-64 rounded-full border-[24px] lg:block"
              />
            </div>
          </div>
        </section>
      </main>
      <DetailModal
        detail={selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onRequest={openDetailRequest}
      />
      <RequestModal
        key={requestType}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialRequestType={requestType}
      />
    </>
  );
}
