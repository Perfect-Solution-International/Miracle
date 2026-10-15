"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LoaderCircle,
  LockKeyhole,
  MessageSquareText,
  UploadCloud,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import { DEFAULT_MAX_SIZE_BYTES } from "@/components/shared/file-uploader/file-uploader.types";
import {
  RequirementInquiryError,
  submitRequirementInquiry,
} from "../api/requirement-inquiry.api";
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
  type RequirementInquiryFormInput,
  type RequirementInquiryInput,
} from "../schemas/requirement-inquiry.schema";

export interface RequirementInquiryFormProps {
  preselectedCategory?: string;
  context?: "general" | ServiceContext;
  defaultService?: string;
  layout?: "default" | "intake";
}

/**
 * Main Requirement Intake Form
 * Clean white card style matching the existing website with full requested form fields.
 */
export function RequirementInquiryForm({
  preselectedCategory,
  context = "general",
  defaultService = "",
  layout = "default",
}: RequirementInquiryFormProps) {
  const isIntake = layout === "intake";
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const fileInputId = useId();
  const checkboxId = useId();
  const sectionId = useId();

  const form = useForm<RequirementInquiryFormInput, unknown, RequirementInquiryInput>({
    resolver: zodResolver(requirementInquirySchema),
    defaultValues: {
      context,
      fullName: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      requirementType: preselectedCategory || defaultService || "",
      whatDoYouNeed: "",
      country: "",
      timeline: "",
      budgetRange: "",
      additionalRequirements: "",
      agreeToTerms: false,
    },
  });

  useEffect(() => {
    if (preselectedCategory) {
      form.setValue("requirementType", preselectedCategory, { shouldValidate: true });
    }
  }, [preselectedCategory, form]);

  useEffect(() => {
    if (defaultService) {
      form.setValue("requirementType", defaultService, { shouldValidate: true });
    }
  }, [defaultService, form]);

  async function onSubmit(values: RequirementInquiryInput) {
    if (sending.current) return;
    sending.current = true;
    setSubmitError("");
    try {
      const reference = await submitRequirementInquiry(
        values,
        files,
        honeypot.current?.value ?? "",
      );
      setSubmittedRef(reference);

      toast.success(`Thank you, ${values.fullName}!`, {
        description: `Your requirement (${reference}) has been accepted by our email service. Our team will contact you shortly.`,
      });

      form.reset({
        context,
        fullName: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        requirementType: "",
        whatDoYouNeed: "",
        country: "",
        timeline: "",
        budgetRange: "",
        additionalRequirements: "",
        agreeToTerms: false,
      });
      setFiles([]);
      setFileError("");
    } catch (error) {
      if (error instanceof RequirementInquiryError) {
        setSubmitError(error.message);
        for (const [key, message] of Object.entries(error.fieldErrors)) {
          form.setError(key as keyof RequirementInquiryInput, { message });
        }
      } else {
        setSubmitError(
          "We cannot send your requirement right now. Please try again later.",
        );
      }
    } finally {
      sending.current = false;
    }
  }

  function addFiles(list: FileList | null) {
    if (sending.current || !list || list.length === 0) return;
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
    if (
      files.length + incoming.length > 3 ||
      [...files, ...incoming].reduce((total, file) => total + file.size, 0) >
        15 * 1024 * 1024
    ) {
      setFileError("Attach up to 3 files totaling 15 MB or less.");
      return;
    }
    setFileError("");
    setFiles((current) => [...current, ...incoming]);
  }

  const categoryOptions =
    context === "business"
      ? SERVICE_OPTIONS.business
      : context === "it"
        ? SERVICE_OPTIONS.it
        : REQUIREMENT_TYPE_OPTIONS;

  const inputClassName = cn(
    "h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400",
    isIntake && "h-12 border-slate-200 bg-slate-50/60 px-3.5",
  );
  const selectClassName = cn(
    "h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900",
    isIntake &&
      "h-12 w-full border-slate-200 bg-slate-50/60 px-3.5 data-[size=default]:h-12",
  );
  const textareaClassName = cn(
    "resize-y rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400",
    isIntake && "border-slate-200 bg-slate-50/60 p-3.5",
  );

  return (
    <div className={cn("mx-auto w-full", isIntake ? "max-w-6xl" : "max-w-4xl")}>
      {submittedRef ? (
        <div
          role="status"
          className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 text-center sm:p-12"
        >
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Requirement Received!</h3>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Your reference number is{" "}
            <strong className="font-mono font-bold text-slate-900">{submittedRef}</strong>
            . Our specialist team will review your request and get back to you within 24
            hours.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              type="button"
              onClick={() => setSubmittedRef(null)}
              className="bg-brand-blue hover:bg-brand-blue-dark rounded-full px-6 text-white"
            >
              Submit Another Requirement
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "rounded-3xl border border-slate-200 bg-white",
            isIntake
              ? "grid shadow-xl shadow-slate-200/40 lg:grid-cols-[280px_minmax(0,1fr)]"
              : "p-6 shadow-sm sm:p-10",
          )}
        >
          <div
            className={cn(
              isIntake
                ? "bg-navy flex flex-col rounded-t-3xl p-6 text-white sm:p-8 lg:rounded-l-3xl lg:rounded-tr-none"
                : "mb-8 text-center sm:text-left",
            )}
          >
            <Eyebrow tone={isIntake ? "inverse" : "default"}>Direct Intake Form</Eyebrow>
            <h2
              className={cn(
                "text-2xl font-bold sm:text-3xl",
                isIntake
                  ? "mt-3 leading-tight tracking-tight text-white"
                  : "text-navy mt-2",
              )}
            >
              Submit Your Requirement
            </h2>
            <p
              className={cn(
                "text-sm",
                isIntake ? "mt-3 leading-relaxed text-slate-300" : "mt-1 text-slate-600",
              )}
            >
              Fill out the details below and our team will get back to you with a
              structured proposal.
            </p>
            {isIntake && (
              <>
                <div className="mt-10 hidden space-y-6 lg:block">
                  {[
                    {
                      icon: MessageSquareText,
                      title: "Start with your idea",
                      description: "Tell us what you need and what matters to you.",
                    },
                    {
                      icon: FileText,
                      title: "Add the finer details",
                      description:
                        "Share specifications, references or supporting files.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Let us take it from here",
                      description: "Our team will review your request and get in touch.",
                    },
                  ].map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-start gap-3">
                      <span className="text-brand-blue-muted inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 border-t border-white/10 pt-5 lg:mt-auto lg:pt-6">
                  <LockKeyhole
                    aria-hidden="true"
                    className="text-brand-blue-muted mt-0.5 size-4 shrink-0"
                  />
                  <p className="text-xs leading-relaxed text-slate-300">
                    Your details are used to respond to your requirement.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className={cn("min-w-0", isIntake && "p-5 sm:p-8 lg:p-10")}>
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  void form.handleSubmit(onSubmit)(event);
                }}
                className="space-y-6"
                aria-busy={form.formState.isSubmitting}
                noValidate
              >
                <div className="hidden" aria-hidden="true">
                  <label htmlFor={`${fileInputId}-website`}>Leave this field empty</label>
                  <input
                    ref={honeypot}
                    id={`${fileInputId}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    maxLength={200}
                  />
                </div>
                <fieldset
                  disabled={form.formState.isSubmitting}
                  className={cn(
                    "min-w-0 space-y-6",
                    isIntake &&
                      "space-y-8 [&_[data-slot=form-label]]:text-sm [&_[data-slot=form-label]]:font-semibold",
                  )}
                >
                  <section
                    aria-labelledby={isIntake ? `${sectionId}-contact` : undefined}
                    className={isIntake ? "space-y-5" : "space-y-6"}
                  >
                    {isIntake && (
                      <IntakeSectionHeading
                        id={`${sectionId}-contact`}
                        number="01"
                        title="Your contact details"
                        description="Let us know how to reach you."
                      />
                    )}
                    {/* Row 1: Name & Email */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Full Name <span className="text-brand-red">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. John Doe"
                                className={inputClassName}
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
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Email Address <span className="text-brand-red">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="e.g. name@company.com"
                                className={inputClassName}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 2: Phone & WhatsApp */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Contact Number <span className="text-brand-red">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="e.g. +94 77 123 4567"
                                className={inputClassName}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="whatsappNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              WhatsApp Number{" "}
                              <span className="text-[11px] font-normal text-slate-500">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="e.g. +94 77 123 4567"
                                className={inputClassName}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  <section
                    aria-labelledby={isIntake ? `${sectionId}-requirement` : undefined}
                    className={cn(
                      isIntake ? "space-y-5 border-t border-slate-100 pt-7" : "space-y-6",
                    )}
                  >
                    {isIntake && (
                      <IntakeSectionHeading
                        id={`${sectionId}-requirement`}
                        number="02"
                        title="Tell us what you need"
                        description="A few details will help us understand your request."
                      />
                    )}
                    {/* Row 3: Requirement Type & Country/Location */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="requirementType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Type of Requirement{" "}
                              <span className="text-brand-red">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectClassName}>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryOptions.map((option) => (
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
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Country / City{" "}
                              <span className="text-[11px] font-normal text-slate-500">
                                (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Sri Lanka, United Kingdom, UAE"
                                className={inputClassName}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 4: What Do You Need (Main description) */}
                    <FormField
                      control={form.control}
                      name="whatDoYouNeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-800">
                            What Do You Need? <span className="text-brand-red">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please describe what product, machinery, service, software, travel package or business support you are looking for..."
                              rows={4}
                              className={textareaClassName}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 5: Timeline & Budget */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Preferred Timeline{" "}
                              <span className="text-[11px] font-normal text-slate-500">
                                (Optional)
                              </span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectClassName}>
                                  <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TIMELINE_OPTIONS.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
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
                            <FormLabel className="text-xs font-bold text-slate-800">
                              Estimated Budget Range{" "}
                              <span className="text-[11px] font-normal text-slate-500">
                                (Optional)
                              </span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectClassName}>
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BUDGET_RANGE_OPTIONS.map((budget) => (
                                  <SelectItem key={budget} value={budget}>
                                    {budget}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 6: Additional Requirements */}
                    <FormField
                      control={form.control}
                      name="additionalRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-800">
                            Additional Notes or Specifications{" "}
                            <span className="text-[11px] font-normal text-slate-500">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional quantity details, technical specifications, brand preferences, or special requests..."
                              rows={2}
                              className={textareaClassName}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  <section
                    aria-labelledby={isIntake ? `${sectionId}-attachments` : undefined}
                    className={cn(
                      isIntake ? "space-y-5 border-t border-slate-100 pt-7" : "space-y-6",
                    )}
                  >
                    {isIntake && (
                      <IntakeSectionHeading
                        id={`${sectionId}-attachments`}
                        number="03"
                        title="Supporting documents"
                        description="Add relevant files, if you have them. This is optional."
                      />
                    )}
                    {/* Row 7: File Attachment */}
                    <div className="space-y-2">
                      <label
                        htmlFor={fileInputId}
                        className="text-xs font-bold text-slate-800"
                      >
                        Attach Documents / Specifications{" "}
                        <span className="text-[11px] font-normal text-slate-500">
                          (Optional)
                        </span>
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
                        className={`focus-within:border-brand-blue focus-within:ring-brand-blue/15 relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition-colors focus-within:ring-3 ${
                          isDragging
                            ? "border-brand-blue bg-brand-blue/5"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-50/80"
                        }`}
                        onClick={() => document.getElementById(fileInputId)?.click()}
                      >
                        <span
                          className={cn(
                            "text-brand-blue",
                            isIntake &&
                              "mb-1 flex size-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70",
                          )}
                        >
                          <UploadCloud aria-hidden="true" className="size-6" />
                        </span>
                        <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                          Drag &amp; drop files here or{" "}
                          <span className="text-brand-blue underline">browse</span>
                        </p>
                        <p
                          id={`${fileInputId}-hint`}
                          className="text-[11px] text-slate-500"
                        >
                          PDF, DOC, DOCX, JPG, PNG or WEBP (up to 10MB per file, 3 files /
                          15MB total)
                        </p>
                        <input
                          id={fileInputId}
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                          aria-describedby={`${fileInputId}-hint${fileError ? ` ${fileInputId}-error` : ""}`}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => addFiles(event.target.files)}
                        />
                      </div>

                      {fileError && (
                        <p
                          id={`${fileInputId}-error`}
                          role="alert"
                          className="text-brand-red text-xs font-medium"
                        >
                          {fileError}
                        </p>
                      )}

                      {files.length > 0 && (
                        <ul className="space-y-1.5 pt-2">
                          {files.map((file, index) => (
                            <li
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-800"
                            >
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                aria-label={`Remove ${file.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFiles((current) =>
                                    current.filter((_, i) => i !== index),
                                  );
                                }}
                                className="hover:text-brand-red text-slate-400"
                              >
                                <X className="size-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>

                  {/* Row 8: Terms Checkbox */}
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start gap-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={checkboxId}
                            className="mt-0.5 rounded-md border-slate-300"
                          />
                        </FormControl>
                        <div className="min-w-0 flex-1 space-y-1 leading-none">
                          <FormLabel
                            htmlFor={checkboxId}
                            className="block cursor-pointer text-xs leading-relaxed font-medium text-slate-600"
                          >
                            I confirm that the details provided are accurate, and I agree
                            to Miracle International&apos;s{" "}
                            <Link
                              href={ROUTES.public.privacyPolicy}
                              className="text-brand-blue font-semibold underline"
                            >
                              Privacy Policy
                            </Link>{" "}
                            for requirement processing.{" "}
                            <span className="text-brand-red">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <p role="alert" className="text-brand-red text-sm">
                      {submitError}
                    </p>
                  )}
                  {!process.env.NEXT_PUBLIC_CONTACT_API_URL && (
                    <p role="alert" className="text-brand-red text-sm">
                      The requirement form is temporarily unavailable. Please contact us
                      by email.
                    </p>
                  )}

                  {/* Row 9: Submit Button */}
                  <div
                    className={cn(
                      "pt-4",
                      isIntake &&
                        "flex flex-col items-stretch border-t border-slate-100 pt-6 sm:items-end",
                    )}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className={cn(
                        "bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/20 h-12 w-full cursor-pointer text-base font-bold text-white shadow-lg transition-all hover:shadow-xl",
                        isIntake
                          ? "gap-3 rounded-xl sm:ml-auto sm:w-auto sm:min-w-60 sm:px-7"
                          : "rounded-full",
                      )}
                      disabled={
                        form.formState.isSubmitting ||
                        !process.env.NEXT_PUBLIC_CONTACT_API_URL
                      }
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <LoaderCircle
                            aria-hidden="true"
                            className="size-4 animate-spin motion-reduce:animate-none"
                          />{" "}
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Requirement{" "}
                          {isIntake && (
                            <ArrowRight aria-hidden="true" className="size-4" />
                          )}
                        </>
                      )}
                    </Button>
                    {isIntake && (
                      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500 sm:text-right">
                        Please check your contact details before submitting.
                      </p>
                    )}
                  </div>
                </fieldset>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

function IntakeSectionHeading({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-1 flex items-start gap-3">
      <span
        aria-hidden="true"
        className="bg-brand-blue-light text-brand-blue flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
      >
        {number}
      </span>
      <div className="min-w-0">
        <h3 id={id} className="text-navy text-base font-bold">
          {title}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  );
}
