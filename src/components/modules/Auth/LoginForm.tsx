"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(authRouteGroup)/login/_action";
import GoogleLoginButton from "@/components/modules/Auth/GoogleLoginButton";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
    redirectPath ?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync , isPending} = useMutation({
        mutationFn : (payload : ILoginPayload) => loginAction(payload, redirectPath),
    })

    const form = useForm({
        defaultValues : {
            email : "",
            password : "",
        },

        onSubmit : async ({value}) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;

                if(!result.success ){
                    setServerError(result.message || "Login failed");
                    return ;
                }
            } catch (error : any) {
                console.log(`Login failed: ${error.message}`);
                setServerError(`Login failed: ${error.message}`);
            }
        }
    })

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
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
            name="email"
            validators={{ onChange: loginZodSchema.shape.email }}
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
            validators={{ onChange: loginZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>

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
                pendingLabel="Logging In..."
                disabled={!canSubmit}
                className="h-11 rounded-lg text-sm font-semibold"
              >
                Log In
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

        <GoogleLoginButton label="Continue with Google" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}

export default LoginForm
