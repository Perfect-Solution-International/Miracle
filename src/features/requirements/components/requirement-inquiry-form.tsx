"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, UploadCloud, X } from "lucide-react";
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
}

/**
 * Main Requirement Intake Form
 * Clean white card style matching the existing website with full requested form fields.
 */
export function RequirementInquiryForm({
  preselectedCategory,
  context = "general",
  defaultService = "",
}: RequirementInquiryFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const fileInputId = useId();
  const checkboxId = useId();

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

  return (
    <div className="mx-auto w-full max-w-4xl">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 text-center sm:text-left">
            <Eyebrow>Direct Intake Form</Eyebrow>
            <h2 className="text-navy mt-2 text-2xl font-bold sm:text-3xl">
              Submit Your Requirement
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Fill out the details below and our team will get back to you with a
              structured proposal.
            </p>
          </div>

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
                className="min-w-0 space-y-6"
              >
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
                            className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                            className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                            className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                            className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 3: Requirement Type & Country/Location */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="requirementType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-800">
                          Type of Requirement <span className="text-brand-red">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900">
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
                            className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                          className="resize-y rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                            <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900">
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
                            <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-white font-medium text-slate-900">
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
                          className="resize-y rounded-xl border-slate-300 bg-white font-medium text-slate-900 placeholder:text-slate-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                      isDragging
                        ? "border-brand-blue bg-brand-blue/5"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                    onClick={() => document.getElementById(fileInputId)?.click()}
                  >
                    <UploadCloud className="text-brand-blue size-6" />
                    <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                      Drag &amp; drop files here or{" "}
                      <span className="text-brand-blue underline">browse</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      PDF, DOC, DOCX, JPG, PNG or WEBP (up to 10MB per file, 3 files /
                      15MB total)
                    </p>
                    <input
                      id={fileInputId}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                      className="sr-only"
                      onChange={(event) => addFiles(event.target.files)}
                    />
                  </div>

                  {fileError && (
                    <p role="alert" className="text-brand-red text-xs font-medium">
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
                          className="block cursor-pointer text-xs font-medium leading-relaxed text-slate-600"
                        >
                          I confirm that the details provided are accurate, and I agree to
                          Miracle International&apos;s{" "}
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
                    The requirement form is temporarily unavailable. Please contact us by
                    email.
                  </p>
                )}

                {/* Row 9: Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/20 h-12 w-full cursor-pointer rounded-full text-base font-bold text-white shadow-lg transition-all hover:shadow-xl"
                    disabled={
                      form.formState.isSubmitting ||
                      !process.env.NEXT_PUBLIC_CONTACT_API_URL
                    }
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Requirement"}
                  </Button>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
