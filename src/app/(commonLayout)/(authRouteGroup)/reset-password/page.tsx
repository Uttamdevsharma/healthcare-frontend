"use client";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "../reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
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
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your OTP and new password to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                Your password has been successfully reset. You can now log in with your new password.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={() => window.location.href = "/login"}
            >
              Go to Login
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
            <input type="hidden" name="email" value={email} />

            <form.Field
              name="otp"
              validators={{ onChange: resetPasswordZodSchema.shape.otp }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="OTP"
                  type="text"
                  placeholder="Enter the OTP from your email"
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
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Resetting Password..." disabled={!canSubmit}>
                  Reset Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        )}

        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-primary hover:underline underline-offset-4">
            Back to Login
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage