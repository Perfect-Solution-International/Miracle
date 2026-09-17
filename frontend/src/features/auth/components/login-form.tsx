"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { applyBackendErrors } from "@/lib/validation/backend-errors";

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
  const [formError, setFormError] = useState<string | null>(null);

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
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Access your Miracle International account.</CardDescription>
      </CardHeader>
      <CardContent>
        {sessionExpired ? (
          <Alert className="mb-4">
            <AlertDescription>
              Your session has expired. Please sign in again.
            </AlertDescription>
          </Alert>
        ) : null}

        {formError ? (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href={ROUTES.auth.forgotPassword}
                      className="text-muted-foreground hover:text-foreground text-xs"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="rememberMe"
                    />
                  </FormControl>
                  <FormLabel htmlFor="rememberMe" className="text-sm font-normal">
                    Keep me signed in
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          New to Miracle International?{" "}
          <Link href={ROUTES.auth.register} className="text-foreground font-medium">
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
