import { clientEnv } from "./environment";

export const APP_CONFIG = {
  name: "Miracle International",
  shortName: "Miracle",
  description:
    "Integrated global trade and business solutions — sourcing, wholesale, imports, exports, business setup, and travel services.",
  url: clientEnv.NEXT_PUBLIC_APP_URL,
  locale: clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
  defaultCurrency: clientEnv.NEXT_PUBLIC_DEFAULT_CURRENCY,
  tagline: "Global Trade • Sourcing • Business Solutions",
  // TODO: Replace placeholder contact details with the approved company values.
  support: {
    email: "support@miracle-international.com",
    phone: "+94 11 000 0000",
    whatsapp: "+94 77 000 0000",
    address: "Colombo, Sri Lanka",
    hours: "Monday – Friday, 9:00 AM – 6:00 PM",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    whatsapp: "https://wa.me/",
  },
} as const;

/** Locales the architecture is prepared for. Only `en` ships today. */
export const SUPPORTED_LOCALES = ["en", "si", "ta", "hi", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
  hi: "हिन्दी",
  zh: "中文",
};

/**
 * Evaluated once when the module is first loaded, so prerendering sees a stable
 * value. Calling `new Date()` inside a component body makes the output
 * unstable between renders and blocks static prerendering.
 */
export const CURRENT_YEAR = new Date().getFullYear();
