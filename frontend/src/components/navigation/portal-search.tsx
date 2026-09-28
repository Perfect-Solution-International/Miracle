"use client";

import {
  ArrowLeftRight,
  Briefcase,
  Building2,
  FileCheck2,
  Globe2,
  Plane,
  Receipt,
  Search,
  Ship,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  icon: typeof Search;
}

const SEARCH_ITEMS: SearchResultItem[] = [
  {
    id: "admin-travel",
    title: "Travel & Tour Bookings",
    category: "Services",
    description: "Manage holiday packages, itineraries, and client reservations",
    href: ROUTES.admin.travel,
    icon: Plane,
  },
  {
    id: "admin-visa",
    title: "Work Visa & Visa Processing",
    category: "Services",
    description: "Track visa applications, document verification, and embassy status",
    href: ROUTES.admin.visa,
    icon: FileCheck2,
  },
  {
    id: "admin-imports",
    title: "Import Operations",
    category: "Trade",
    description: "Customs clearance, freight tracking, and port arrivals",
    href: ROUTES.admin.imports,
    icon: Ship,
  },
  {
    id: "admin-exports",
    title: "Export Operations",
    category: "Trade",
    description: "Export documentation, phytosanitary clearance, and air shipments",
    href: ROUTES.admin.exports,
    icon: Globe2,
  },
  {
    id: "admin-quotations",
    title: "Trading & Quotations",
    category: "Trade",
    description: "Commodity trading inquiries, supplier quotations, and price offers",
    href: ROUTES.admin.quotations,
    icon: ArrowLeftRight,
  },
  {
    id: "admin-business",
    title: "Business Projects & Solutions",
    category: "Services",
    description: "Corporate entity setup, BOI planning, and business consultations",
    href: ROUTES.admin.businessProjects,
    icon: Briefcase,
  },
  {
    id: "admin-customers",
    title: "Customer Directory",
    category: "Relationships",
    description: "View all corporate clients, individual buyers, and travelers",
    href: ROUTES.admin.customers,
    icon: Users,
  },
  {
    id: "admin-requirements",
    title: "Client Requirements Queue",
    category: "Procurement",
    description: "Inbound requests from global clients across all service domains",
    href: ROUTES.admin.requirements,
    icon: Receipt,
  },
];

export function PortalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = SEARCH_ITEMS.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="relative h-8 w-full justify-start rounded-lg bg-muted/30 text-xs text-muted-foreground sm:w-56 md:w-64 border-border/70 hover:bg-muted/60"
      >
        <Search className="mr-2 size-3.5" />
        <span className="truncate">Search admin & requests...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Search miracle admin portal</DialogTitle>
          </DialogHeader>

          <div className="flex items-center border-b border-border px-3.5">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Type a service, customer, or request to jump..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 text-sm h-12"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">
                No matching administrative sections found for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <div className="space-y-1">
                {filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors hover:bg-muted/60 focus-visible:bg-muted focus-visible:outline-none"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-navy dark:text-foreground">
                            {item.title}
                          </p>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
