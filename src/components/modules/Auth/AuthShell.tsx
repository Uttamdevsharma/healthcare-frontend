"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarCheck2, HeartPulse } from "lucide-react";
import Link from "next/link";

const AuthShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
        aria-label="Go back"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <div className="w-full max-w-[480px]">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2.5"
            aria-label="DocCare — Home"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
              <HeartPulse className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">DocCare</span>
            </span>
          </Link>

          {children}
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <CalendarCheck2 className="size-3.5" />
          © {new Date().getFullYear()} DocCare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthShell;