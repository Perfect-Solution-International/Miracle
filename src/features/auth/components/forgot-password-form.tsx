"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import { applyBackendErrors } from "@/lib/validation/backend-errors";

import { useForgotPassword } from "../hooks/use-forgot-password";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "../schemas/password.schema";

/**
 * Companion to `LoginForm`/`RegisterForm`. On success it swaps to a
 * confirmation panel in place, since the next step is an email the visitor
 * has to go open rather than a page in this app.
 */
export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword();
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    setFormError(null);
    try {
      await forgotPassword.mutateAsync(values);
      setSubmittedEmail(values.email);
    } catch (error) {
      const message = applyBackendErrors(error, form.setError, ["email"]);
      setFormError(message);
    }
  }

  if (submittedEmail) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold">Check your email</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            If an account exists for{" "}
            <span className="text-foreground">{submittedEmail}</span>, we&apos;ve sent a
            link to reset your password.
          </p>

          <Button asChild className="w-full">
            <Link href={ROUTES.auth.login}>Back to sign in</Link>
          </Button>

          <button
            type="button"
            onClick={() => setSubmittedEmail(null)}
            className="text-muted-foreground hover:text-foreground w-full text-center text-sm"
          >
            Didn&apos;t get the email? Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-semibold">Forgot password</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </CardHeader>
      <CardContent>
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

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          <Link href={ROUTES.auth.login} className="text-foreground font-medium">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
