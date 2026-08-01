"use client";
import { useSearchParams } from "next/navigation";
import { verifyEmailAction } from "./verify-email/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IVerifyEmailPayload, verifyEmailZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => verifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: email,
      otp: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to verify email");
          return;
        }

        setIsSuccess(true);
      } catch (error: any) {
        console.log(`Verify email failed: ${error.message}`);
        setServerError(`Verify email failed: ${error.message}`);
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
        <CardDescription>
          Enter the OTP sent to your email to verify your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                Your email has been successfully verified. You can now log in.
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
              validators={{ onChange: verifyEmailZodSchema.shape.otp }}
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

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Verifying Email..." disabled={!canSubmit}>
                  Verify Email
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

export default VerifyEmailPage