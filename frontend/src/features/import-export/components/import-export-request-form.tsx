"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Copy,
  Hash,
  LayoutGrid,
  MapPin,
  NotebookPen,
  Package,
  Send,
  Ship,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORIES } from "@/features/products";
import { cn } from "@/lib/utils";

import { TRADE_COUNTRIES } from "../data/import-export.content";
import {
  importExportRequestSchema,
  type ImportExportRequestInput,
} from "../schemas/import-export-request.schema";

/** Red asterisk marking a required field, matching the design's inline cue. */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-brand-red">
      *
    </span>
  );
}

const REQUEST_TYPES = [
  { value: "import", label: "Import", icon: Ship },
  { value: "export", label: "Export", icon: Package },
] as const;

/**
 * "Send Your Request" card for the Import & Export landing page.
 *
 * Client-only: it holds form state and the Import/Export toggle. There is no
 * backend endpoint for this lead yet, so submission simply confirms receipt;
 * wire this to a real mutation once the intake API exists.
 */
export function ImportExportRequestForm({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const form = useForm<ImportExportRequestInput>({
    resolver: zodResolver(importExportRequestSchema),
    defaultValues: {
      productName: "",
      category: "",
      requestType: "import",
      country: "",
      quantity: "",
      specifications: "",
      budget: "",
      additionalRequirements: "",
    },
  });

  const requestType = useWatch({ control: form.control, name: "requestType" });

  function onSubmit(values: ImportExportRequestInput) {
    toast.success("Request received", {
      description: "Our trade team will get back to you shortly.",
    });
    form.reset({
      ...values,
      productName: "",
      quantity: "",
      specifications: "",
      budget: "",
    });
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <div
      className={cn(
        "shadow-lift relative rounded-3xl border bg-white p-6 sm:p-8",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy link to this form"
        className="border-input text-muted-foreground hover:text-brand-blue hover:border-brand-blue absolute top-6 right-6 inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
      >
        <Copy aria-hidden="true" className={cn("size-4", copied && "text-brand-blue")} />
      </button>

      <div className="flex flex-col items-center gap-2 text-center">
        <span aria-hidden="true" className="bg-brand-red h-0.5 w-8 rounded-full" />
        <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="text-ink">Import</span>{" "}
          <span className="text-brand-blue">&amp; Export</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Global sourcing made simple for your business.
        </p>
      </div>

      <div className="bg-brand-blue-light mt-6 grid grid-cols-2 gap-2 rounded-xl p-1.5">
        {REQUEST_TYPES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => form.setValue("requestType", value, { shouldValidate: true })}
            aria-pressed={requestType === value}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
              requestType === value
                ? "bg-brand-blue text-white shadow-sm"
                : "text-brand-blue-dark hover:bg-white/60",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <Separator className="my-6" />

      <p className="text-ink text-center text-sm font-bold tracking-[0.14em] uppercase">
        Send Your Request
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What do you need? <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <Package
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />
                  <FormControl>
                    <Input placeholder="Product Name" className="pl-9" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Category <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <LayoutGrid
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2"
                  />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full pl-9">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Request Type <RequiredMark />
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row gap-6"
                  >
                    {REQUEST_TYPES.map(({ value, label }) => (
                      <FormItem key={value} className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Source / Destination Country <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <MapPin
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2"
                  />
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full pl-9">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRADE_COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Quantity <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <Hash
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="Enter quantity"
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Specifications <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <NotebookPen
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-3 left-3 size-4"
                  />
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Tell us about the product specifications..."
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Budget <RequiredMark />
                </FormLabel>
                <div className="relative">
                  <Wallet
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />
                  <FormControl>
                    <Input placeholder="Enter your budget" className="pl-9" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Requirements</FormLabel>
                <div className="relative">
                  <NotebookPen
                    aria-hidden="true"
                    className="text-muted-foreground pointer-events-none absolute top-3 left-3 size-4"
                  />
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Any additional requirements, timing, packaging, certifications, etc..."
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            <Send data-icon="inline-start" aria-hidden="true" />
            Submit Request
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
