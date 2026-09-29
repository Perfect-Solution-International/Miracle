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
  SERVICE_OPTIONS,
  type ServiceContext,
} from "../data/service-requirement-options";

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
export function RequirementInquiryForm({
  context = "general",
  defaultService = "",
}: {
  context?: "general" | ServiceContext;
  defaultService?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputId = useId();
  const checkboxId = useId();
  const isService = context !== "general";

  const form = useForm<RequirementInquiryInput>({
    resolver: zodResolver(requirementInquirySchema),
    defaultValues: {
      context,
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      whatsapp: "",
      location: "",
      requirementType: defaultService,
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
    setFileError("");
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const accepted = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    const incoming = Array.from(list);
    const invalid = incoming.find(
      (file) => !accepted.includes(file.type) || file.size > DEFAULT_MAX_SIZE_BYTES,
    );
    if (invalid) {
      setFileError(
        `${invalid.name} must be a PDF, DOC, DOCX, JPG, PNG or WEBP file under 10 MB.`,
      );
      return;
    }
    setFileError("");
    setFiles((current) => [...current, ...incoming]);
  }

  return (
    <div
      id={isService ? undefined : "requirement-form"}
      className={
        isService ? "bg-white" : "shadow-lift rounded-3xl border bg-white p-6 sm:p-8"
      }
    >
      <div
        className={isService ? "border-b border-slate-200 px-5 pt-6 pb-5 sm:px-8" : ""}
      >
        <Eyebrow
          className={
            isService
              ? "border-brand-blue/10 bg-brand-blue-light text-brand-blue rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.12em]"
              : undefined
          }
        >
          {isService ? "Miracle Services Desk" : "Submit Your Requirement"}
        </Eyebrow>
        <h2
          className={
            isService
              ? "text-navy mt-3 text-[28px] leading-[1.12] font-extrabold tracking-tight sm:text-[32px]"
              : "text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
          }
        >
          Tell Us What You Need
        </h2>
        <p
          className={
            isService
              ? "mt-2 text-sm leading-relaxed text-slate-600"
              : "text-muted-foreground mt-1 text-sm"
          }
        >
          {isService
            ? "Share your business requirements and we will coordinate the ideal solution."
            : "Fill out the form below with your requirements, and our team will get back to you with the best solutions, quotations or consultation."}
        </p>
      </div>

      <div className={isService ? "px-5 pt-5 pb-6 sm:px-8 sm:pt-6" : ""}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={
              isService
                ? "[&_[data-slot=form-label]]:text-navy space-y-4 [&_[data-slot=form-item]]:gap-1.5 [&_[data-slot=form-label]]:text-[13px] [&_[data-slot=form-label]]:font-semibold [&_[data-slot=form-message]]:text-xs"
                : "mt-6 space-y-4"
            }
            noValidate
          >
            {isService ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-brand-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-9 rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                            placeholder="Your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <span className="text-brand-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-9 rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                            placeholder="you@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Contact Number <span className="text-brand-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-9 rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                            placeholder="Phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-9 rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                            placeholder="WhatsApp number"
                            {...field}
                          />
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
                        Service Area <span className="text-brand-red">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 !h-9 w-full rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 focus-visible:ring-2">
                            <SelectValue placeholder="Select a service area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_OPTIONS[context].map((option) => (
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
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Requirement Details <span className="text-brand-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-[68px] min-h-[68px] rounded-[10px] border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                          placeholder="Describe your requirement, scope, budget, and targets..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Location / Country</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:border-brand-blue focus-visible:ring-brand-blue/15 h-9 rounded-[10px] border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2"
                          placeholder="e.g. Sri Lanka, UAE, Global"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
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
                          <Input
                            type="email"
                            placeholder="Your email address"
                            {...field}
                          />
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
                        <Input
                          placeholder="Short description of your requirement"
                          {...field}
                        />
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
              </>
            )}

            <div className={isService ? "space-y-1.5" : "space-y-2"}>
              <label
                htmlFor={fileInputId}
                className={isService ? "sr-only" : "text-sm leading-none font-medium"}
              >
                {isService
                  ? "Upload Reference Documents (Optional)"
                  : "Upload Files (Optional)"}
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
                className={`${isService ? "rounded-xl border border-dashed p-3.5 text-left" : "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center"} transition-colors ${
                  isDragging
                    ? "border-brand-blue bg-brand-blue-light"
                    : isService
                      ? "border-slate-300 bg-slate-50/70"
                      : "border-input"
                }`}
              >
                {isService ? (
                  <label
                    htmlFor={fileInputId}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <UploadCloud
                      aria-hidden="true"
                      className="text-brand-blue size-5 shrink-0"
                    />
                    <span className="min-w-0">
                      <span className="text-navy block text-[13px] font-semibold">
                        Upload Reference Documents (Optional)
                      </span>
                      <span className="block text-xs text-slate-500">
                        PDF, DOCX, or images up to 10MB
                      </span>
                    </span>
                  </label>
                ) : (
                  <>
                    <UploadCloud
                      aria-hidden="true"
                      className="text-muted-foreground size-6"
                    />
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
                      PDF, DOC, DOCX, JPG, PNG or WEBP (max{" "}
                      {Math.round(DEFAULT_MAX_SIZE_BYTES / (1024 * 1024))} MB per file).
                      Files remain on this device until an upload endpoint is connected.
                    </p>
                  </>
                )}
                <input
                  id={fileInputId}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                  className="sr-only"
                  onChange={(event) => addFiles(event.target.files)}
                />
              </div>
              {fileError ? (
                <p role="alert" className="text-brand-red text-sm">
                  {fileError}
                </p>
              ) : null}

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
                      id={checkboxId}
                      className={
                        isService
                          ? "mt-0.5 size-4 rounded-[4px] border-slate-400"
                          : "mt-0.5"
                      }
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel
                      htmlFor={checkboxId}
                      className={
                        isService
                          ? "cursor-pointer text-[13px] font-normal text-slate-700"
                          : "cursor-pointer text-sm font-normal"
                      }
                    >
                      {isService ? (
                        <>
                          I confirm that the information provided is accurate.{" "}
                          <span className="text-brand-red">*</span>
                        </>
                      ) : (
                        <>
                          I agree to the{" "}
                          <Link
                            href={ROUTES.public.privacyPolicy}
                            className="text-foreground underline"
                          >
                            Privacy Policy
                          </Link>{" "}
                          and consent to be contacted by Miracle International.
                        </>
                      )}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={isService ? "default" : "accent"}
              size="xl"
              className={
                isService
                  ? "bg-brand-blue hover:bg-brand-blue-dark h-[46px] w-full rounded-[10px] text-sm font-semibold text-white"
                  : "w-full"
              }
              disabled={form.formState.isSubmitting}
            >
              {isService ? "Submit Request" : "Submit My Request"}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
