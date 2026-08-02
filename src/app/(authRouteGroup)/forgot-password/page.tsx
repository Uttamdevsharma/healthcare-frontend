"use client";
import { forgotPasswordAction } from "../forgot-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { IForgotPasswordPayload, forgotPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IForgotPasswordPayload) => forgotPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to send reset email");
          return;
        }

        setIsSuccess(true);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
        console.log(`Forgot password failed: ${errorMessage}`);
        setServerError(`Forgot password failed: ${errorMessage}`);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mx-0">
          <KeyRound className="size-6" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground">
          No worries — enter your email and we&apos;ll send you a password reset link.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        {isSuccess ? (
          <div className="space-y-4">
            <Alert className="rounded-lg border-success/30 bg-success/10 text-success">
              <CheckCircle2 className="size-4" />
              <AlertDescription>
                If an account exists with that email, you will receive a password reset link shortly.
              </AlertDescription>
            </Alert>
            <Button
              className="h-11 w-full rounded-lg text-sm font-semibold"
              onClick={() => setIsSuccess(false)}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <form
            method="POST"
            action="#"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="email"
              validators={{ onChange: forgotPasswordZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  inputClassName="h-11 rounded-lg"
                  prepend={<Mail className="size-4.5" aria-hidden="true" />}
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive" className="rounded-lg">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Sending Reset Link..."
                  disabled={!canSubmit}
                  className="h-11 rounded-lg text-sm font-semibold"
                >
                  Send Reset Link
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage
