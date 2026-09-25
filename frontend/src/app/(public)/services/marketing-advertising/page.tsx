import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, Megaphone, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE_MEDIA } from "@/config/site-media";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Marketing & Advertising Services",
  description: "Build your brand presence and reach the right audience with practical marketing and advertising solutions.",
};

const SERVICES = [
  ["Digital Marketing", "Practical digital campaigns shaped around your business goals.", BarChart3],
  ["Social Media Marketing", "Build consistent visibility and meaningful audience connections.", Share2],
  ["Brand Promotion", "Present your business clearly across the channels your customers use.", Megaphone],
] as const;

export default function Page() {
  return (
    <main>
      <section className="bg-brand-blue-light/45"><div className="container-page grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Make your business visible</p><h1 className="text-ink mt-5 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">Marketing &amp; Advertising Solutions</h1><p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed">Build your brand presence and reach the right audience through practical marketing, digital promotion and advertising solutions.</p><Button size="xl" asChild className="mt-8"><a href={ROUTES.public.contact}>Discuss Your Marketing Needs <ArrowRight data-icon="inline-end" /></a></Button></div><div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-soft"><Image src={SITE_MEDIA.technology.src} alt={SITE_MEDIA.technology.alt} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" /></div></div></section>
      <section className="section-y bg-white"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Focused support</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Marketing That Supports Your Goals</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">We help businesses clarify their message, improve visibility and connect their offer with the right audience.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{SERVICES.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border bg-white p-6 shadow-sm"><Icon className="text-brand-blue size-7" /><h3 className="text-ink mt-7 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>
    </main>
  );
}