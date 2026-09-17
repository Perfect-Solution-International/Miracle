import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end trade and business services.",
  openGraph: {
    title: "Services",
    description: "End-to-end trade and business services.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        End-to-end trade and business services.
      </p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
