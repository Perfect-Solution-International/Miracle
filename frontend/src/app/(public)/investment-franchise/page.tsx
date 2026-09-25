import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment & Franchise",
  description: "Investment and franchise opportunities.",
  openGraph: {
    title: "Investment & Franchise",
    description: "Investment and franchise opportunities.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Investment & Franchise</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Investment and franchise opportunities.
      </p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
