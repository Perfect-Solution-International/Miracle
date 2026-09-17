import { clientEnv } from "./environment";

export const APP_CONFIG = {
  name: "Miracle International",
  shortName: "Miracle",
  description:
    "Integrated global trade and business solutions — sourcing, wholesale, imports, exports, business setup, and travel services.",
  url: clientEnv.NEXT_PUBLIC_APP_URL,
  locale: clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
  defaultCurrency: clientEnv.NEXT_PUBLIC_DEFAULT_CURRENCY,
  support: {
    email: "support@miracle-international.com",
    phone: "+94 11 000 0000",
  },
  social: {
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
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
