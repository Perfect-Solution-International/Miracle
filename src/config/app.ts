import { clientEnv } from "./environment";
import { PUBLIC_FOOTER_CONTACT } from "./public-footer";

export const APP_CONFIG = {
  name: "Miracle International",
  shortName: "Miracle",
  description:
    "Integrated global trade and business solutions — sourcing, wholesale, imports, exports, business setup, and travel services.",
  url: clientEnv.NEXT_PUBLIC_APP_URL,
  locale: clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
  defaultCurrency: clientEnv.NEXT_PUBLIC_DEFAULT_CURRENCY,
  tagline: "Global Trade • Sourcing • Business Solutions",
  support: {
    email: PUBLIC_FOOTER_CONTACT.email,
    phone: PUBLIC_FOOTER_CONTACT.phone,
    whatsapp: PUBLIC_FOOTER_CONTACT.whatsapp,
    messaging: PUBLIC_FOOTER_CONTACT.messaging,
    address: PUBLIC_FOOTER_CONTACT.address,
    hours: "Monday – Friday, 9:00 AM – 6:00 PM",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    whatsapp: `https://wa.me/${PUBLIC_FOOTER_CONTACT.whatsapp.replace(/\D/g, "")}`,
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
