import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

const getErrorMessage = (error : unknown) : string => {
    if (typeof error === "string") return error;

    if(error && typeof error === "object"){
        if("message" in error && typeof error.message === "string"){
            return error.message;
        }
    }

    return String(error);
}

type AppFieldProps = {
    field : AnyFieldApi;
    label : string;
    type ?: "text" | "email" | "password" | "number" | "date" | "time";
    placeholder ?: string;
    append ?: React.ReactNode;
    prepend ?: React.ReactNode;
    className ?: string;
    inputClassName ?: string;
    disabled ?: boolean;
}

const AppField = ({
    field,
    label,
    type = "text",
    placeholder,
    append,
    prepend,
    className,
    inputClassName,
    disabled = false,
} : AppFieldProps) => {

    const firstError = field.state.meta.isTouched && field.state.meta.errors.length > 0 ? getErrorMessage(field.state.meta.errors[0]) : null;

    const hasError = firstError !== null;

  return (
    <div className={cn("space-y-1.5", className)}>
        <Label
            htmlFor={field.name}
            className={cn("text-sm font-medium text-foreground", hasError && "text-destructive")}
        >
            {label}
        </Label>

        <div className="relative">
            {
                prepend && (<div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-muted-foreground">
                    {prepend}
                </div>)
            }

            <Input
                id={field.name}
                name={field.name}
                type={type}
                value={field.state.value}
                placeholder={placeholder}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
                className={cn(
                    "bg-background",
                    prepend && "pl-10",
                    append && "pr-11",
                    hasError && "border-destructive focus-visible:ring-destructive/20",
                    inputClassName,
                )}
            />

            {
                append && (<div className="absolute inset-y-0 right-0 z-10 flex items-center pr-1.5">
                    {append}
                </div>)
            }

            {
                hasError && (
                    <p
                     id={`${field.name}-error`}
                     role="alert"
                     className="mt-1 text-sm text-destructive" 
                    >
                        {firstError}
                    </p>
                )
            }
        </div>
    </div>
  )
}

export default AppField
