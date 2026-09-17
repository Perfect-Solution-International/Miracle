import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who we are and how we work.",
  openGraph: {
    title: "About Us",
    description: "Who we are and how we work.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About Us</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">Who we are and how we work.</p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
