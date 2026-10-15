"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ROUTES } from "@/config/routes";
import { COUNTRIES } from "@/lib/constants/countries";
import { ApiError } from "@/lib/api/api-error";
import { applyBackendErrors } from "@/lib/validation/backend-errors";

import { useRegister } from "../hooks/use-register";
import {
  ACCOUNT_TYPE_LABELS,
  COMPANY_REQUIRED_ACCOUNT_TYPES,
} from "../data/register.content";
import {
  REGISTRABLE_ACCOUNT_TYPES,
  registerSchema,
  type RegisterInput,
} from "../schemas/register.schema";

const REGISTER_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "companyName",
  "accountType",
  "country",
  "password",
  "confirmPassword",
  "acceptTerms",
] as const;

const STEPS = [
  {
    label: "Personal",
    title: "Let's get acquainted",
    description: "Start with the name you'd like to use on your account.",
    icon: UserRound,
    fields: ["firstName", "lastName"],
  },
  {
    label: "Contact",
    title: "Your contact details",
    description: "Add your email and phone number so we can stay in touch.",
    icon: Mail,
    fields: ["email", "phone"],
  },
  {
    label: "Business",
    title: "Your business profile",
    description: "Tell us where you're based and how you'll use Miracle.",
    icon: Building2,
    fields: ["accountType", "country", "companyName"],
  },
  {
    label: "Security",
    title: "Secure your account",
    description: "Choose a password to keep your workspace secure.",
    icon: LockKeyhole,
    fields: ["password", "confirmPassword", "acceptTerms"],
  },
] as const satisfies {
  label: string;
  title: string;
  description: string;
  icon: typeof UserRound;
  fields: readonly (keyof RegisterInput)[];
}[];

