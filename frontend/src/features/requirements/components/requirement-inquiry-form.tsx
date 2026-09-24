"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/config/routes";
import { DEFAULT_MAX_SIZE_BYTES } from "@/components/shared/file-uploader/file-uploader.types";

import {
  BUDGET_RANGE_OPTIONS,
  REQUIREMENT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "../data/tell-us-what-you-need.content";
import {
  requirementInquirySchema,
  type RequirementInquiryInput,
} from "../schemas/requirement-inquiry.schema";

/**
 * Public lead-capture form. There is no backend intake endpoint for this yet
 * (same situation as `ContactForm`), so submission confirms receipt locally;
 * wire this to a real mutation once the intake API exists. File selection is
 * local-only for the same reason — nothing is actually uploaded.
 */
export function RequirementInquiryForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputId = useId();

  const form = useForm<RequirementInquiryInput>({
    resolver: zodResolver(requirementInquirySchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      requirementType: "",
      subject: "",
      details: "",
      timeline: "",
      budgetRange: "",
      agreeToTerms: false,
    },
  });

  function onSubmit(values: RequirementInquiryInput) {
    toast.success(`Thanks, ${values.fullName}!`, {
      description: "Our team will review your request and get back to you shortly.",
    });
    form.reset();
    setFiles([]);
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    setFiles((current) => [...current, ...Array.from(list)]);
  }

  return (
    <div
      id="requirement-form"
      className="shadow-lift rounded-3xl border bg-white p-6 sm:p-8"
    >
      <Eyebrow>Submit Your Requirement</Eyebrow>
      <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Tell Us What You Need
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Fill out the form below with your requirements, and our team will get back to you
        with the best solutions, quotations or consultation.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-brand-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address <span className="text-brand-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-brand-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requirementType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Type of Requirement <span className="text-brand-red">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REQUIREMENT_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject <span className="text-brand-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Short description of your requirement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Detailed Requirements <span className="text-brand-red">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Please provide more details about what you need (e.g. product, service, quantity, destination, timeline, etc.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred Timeline <span className="text-brand-red">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMELINE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUDGET_RANGE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={fileInputId} className="text-sm leading-none font-medium">
              Upload Files (Optional)
            </label>
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                addFiles(event.dataTransfer.files);
              }}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                isDragging ? "border-brand-blue bg-brand-blue-light" : "border-input"
              }`}
            >
              <UploadCloud aria-hidden="true" className="text-muted-foreground size-6" />
              <p className="text-muted-foreground text-sm">
                Drag &amp; drop files here or{" "}
                <label
                  htmlFor={fileInputId}
                  className="text-brand-blue cursor-pointer font-semibold underline"
                >
                  click to upload
                </label>
              </p>
              <p className="text-muted-foreground text-xs">
                You can upload product images, documents, specifications, etc. (Max file
                size {Math.round(DEFAULT_MAX_SIZE_BYTES / (1024 * 1024))} MB per file)
              </p>
              <input
                id={fileInputId}
                type="file"
                multiple
                className="sr-only"
                onChange={(event) => addFiles(event.target.files)}
              />
            </div>

            {files.length > 0 ? (
              <ul className="space-y-1.5">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="bg-surface flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="text-ink truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((current) => current.filter((_, i) => i !== index))
                      }
                      className="text-muted-foreground hover:text-brand-red shrink-0"
                    >
                      <X aria-hidden="true" className="size-4" />
                      <span className="sr-only">Remove {file.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="agreeToTerms"
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel
                    htmlFor="agreeToTerms"
                    className="cursor-pointer text-sm font-normal"
                  >
                    I agree to the{" "}
                    <Link
                      href={ROUTES.public.privacyPolicy}
                      className="text-foreground underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and consent to be contacted by Miracle International.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="accent"
            size="xl"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Submit My Request
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
