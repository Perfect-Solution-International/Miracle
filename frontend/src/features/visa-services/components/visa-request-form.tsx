"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, UploadCloud, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Section } from "@/components/common/section";
import { DEFAULT_MAX_SIZE_BYTES } from "@/components/shared/file-uploader/file-uploader.types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRIES } from "@/lib/constants/countries";

import { VISA_TYPE_OPTIONS } from "../data/visa-services.content";
import {
  visaRequestSchema,
  type VisaRequestFormInput,
  type VisaRequestInput,
} from "../schemas/visa-request.schema";

/** Red asterisk marking a required field. */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-brand-red">
      *
    </span>
  );
}

/**
 * "Request Visa Assistance" form. There is no backend intake endpoint for
 * this yet (same situation as `ContactForm` and `RequirementInquiryForm`), so
 * submission confirms receipt locally; wire this to a real mutation once the
 * intake API exists. File selection is local-only for the same reason —
 * nothing is actually uploaded.
 */
export function VisaRequestForm() {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputId = useId();

  const form = useForm<VisaRequestFormInput, unknown, VisaRequestInput>({
    resolver: zodResolver(visaRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      countryOfResidence: "",
      destinationCountry: "",
      visaType: "",
      travelDate: "",
      travelers: 1,
      purpose: "",
      additionalRequirements: "",
    },
  });

  // Pre-select the visa type when arriving from a "Get Assistance" card link.
  useEffect(() => {
    const requested = searchParams.get("visaType");
    if (requested && VISA_TYPE_OPTIONS.includes(requested)) {
      form.setValue("visaType", requested, { shouldValidate: false });
    }
  }, [searchParams, form]);

  function onSubmit(values: VisaRequestInput) {
    toast.success(`Thanks, ${values.fullName}!`, {
      description: "Our visa assistance team will review your request and be in touch.",
    });
    form.reset();
    setFiles([]);
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    setFiles((current) => [...current, ...Array.from(list)]);
  }

  return (
    <Section
      id="visa-request-form"
      aria-labelledby="visa-request-heading"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-2xl">
        <div className="shadow-lift rounded-3xl border bg-white p-6 sm:p-10">
          <div className="text-center">
            <h2
              id="visa-request-heading"
              className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Request Visa Assistance
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Provide your basic travel details and our team will contact you with the next
              steps.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
              noValidate
            >
              <div className="space-y-5">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Your Details
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <RequiredMark />
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="countryOfResidence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-5 border-t pt-8">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Travel Details
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="destinationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Destination Country <RequiredMark />
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
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
                    name="visaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Visa Type <RequiredMark />
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a visa type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {VISA_TYPE_OPTIONS.map((option) => (
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="travelDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Travel Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="travelers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Travelers</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            inputMode="numeric"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            value={field.value == null ? "" : String(field.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose of Travel</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Holiday, conference, higher studies..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5 border-t pt-8">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Additional Information
                </p>

                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Anything else we should know about your trip or visa requirements..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <label htmlFor={fileInputId} className="text-sm leading-none font-medium">
                    Document Upload (Optional)
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
                      Upload documents only if requested. Supported formats: PDF, JPG, PNG
                      (max {Math.round(DEFAULT_MAX_SIZE_BYTES / (1024 * 1024))} MB per file).
                    </p>
                    <input
                      id={fileInputId}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
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
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="accent"
                  size="xl"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Submit Visa Request
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  Your information will be used only to assist with your visa request.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Section>
  );
}
