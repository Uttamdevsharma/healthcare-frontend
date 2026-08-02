"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, LogOut, LayoutDashboard, HeartPulse } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UserRole, getDefaultDashboardRoute } from "@/lib/authUtils";
import { logoutAction } from "@/app/_actions/auth.actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/consultation", label: "Consultation" },
  { href: "/health-plans", label: "Health Plans" },
  { href: "/medicine", label: "Medicine" },
  { href: "/diagnostics", label: "Diagnostics" },
];

const BrandLogo = ({ compact = false }: { compact?: boolean }) => (
  <span className="flex shrink-0 items-center gap-2.5">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-sm">
      <HeartPulse className="h-5 w-5" />
    </span>
    {!compact && (
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Kalinga
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Health
        </span>
      </span>
    )}
  </span>
);

const PublicNavbar = ({ userRole }: { userRole: UserRole | null }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/95">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/" aria-label="Kalinga Health — Home" className="shrink-0">
          <BrandLogo />
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          {navItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {userRole ? (
            <>
              <Link href={getDefaultDashboardRoute(userRole)}>
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="default"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-primary/30 text-primary hover:bg-primary/5"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 sm:w-[360px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-16 items-center border-b px-6">
                <BrandLogo />
              </div>
              <nav className="flex flex-col gap-1 px-4 py-6">
                {navItems.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="my-4 border-t pt-4">
                  {userRole ? (
                    <div className="flex flex-col gap-1">
                      <Link
                        href={getDefaultDashboardRoute(userRole)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-accent"
                      >
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-medium text-destructive hover:bg-accent"
                      >
                        <LogOut className="h-5 w-5" />{" "}
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/register"
                        className="flex items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/login"
                        className="flex items-center justify-center gap-3 rounded-lg border border-primary/30 px-4 py-3 text-base font-medium text-primary"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
