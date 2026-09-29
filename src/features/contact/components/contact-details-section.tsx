import { ChevronRight } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { SocialLinks } from "@/components/common/social-links";
import { cn } from "@/lib/utils";

import { CONTACT_CHANNELS } from "../data/contact.content";
import type { ContactChannel } from "../types/contact.types";
import { ContactForm } from "./contact-form";

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const { icon: Icon, tone, title, lines, href } = channel;

  const content = (
    <>
      <span
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white",
          tone === "blue" ? "bg-brand-blue" : "bg-brand-red",
        )}
      >
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="flex-1">
        <p className="text-ink font-bold">{title}</p>
        {lines.map((line) => (
          <p key={line} className="text-muted-foreground text-sm">
            {line}
          </p>
        ))}
      </div>
      {href ? (
        <ChevronRight aria-hidden="true" className="text-muted-foreground size-4" />
      ) : null}
    </>
  );

  const className = "flex items-center gap-4 rounded-xl border bg-white p-4";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(className, "hover:border-brand-blue/30 transition-colors")}
    >
      {content}
    </a>
  );
}

export function ContactDetailsSection() {
  return (
    <Section aria-labelledby="contact-details-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="contact-details-heading"
            eyebrow="Our Contact Details"
            title="Let's Start a Conversation"
            description="Whether you need products, suppliers, business consultation, or any other support, our team is ready to assist you."
          />

          <div className="flex flex-col gap-3">
            {CONTACT_CHANNELS.map((channel) => (
              <ContactChannelCard key={channel.title} channel={channel} />
            ))}
          </div>

          <div>
            <p className="text-ink mb-3 font-bold">Follow Us</p>
            <SocialLinks />
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
