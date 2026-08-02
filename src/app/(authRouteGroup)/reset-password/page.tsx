"use client";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "../reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, KeyRound, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IResetPasswordPayload) => resetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to reset password");
          return;
        }

        setIsSuccess(true);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
        console.log(`Reset password failed: ${errorMessage}`);
        setServerError(`Reset password failed: ${errorMessage}`);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mx-0">
          <Lock className="size-6" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to your email along with a new password.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        {isSuccess ? (
          <div className="space-y-4">
            <Alert className="rounded-lg border-success/30 bg-success/10 text-success">
              <CheckCircle2 className="size-4" />
              <AlertDescription>
                Your password has been successfully reset. You can now log in with your new password.
              </AlertDescription>
            </Alert>
            <Link href="/login" className="block">
              <Button className="h-11 w-full rounded-lg text-sm font-semibold">
                Go to Login
              </Button>
            </Link>
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
            <input type="hidden" name="email" value={email} />

            <form.Field
              name="otp"
              validators={{ onChange: resetPasswordZodSchema.shape.otp }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="One-Time Password"
                  type="text"
                  placeholder="Enter the OTP from your email"
                  inputClassName="h-11 rounded-lg"
                  prepend={<KeyRound className="size-4.5" aria-hidden="true" />}
                />
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{ onChange: resetPasswordZodSchema.shape.newPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                  inputClassName="h-11 rounded-lg"
                  prepend={<Lock className="size-4.5" aria-hidden="true" />}
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
                  pendingLabel="Resetting Password..."
                  disabled={!canSubmit}
                  className="h-11 rounded-lg text-sm font-semibold"
                >
                  Reset Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage
