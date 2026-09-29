import { Mail, Phone } from "lucide-react";

import { APP_CONFIG } from "@/config/app";

/** Slim utility bar above the header. Hidden on small screens to save height. */
export function AnnouncementBar() {
  const { email, phone } = APP_CONFIG.support;

  return (
    <div className="bg-navy hidden text-xs text-white/70 md:block">
      <div className="container-page flex h-9 items-center justify-between gap-6">
        <p className="flex items-center gap-2.5 font-medium tracking-wide">
          <span aria-hidden="true" className="bg-brand-red size-1.5 rounded-full" />
          {APP_CONFIG.tagline}
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-white"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              {phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-white"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              {email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
