import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Solutions",
  description: "Company setup, consulting, and growth.",
  openGraph: {
    title: "Business Solutions",
    description: "Company setup, consulting, and growth.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Business Solutions</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Company setup, consulting, and growth.
      </p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
