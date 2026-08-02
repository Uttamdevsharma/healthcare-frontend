import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export interface PasswordCheck {
  label: string;
  met: boolean;
}

export const evaluatePasswordChecks = (password: string): PasswordCheck[] => [
  { label: "At least 8 characters", met: password.length >= 8 },
  { label: "Uppercase & lowercase", met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
  { label: "Includes a number", met: /\d/.test(password) },
  { label: "Includes a symbol", met: /[^A-Za-z0-9]/.test(password) },
];

const getStrength = (password: string) => {
  const score = evaluatePasswordChecks(password).filter((c) => c.met).length;
  if (password.length === 0) return { label: null, color: "bg-border", segments: 0, text: null };
  if (score === 0) return { label: "Too weak", color: "bg-destructive", segments: 1, text: "text-destructive" };
  if (score === 1 || score === 2) return { label: "Weak", color: "bg-destructive", segments: 2, text: "text-destructive" };
  if (score === 3) return { label: "Good", color: "bg-warning", segments: 3, text: "text-warning" };
  return { label: "Strong", color: "bg-success", segments: 4, text: "text-success" };
};

const PasswordStrength = ({ password }: { password: string }) => {
  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-2">
      {password.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i < strength.segments ? strength.color : "bg-border/70",
                )}
              />
            ))}
          </div>
          {strength.label && (
            <span className={cn("text-xs font-medium", strength.text)}>{strength.label}</span>
          )}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {evaluatePasswordChecks(password).map((check) => (
          <li key={check.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {check.met ? (
              <Check className="size-3.5 shrink-0 text-success" />
            ) : (
              <X className="size-3.5 shrink-0 text-muted-foreground/50" />
            )}
            <span className={cn(check.met && "text-foreground/80")}>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