/** Companion to `LoginForm`: a compact step-by-step flow with the full registration schema. */
export function RegisterForm() {
  const register = useRegister();
  const [step, setStep] = useState(0);
  const currentStep = STEPS[step] ?? STEPS[0];
  const StepIcon = currentStep.icon;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      accountType: "customer",
      country: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const accountType = useWatch({ control: form.control, name: "accountType" });
  const companyRequired = COMPANY_REQUIRED_ACCOUNT_TYPES.has(accountType);

  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const invalidField = currentStep.fields.find(
      (name) => form.getFieldState(name).error,
    );
    if (invalidField) form.setFocus(invalidField);
    else headingRef.current?.focus();
  }, [step, currentStep, form]);

  function showFirstInvalidStep() {
    const invalidStep = STEPS.findIndex(({ fields }) =>
      fields.some((name) => form.getFieldState(name).error),
    );
    if (invalidStep >= 0) setStep(invalidStep);
  }

  async function continueStep() {
    if (await form.trigger([...currentStep.fields], { shouldFocus: true })) {
      setStep((value) => Math.min(value + 1, STEPS.length - 1));
    }
  }

  async function onSubmit(values: RegisterInput) {
    setFormError(null);
    try {
      await register.mutateAsync(values);
    } catch (error) {
   
      if (error instanceof ApiError && error.isConflict) {
        form.setError("email", { type: "server", message: error.message });
        showFirstInvalidStep();
        return;
      }
      const message = applyBackendErrors(error, form.setError, REGISTER_FIELDS);
      setFormError(message);
      showFirstInvalidStep();
    }
  }

  return (
    <section
      aria-labelledby="register-heading"
      className="border-primary/15 bg-card mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border shadow-[0_24px_64px_-24px_rgb(17_80_168_/_0.25)]"
    >
      <div
        aria-hidden="true"
        className="from-brand-blue via-brand-blue to-brand-blue-muted h-1 bg-linear-to-r"
      />
      <header className="border-border from-primary/[0.07] to-card border-b bg-linear-to-br px-5 py-6 sm:px-9 sm:py-7 [@media(max-height:800px)]:py-4">
        <div className="mb-5 flex items-center justify-between gap-3 [@media(max-height:800px)]:mb-3">
          <div className="flex items-center gap-2.5">
            <span className="border-primary/15 bg-card text-primary flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-xs">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-primary text-[11px] font-semibold tracking-[0.14em] uppercase">
              Miracle account
            </p>
          </div>
          <span className="border-primary/10 bg-card/80 text-muted-foreground rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <h1
          id="register-heading"
          className="text-3xl font-semibold tracking-tight sm:text-[2rem] [@media(max-height:800px)]:text-2xl"
        >
          Create an account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Your next business opportunity starts here.
        </p>
      </header>
      <div className="px-5 pt-5 sm:px-9 [@media(max-height:800px)]:pt-4">
        <ol
          aria-label="Registration progress"
          className="before:bg-border relative isolate mb-6 grid grid-cols-4 gap-2 before:absolute before:top-4 before:right-[12.5%] before:left-[12.5%] before:-z-10 before:h-px [@media(max-height:800px)]:mb-4"
        >
          {STEPS.map(({ label }, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className="flex flex-col items-center gap-2"
            >
              <span
                aria-hidden="true"
                className={
                  index <= step
                    ? "bg-primary text-primary-foreground border-primary ring-card flex size-8 items-center justify-center rounded-full border text-xs font-semibold ring-4"
                    : "bg-card text-muted-foreground border-border ring-card flex size-8 items-center justify-center rounded-full border text-xs font-medium ring-4"
                }
              >
                {index < step ? <Check className="size-4" /> : index + 1}
              </span>
              <span
                className={
                  index === step
                    ? "text-primary text-xs font-semibold"
                    : "text-muted-foreground text-xs font-medium"
                }
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="px-5 pb-6 sm:px-9 sm:pb-7 [@media(max-height:800px)]:pb-4">
        <div className="mb-5 flex items-start gap-3 [@media(max-height:800px)]:mb-4">
          <span className="bg-primary/7 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            <StepIcon className="size-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="focus-visible:ring-ring rounded-sm text-lg font-semibold tracking-tight outline-none focus-visible:ring-2"
            >
              {currentStep.title}
            </h2>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
              {currentStep.description}
            </p>
          </div>
        </div>
        {formError ? (
          <Alert variant="destructive" className="mb-4 rounded-xl">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}
        <Form {...form}>
          <form
            noValidate
            aria-busy={form.formState.isSubmitting}
            className="space-y-5 [@media(max-height:800px)]:space-y-3"
            onSubmit={(event) => {
              if (step < STEPS.length - 1) {
                event.preventDefault();
                void continueStep();
              } else {
                void form.handleSubmit(onSubmit, showFirstInvalidStep)(event);
              }
            }}
          >
            <div
              key={step}
              className="[&_[data-slot=select-trigger]]:bg-primary/[0.025] [&_input]:bg-primary/[0.025] [&_input:focus-visible]:bg-background [&_input:focus-visible]:ring-primary/20 [&_input:hover]:border-primary/40 space-y-4 [&_[data-slot=form-label]]:text-sm [&_[data-slot=form-message]]:text-xs [&_[data-slot=select-trigger]]:h-12 [&_[data-slot=select-trigger]]:min-w-0 [&_[data-slot=select-trigger]]:rounded-xl [&_[data-slot=select-value]]:truncate [&_input]:h-12 [&_input]:rounded-xl [&_input]:text-base [&_input]:shadow-xs [&_input]:transition-colors motion-reduce:[&_input]:transition-none [@media(max-height:800px)]:space-y-3 [@media(max-height:800px)]:[&_[data-slot=select-trigger]]:h-11 [@media(max-height:800px)]:[&_input]:h-11"
            >
              {step === 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="given-name"
                            placeholder="First name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="family-name"
                            placeholder="Last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {step === 1 ? (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <div className="group relative">
                          <Mail
                            className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                            aria-hidden="true"
                          />
                          <FormControl>
                            <Input
                              type="email"
                              autoComplete="email"
                              autoCapitalize="none"
                              spellCheck={false}
                              className="pl-10"
                              placeholder="you@company.com"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <div className="group relative">
                          <Phone
                            className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                            aria-hidden="true"
                          />
                          <FormControl>
                            <Input
                              type="tel"
                              autoComplete="tel"
                              placeholder="+94 77 123 4567"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {step === 2 ? (
                <div className="space-y-4 [@media(max-height:800px)]:space-y-3">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger
                                ref={field.ref}
                                onBlur={field.onBlur}
                                className="w-full"
                              >
                                <SelectValue placeholder="Select an account type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REGISTRABLE_ACCOUNT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {ACCOUNT_TYPE_LABELS[type]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger
                                ref={field.ref}
                                onBlur={field.onBlur}
                                className="w-full"
                              >
                                <SelectValue placeholder="Select your country" />
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
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company name
                          {companyRequired ? null : (
                            <span className="text-muted-foreground font-normal">
                              {" "}
                              (optional)
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="organization"
                            placeholder="Your company name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {step === 3 ? (
                <div className="space-y-4 [@media(max-height:800px)]:space-y-3">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a password"
                                className="pr-12"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowPassword((value) => !value)}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              aria-pressed={showPassword}
                              className="text-muted-foreground hover:bg-primary/5 hover:text-primary focus-visible:outline-ring absolute top-1/2 right-1 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                              {showPassword ? (
                                <EyeOff aria-hidden="true" className="size-4" />
                              ) : (
                                <Eye aria-hidden="true" className="size-4" />
                              )}
                            </button>
                          </div>
                          <FormDescription className="text-xs leading-relaxed">
                            Use at least 5 characters, including a number.
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Re-enter your password"
                                className="pr-12"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword((value) => !value)}
                              aria-label={
                                showConfirmPassword
                                  ? "Hide confirm password"
                                  : "Show confirm password"
                              }
                              aria-pressed={showConfirmPassword}
                              className="text-muted-foreground hover:bg-primary/5 hover:text-primary focus-visible:outline-ring absolute top-1/2 right-1 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                              {showConfirmPassword ? (
                                <EyeOff aria-hidden="true" className="size-4" />
                              ) : (
                                <Eye aria-hidden="true" className="size-4" />
                              )}
                            </button>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="border-border bg-primary/[0.025] flex flex-row items-start gap-3 space-y-0 rounded-xl border p-3.5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 size-[18px] shrink-0 rounded-md"
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-muted-foreground block cursor-pointer text-xs leading-relaxed font-normal">
                            I agree to the{" "}
                            <Link
                              href={ROUTES.public.terms}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary focus-visible:outline-ring rounded-sm font-medium underline underline-offset-2 focus-visible:outline-2"
                            >
                              Terms &amp; Conditions
                              <span className="sr-only"> (opens in a new tab)</span>
                            </Link>{" "}
                            and{" "}
                            <Link
                              href={ROUTES.public.privacyPolicy}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary focus-visible:outline-ring rounded-sm font-medium underline underline-offset-2 focus-visible:outline-2"
                            >
                              Privacy Policy
                              <span className="sr-only"> (opens in a new tab)</span>
                            </Link>
                          </FormLabel>
                          <FormMessage className="text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
            </div>
            <div className="border-border flex gap-3 border-t pt-5 [@media(max-height:800px)]:pt-4">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl px-4 [@media(max-height:800px)]:h-11"
                  disabled={form.formState.isSubmitting}
                  onClick={() => setStep((value) => value - 1)}
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Button>
              ) : null}
              <Button
                type="submit"
                size="xl"
                className="group h-12 flex-1 rounded-xl font-semibold shadow-[0_6px_16px_-6px_rgb(17_80_168_/_0.45)] [@media(max-height:800px)]:h-11"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2
                      className="animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    {step === STEPS.length - 1 ? "Create account" : "Continue"}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="border-border bg-primary/[0.025] text-muted-foreground border-t px-5 py-4 text-center text-sm [@media(max-height:800px)]:py-3">
        Already have an account?{" "}
        <Link
          href={ROUTES.auth.login}
          className="text-primary focus-visible:outline-ring rounded-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Sign in
        </Link>
      </div>
    </section>
  );
}
