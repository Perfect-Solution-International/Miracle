import type { SVGProps } from "react";

import { APP_CONFIG } from "@/config/app";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

// Brand glyphs are not shipped by lucide, so they are inlined here as
// minimal single-path marks.
function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.9 8.8H3.8V20h3.1V8.8zM5.4 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-5-4.3-5-1.4 0-2.4.8-2.8 1.5V8.8h-3V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.1v-6.4z" />
    </svg>
  );
}

function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.2L3.3 20.8l4.5-1.2A8.7 8.7 0 1 0 12 3.2zm0 15.9a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 1 1 12 19.1zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.9c-.1.1-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9c0 1.1.8 2.2.9 2.4.1.1 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: APP_CONFIG.social.facebook, icon: FacebookIcon },
  { label: "Instagram", href: APP_CONFIG.social.instagram, icon: InstagramIcon },
  { label: "LinkedIn", href: APP_CONFIG.social.linkedin, icon: LinkedInIcon },
  { label: "WhatsApp", href: APP_CONFIG.social.whatsapp, icon: WhatsAppIcon },
] as const;

export function SocialLinks({
  tone = "default",
  className,
}: {
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${APP_CONFIG.name} on ${label} (opens in a new tab)`}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-lg border transition-colors",
              tone === "inverse"
                ? "hover:bg-brand-blue hover:border-brand-blue border-white/15 text-white/75 hover:text-white"
                : "text-muted-foreground hover:border-brand-blue hover:text-brand-blue",
            )}
          >
            <Icon aria-hidden="true" className="size-[1.1rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
