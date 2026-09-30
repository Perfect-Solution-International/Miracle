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
export function RequirementInquiryForm({ preselectedCategory }: RequirementInquiryFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const fileInputId = useId();

  const form = useForm<RequirementInquiryInput>({
    resolver: zodResolver(requirementInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      requirementType: preselectedCategory || "",
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

  function onSubmit(values: RequirementInquiryInput) {
    const randomRef = "REQ-" + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRef(randomRef);

    toast.success(`Thank you, ${values.fullName}!`, {
      description: `Your requirement (${randomRef}) has been submitted. Our team will contact you shortly.`,
    });

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
                            className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium"
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
    </div>
  );
}
