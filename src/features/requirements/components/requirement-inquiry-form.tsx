"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, ShieldCheck, Upload, Users, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
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
Imasha

import { DEFAULT_MAX_SIZE_BYTES } from "@/components/shared/file-uploader/file-uploader.types";
import {
  SERVICE_OPTIONS,
  type ServiceContext,
} from "../data/service-requirement-options";
 develop

import {
  BUDGET_RANGE_OPTIONS,
  REQUIREMENT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "../data/tell-us-what-you-need.content";
import {
  requirementInquirySchema,
  type RequirementInquiryInput,
} from "../schemas/requirement-inquiry.schema";

export interface RequirementInquiryFormProps {
  preselectedCategory?: string;
}

/**
 * 3. Main Requirement Intake Form
 * Clean white card style matching the existing website with full requested form fields.
 */
 Imasha
export function RequirementInquiryForm({ preselectedCategory }: RequirementInquiryFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

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
 develop
  const fileInputId = useId();
  const checkboxId = useId();
  const isService = context !== "general";

  const form = useForm<RequirementInquiryInput>({
    resolver: zodResolver(requirementInquirySchema),
    defaultValues: {
      context,
      fullName: "",
      email: "",
      phone: "",
 Imasha
      whatsappNumber: "",
      requirementType: preselectedCategory || "",
      whatDoYouNeed: "",
      country: "",

      whatsapp: "",
      location: "",
      requirementType: defaultService,
      subject: "",
      details: "",
 develop
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

  function onSubmit(values: RequirementInquiryInput) {
    const randomRef = "REQ-" + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRef(randomRef);

    toast.success(`Thank you, ${values.fullName}!`, {
      description: `Your requirement (${randomRef}) has been submitted. Our team will contact you shortly.`,
    });
Imasha

    form.reset({
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
    setUploadedFiles([]);

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
 develop
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
 Imasha
      id="requirement-form"
      className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm max-w-4xl mx-auto"
    >
      {submittedRef ? (
        /* Success State View */
        <div className="flex flex-col items-center text-center py-8 sm:py-12 space-y-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-inner">
            <ShieldCheck className="size-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold px-3.5 py-1">
              Reference #{submittedRef}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Requirement Received Successfully!
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Thank you for submitting your requirement to Miracle International. Our specialist desk will review your details and connect with you within 24 hours.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setSubmittedRef(null)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm px-8 h-11 rounded-full shadow-md mt-4"
          >
            Submit Another Requirement
          </Button>
        </div>
      ) : (
        /* Form View */
        <>
          <div className="text-center max-w-2xl mx-auto pb-6 border-b border-slate-100">
            <Eyebrow>Requirement Form</Eyebrow>
            <h2 className="text-navy mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Submit Your Requirement
            </h2>
            <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-relaxed">
              Fill out the form below with your specific needs. Our coordinators will review your submission and prepare customized solutions and quotations.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* Row 1: Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-blue pb-1">
                  <Users className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                    1. Contact Information
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
                            placeholder="e.g. Jonathan Perera"
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"

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
 develop
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
Imasha
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
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
                            {...field}
                          />

                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className="text-brand-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
 develop
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

 Imasha
                <div className="grid gap-4 sm:grid-cols-2">
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
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
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
                          WhatsApp Number <span className="text-[11px] text-slate-500 font-normal">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="e.g. +94 77 123 4567"
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
                            {...field}
                          />
                        </FormControl>

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
 develop
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
 Imasha
              </div>

              {/* Row 2: Requirement Scope & Specifications */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-brand-blue pb-1">
                  <span className="flex size-4 items-center justify-center rounded-full bg-brand-blue text-white text-[10px] font-bold">
                    2
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Requirement Scope &amp; Specifications
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="requirementType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-800">
                          Requirement Type <span className="text-brand-red">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 font-medium">
                              <SelectValue placeholder="Select a requirement type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-200">
                            {REQUIREMENT_TYPE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option} className="text-slate-900 font-medium">
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
                          Country / Location <span className="text-[11px] text-slate-500 font-normal">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Sri Lanka, UAE, Singapore, UK"
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
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
                  name="whatDoYouNeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-800">
                        What Do You Need? <span className="text-brand-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Industrial packaging machine / Inbound 7-day luxury tour / POS software solution"
                          className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-1">
                  <FormField
                    control={form.control}
                    name="budgetRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-800">
                          Estimated Budget <span className="text-[11px] text-slate-500 font-normal">(Optional)</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 font-medium">
                              <SelectValue placeholder="Select budget range (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-200">
                            {BUDGET_RANGE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option} className="text-slate-900 font-medium">
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


                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-800">
                        Additional Requirements <span className="text-[11px] text-slate-500 font-normal">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Provide any specific details, product quantities, tech specifications, dates, destinations, or customization instructions..."
                          className="rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium leading-relaxed"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Optional Document Upload */}
                <div className="space-y-1.5 pt-1">
                  <label htmlFor={fileInputId} className="text-xs font-bold text-slate-800 block">
                    Optional Document Upload <span className="text-[11px] text-slate-500 font-normal">(PDF, PNG, JPG — max 10MB)</span>
                  </label>
                  <div className="border border-dashed border-slate-300 hover:border-brand-blue rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
                    <input
                      id={fileInputId}
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor={fileInputId} className="cursor-pointer flex flex-col items-center">
                      <Upload className="size-6 text-brand-blue mb-1" />
                      <span className="text-xs sm:text-sm font-semibold text-navy">
                        Click to browse or drag &amp; drop files here
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5">
                        Attach product specs, drawings, flight itineraries, or notes
                      </span>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {uploadedFiles.map((fn, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-xs font-mono text-slate-800 border border-slate-300"
                        >
                          <FileUp className="size-3.5 text-brand-blue" />
                          <span className="truncate max-w-[200px]">{fn}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-slate-400 hover:text-brand-red ml-1"
                          >
                            <X className="size-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="pt-2">
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
                          I confirm that the details provided are accurate and authorize Miracle International to review my requirement and contact me with relevant solutions.{" "}
                          <Link
                            href={ROUTES.public.terms}
                            target="_blank"
                            className="text-brand-blue underline font-bold"
                          >
                            Terms &amp; Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 sm:h-13 bg-brand-blue hover:bg-brand-blue-dark text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                >
                  Submit Requirement
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}

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
 develop
    </div>
  );
}
