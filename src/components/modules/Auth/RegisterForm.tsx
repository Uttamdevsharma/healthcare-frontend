"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAction } from "@/app/(authRouteGroup)/register/_action";
import GoogleLoginButton from "@/components/modules/Auth/GoogleLoginButton";
import PasswordStrength from "@/components/modules/Auth/PasswordStrength";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const payload: IRegisterPayload = {
          name: value.name,
          email: value.email,
          password: value.password,
        };
        const result = (await mutateAsync(payload)) as any;

        if (!result.success) {
          setServerError(result.message || "Registration failed");
          return;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Registration failed";
        console.log(`Registration failed: ${errorMessage}`);
        setServerError(`Registration failed: ${errorMessage}`);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Join Kalinga Health and take control of your care.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
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
            name="name"
            validators={{ onChange: registerZodSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                inputClassName="h-11 rounded-lg"
                prepend={<User className="size-4.5" aria-hidden="true" />}
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{ onChange: registerZodSchema.shape.email }}
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

          <form.Field
            name="password"
            validators={{ onChange: registerZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                inputClassName="h-11 rounded-lg"
                prepend={<Lock className="size-4.5" aria-hidden="true" />}
                append={
                  <Button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    variant="ghost"
                    size="icon"
                    className="pointer-events-auto size-8 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Subscribe selector={(s) => s.values.password}>
            {(password) => <PasswordStrength password={password} />}
          </form.Subscribe>

          <form.Field
            name="terms"
            validators={{
              onMount: ({ value }) =>
                value ? undefined : "You must accept the Terms & Privacy Policy",
              onSubmit: ({ value }) =>
                value ? undefined : "You must accept the Terms & Privacy Policy",
            }}
          >
            {(field) => {
              const hasError =
                field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="terms"
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? "terms-error" : undefined}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="font-medium text-primary hover:underline underline-offset-4">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="font-medium text-primary hover:underline underline-offset-4">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {hasError && (
                    <p id="terms-error" role="alert" className="text-sm text-destructive">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              );
            }}
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
                pendingLabel="Creating Account..."
                disabled={!canSubmit}
                className="h-11 rounded-lg text-sm font-semibold"
              >
                Create Account
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleLoginButton label="Sign up with Google" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
