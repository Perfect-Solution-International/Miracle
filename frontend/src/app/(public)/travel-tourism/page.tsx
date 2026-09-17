import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel & Tourism",
  description: "Business travel, visa, and tourism services.",
  openGraph: {
    title: "Travel & Tourism",
    description: "Business travel, visa, and tourism services.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Travel & Tourism</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Business travel, visa, and tourism services.
      </p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
