"use client";

import {
  ArrowRight,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRIES } from "@/lib/constants/countries";

const inputClassName = "h-11 rounded-lg bg-white";

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  return (
    <span className="text-ink text-sm font-semibold">
      {children}
      {required ? <span className="text-brand-red ml-1">*</span> : null}
    </span>
  );
}

function UploadField({ label, onFiles }: { label: string; onFiles: (files: File[]) => void }) {
  const inputId = useId();

  return (
    <div className="space-y-2">
      <label htmlFor={inputId}>
        <FieldLabel>{label}</FieldLabel>
      </label>
      <label
        htmlFor={inputId}
        className="border-input hover:border-brand-blue hover:bg-brand-blue-light/40 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-white px-4 py-4 text-center transition-colors"
      >
        <UploadCloud aria-hidden="true" className="text-brand-blue size-5" />
        <span className="text-muted-foreground text-xs">
          Drop a file here or <span className="text-brand-blue font-semibold">browse</span>
        </span>
        <input
          id={inputId}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(event) => onFiles(Array.from(event.target.files ?? []))}
        />
      </label>
    </div>
  );
}

export interface WorkVisaSupportFormProps {
  embedded?: boolean;
}

export function WorkVisaSupportForm({ embedded = false }: WorkVisaSupportFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<Record<string, File[]>>({});

  function addFiles(key: string, selectedFiles: File[]) {
    if (selectedFiles.length > 0) setFiles((current) => ({ ...current, [key]: selectedFiles }));
  }

  if (submitted) {
    const successCard = (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-lift sm:px-12">
        <div className="bg-brand-blue-light text-brand-blue mx-auto grid size-16 place-items-center rounded-full">
          <CheckCircle2 aria-hidden="true" className="size-8" />
        </div>
        <p className="text-brand-blue mt-6 text-xs font-bold tracking-[0.16em] uppercase">Request Received</p>
        <h2 className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Request Submitted Successfully
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-lg leading-relaxed">
          Thank you. Our team will review your work visa support request and contact you shortly.
        </p>
        <Button type="button" variant="outline" size="lg" className="mt-8" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </div>
    );

    if (embedded) {
      return <div id="work-visa-request">{successCard}</div>;
    }

    return (
      <section id="work-visa-request" className="bg-surface scroll-mt-24 px-5 py-16 sm:px-8 md:py-24">
        {successCard}
      </section>
    );
  }

  const formCard = (
    <div id="work-visa-request" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lift sm:p-10">
      <div className="mb-8 text-center sm:text-left">
        <p className="text-brand-blue text-xs font-bold tracking-[0.16em] uppercase">Requirements Intake</p>
        <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Work Visa Support Request</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Share your employment and travel details. Miracle International will review your situation and guide you through the next steps.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
          <div className="space-y-10">
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-2 text-lg font-bold">
                <span className="bg-brand-blue-light text-brand-blue grid size-8 place-items-center rounded-full text-sm">01</span>
                Personal Information
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2"><FieldLabel required>Full Name</FieldLabel><Input required className={inputClassName} placeholder="Your full name" /></label>
                <label className="space-y-2"><FieldLabel required>Email Address</FieldLabel><Input required type="email" className={inputClassName} placeholder="you@example.com" /></label>
                <label className="space-y-2"><FieldLabel required>Phone Number</FieldLabel><Input required type="tel" className={inputClassName} placeholder="Your phone number" /></label>
                <label className="space-y-2"><FieldLabel required>Date of Birth</FieldLabel><Input required type="date" className={inputClassName} /></label>
                <label className="space-y-2 sm:col-span-2"><FieldLabel required>Nationality</FieldLabel><select required className={`${inputClassName} border-input focus-visible:ring-ring w-full border px-3 text-sm outline-none focus-visible:ring-3`} defaultValue=""><option value="" disabled>Select your nationality</option>{COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></label>
              </div>
            </fieldset>

            <fieldset className="space-y-5 border-t pt-8">
              <legend className="flex items-center gap-2 text-lg font-bold"><span className="bg-brand-blue-light text-brand-blue grid size-8 place-items-center rounded-full text-sm">02</span>Work &amp; Employment Details</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2"><FieldLabel required>Country You Want to Work In</FieldLabel><select required className={`${inputClassName} border-input focus-visible:ring-ring w-full border px-3 text-sm outline-none focus-visible:ring-3`} defaultValue=""><option value="" disabled>Select a country</option>{COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></label>
                <label className="space-y-2"><FieldLabel required>Job / Profession</FieldLabel><Input required className={inputClassName} placeholder="e.g. Software Engineer" /></label>
                <label className="space-y-2"><FieldLabel required>Current Employment Status</FieldLabel><select required className={`${inputClassName} border-input focus-visible:ring-ring w-full border px-3 text-sm outline-none focus-visible:ring-3`} defaultValue=""><option value="" disabled>Select your status</option><option>Employed</option><option>Self-employed</option><option>Seeking employment</option><option>Student</option><option>Other</option></select></label>
                <label className="space-y-2"><FieldLabel required>Years of Work Experience</FieldLabel><Input required type="number" min="0" className={inputClassName} placeholder="e.g. 5" /></label>
                <label className="space-y-2"><FieldLabel required>Highest Qualification</FieldLabel><Input required className={inputClassName} placeholder="e.g. Bachelor's Degree" /></label>
                <fieldset className="space-y-2"><legend><FieldLabel required>Job Offer Available</FieldLabel></legend><div className="flex h-11 items-center gap-5"><label className="flex items-center gap-2 text-sm"><input required type="radio" name="job-offer" value="yes" className="accent-brand-blue" />Yes</label><label className="flex items-center gap-2 text-sm"><input type="radio" name="job-offer" value="no" className="accent-brand-blue" />No</label></div></fieldset>
              </div>
            </fieldset>

            <fieldset className="space-y-5 border-t pt-8">
              <legend className="flex items-center gap-2 text-lg font-bold"><span className="bg-brand-blue-light text-brand-blue grid size-8 place-items-center rounded-full text-sm">03</span>Visa Requirement</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2"><FieldLabel required>Visa Type</FieldLabel><select required className={`${inputClassName} border-input focus-visible:ring-ring w-full border px-3 text-sm outline-none focus-visible:ring-3`} defaultValue=""><option value="" disabled>Select visa type</option><option>Employer-sponsored work visa</option><option>Skilled worker visa</option><option>Temporary work visa</option><option>Work permit</option><option>Not sure</option></select></label>
                <label className="space-y-2"><FieldLabel required>Preferred Country</FieldLabel><select required className={`${inputClassName} border-input focus-visible:ring-ring w-full border px-3 text-sm outline-none focus-visible:ring-3`} defaultValue=""><option value="" disabled>Select a country</option>{COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></label>
                <label className="space-y-2"><FieldLabel>Expected Travel Date</FieldLabel><Input type="date" className={inputClassName} /></label>
                <fieldset className="space-y-2"><legend><FieldLabel required>Employer / Sponsor Available</FieldLabel></legend><div className="flex h-11 items-center gap-5"><label className="flex items-center gap-2 text-sm"><input required type="radio" name="sponsor" value="yes" className="accent-brand-blue" />Yes</label><label className="flex items-center gap-2 text-sm"><input type="radio" name="sponsor" value="no" className="accent-brand-blue" />No</label></div></fieldset>
              </div>
            </fieldset>

            <fieldset className="space-y-5 border-t pt-8">
              <legend className="flex items-center gap-2 text-lg font-bold"><span className="bg-brand-blue-light text-brand-blue grid size-8 place-items-center rounded-full text-sm">04</span>Document Upload</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <UploadField label="CV / Resume" onFiles={(selected) => addFiles("cv", selected)} />
                <UploadField label="Passport Copy" onFiles={(selected) => addFiles("passport", selected)} />
                <UploadField label="Job Offer / Employment Contract" onFiles={(selected) => addFiles("contract", selected)} />
                <UploadField label="Other Supporting Documents" onFiles={(selected) => addFiles("other", selected)} />
              </div>
              {Object.keys(files).length > 0 ? <p className="text-muted-foreground text-xs">{Object.values(files).flat().map((file) => file.name).join(", ")} selected for review.</p> : null}
            </fieldset>

            <fieldset className="space-y-5 border-t pt-8">
              <legend className="flex items-center gap-2 text-lg font-bold"><span className="bg-brand-blue-light text-brand-blue grid size-8 place-items-center rounded-full text-sm">05</span>Additional Requirements</legend>
              <label className="space-y-2"><FieldLabel>Tell us about your work visa requirement</FieldLabel><Textarea rows={5} className="rounded-lg bg-white" placeholder="Tell us about your intended role, destination, employer, or any questions you have..." /></label>
            </fieldset>

            <div className="space-y-5 border-t pt-8">
              <label className="flex items-start gap-3 text-sm leading-relaxed"><Checkbox required className="mt-0.5" /><span>I confirm that the information provided is accurate.</span></label>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"><Button type="submit" variant="accent" size="xl">Submit Visa Support Request<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button><p className="text-muted-foreground max-w-sm text-xs leading-relaxed">Our team will review your request and contact you regarding the next steps.</p></div>
            </div>
          </div>
        </form>
    </div>
  );

  if (embedded) {
    return formCard;
  }

  return (
    <section id="work-visa-request" className="bg-surface scroll-mt-24 px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">{formCard}</div>
    </section>
  );
}
