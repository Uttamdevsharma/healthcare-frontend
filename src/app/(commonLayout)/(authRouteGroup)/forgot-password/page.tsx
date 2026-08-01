"use client";
import { forgotPasswordAction } from "./forgot-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IForgotPasswordPayload, forgotPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
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
      } catch (error: any) {
        console.log(`Forgot password failed: ${error.message}`);
        setServerError(`Forgot password failed: ${error.message}`);
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                If an account exists with that email, you will receive a password reset link shortly.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
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
                  placeholder="Enter your email"
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
                <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Sending Reset Link..." disabled={!canSubmit}>
                  Send Reset Link
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

export default ForgotPasswordPage