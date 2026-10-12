"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/providers/auth-provider";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { PORTAL_HOME, ROUTES } from "@/config/routes";
import { applyBackendErrors } from "@/lib/validation/backend-errors";
import { resolvePortal } from "@/lib/permissions/roles";

import { useLogin } from "../hooks/use-login";
import {
  loginSchema,
  type LoginFormInput,
  type LoginInput,
} from "../schemas/login.schema";

/**
 * Reference form for the platform.
 *
 * The pattern each feature form follows: a Zod schema owned by the feature, RHF
 * for state, and `applyBackendErrors` so validation failures from the Rust API
 * land on the matching field instead of a generic toast.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const login = useLogin();
  const { isAuthenticated, user } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If proxy bounced the user here (redirectTo is present), it means their
    // session cookie is missing or invalid. Do not auto-redirect, otherwise
    // we enter an infinite loop with the proxy.
    if (isAuthenticated && !searchParams.has("redirectTo")) {
      const fallback = user
        ? (PORTAL_HOME[resolvePortal(user.roles)] ?? ROUTES.admin.dashboard)
        : ROUTES.admin.dashboard;
      window.location.href = fallback;
    }
  }, [isAuthenticated, user, searchParams]);

  const sessionExpired = searchParams.get("reason") === "session-expired";

  // <Input, context, Output>: `rememberMe` is optional while typing and
  // guaranteed after parsing, so both types are supplied explicitly.
  const form = useForm<LoginFormInput, unknown, LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);
    try {
      await login.mutateAsync(values);
    } catch (error) {
      const message = applyBackendErrors(error, form.setError, ["email", "password"]);
      setFormError(message);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <section
        aria-labelledby="login-heading"
        className="border-border bg-card overflow-hidden rounded-3xl border shadow-[0_12px_48px_-16px_rgb(17_80_168_/_0.18)]"
      >
        <div
          aria-hidden="true"
          className="from-brand-blue via-primary to-brand-blue-muted h-1 bg-gradient-to-r"
        />
        <header className="px-6 py-6 sm:px-9 [@media(max-height:800px)]:py-4">
          <div className="mb-4 flex items-center gap-3 [@media(max-height:800px)]:hidden">
            <span className="border-primary/15 bg-primary/8 text-primary flex size-11 shrink-0 items-center justify-center rounded-2xl border">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
              Miracle account
            </p>
          </div>
          <h1
            id="login-heading"
            className="text-3xl font-semibold tracking-tight sm:text-[2rem]"
          >
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed [@media(max-height:650px)]:hidden">
            Sign in to access your workspace.
          </p>
        </header>
        <div className="px-6 pb-6 sm:px-9 [@media(max-height:800px)]:pb-4">
          {sessionExpired ? (
            <Alert
              role="status"
              className="mb-4 rounded-xl border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200 [@media(max-height:800px)]:mb-3"
            >
              <AlertDescription>
                Your session has expired. Please sign in again.
              </AlertDescription>
            </Alert>
          ) : null}

          {formError ? (
            <Alert
              variant="destructive"
              className="mb-4 rounded-xl [@media(max-height:800px)]:mb-3"
            >
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          ) : null}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 [@media(max-height:800px)]:space-y-3"
              aria-busy={form.formState.isSubmitting}
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <div className="group relative">
                      <Mail
                        className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 transition-colors motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          placeholder="you@company.com"
                          className="bg-background focus-visible:ring-primary/20 h-12 rounded-xl pl-11 text-base shadow-xs md:text-base"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href={ROUTES.auth.forgotPassword}
                        className="text-primary focus-visible:outline-ring rounded-sm text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-sm"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="group relative">
                      <Lock
                        className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 transition-colors motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="bg-background focus-visible:ring-primary/20 h-12 rounded-xl pr-14 pl-11 text-base shadow-xs md:text-base"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="text-muted-foreground hover:bg-primary/5 hover:text-primary focus-visible:outline-ring absolute top-1/2 right-1 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                      >
                        {showPassword ? (
                          <EyeOff aria-hidden="true" className="size-4" />
                        ) : (
                          <Eye aria-hidden="true" className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="size-[18px] rounded-md"
                      />
                    </FormControl>
                    <FormLabel className="text-muted-foreground min-h-6 cursor-pointer text-sm font-normal">
                      Remember me for 30 days
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="xl"
                className="group h-12 w-full rounded-xl font-semibold shadow-sm transition-colors motion-reduce:transition-none"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2
                      className="animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="border-border bg-primary/[0.025] border-t px-6 py-3 text-center sm:px-9 [@media(max-height:800px)]:hidden">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Your workspace. Your business. One account.
          </p>
        </div>
      </section>
      <div className="mt-4 flex justify-center [@media(max-height:650px)]:hidden [@media(max-height:800px)]:mt-2">
        <Link
          href={ROUTES.public.home}
          className="text-muted-foreground hover:text-primary focus-visible:outline-ring inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to website
        </Link>
      </div>
    </div>
  );
}
