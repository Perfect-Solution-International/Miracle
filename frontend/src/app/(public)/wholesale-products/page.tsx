import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Products",
  description: "Browse our wholesale catalogue.",
  openGraph: {
    title: "Wholesale Products",
    description: "Browse our wholesale catalogue.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Wholesale Products</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Browse our wholesale catalogue.
      </p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
