"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { UserRole, getDefaultDashboardRoute } from "@/lib/authUtils";
import { logoutAction } from "@/app/_actions/auth.actions";
import { useState } from "react";

const PublicNavbar = ({ userRole }: { userRole: UserRole | null }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const navItems = [
    { href: "/consultation", label: "Consultation" },
    { href: "/health-plans", label: "Health Plans" },
    { href: "/medicine", label: "Medicine" },
    { href: "/diagnostics", label: "Diagnostics" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            PH Doc
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {userRole ? (
            <>
              <Link href={getDefaultDashboardRoute(userRole)}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="default" 
                onClick={handleLogout} 
                disabled={isLoggingOut}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="border-t my-4 pt-4">
                  {userRole ? (
                    <div className="flex flex-col space-y-3">
                      <Link 
                        href={getDefaultDashboardRoute(userRole)} 
                        className="flex items-center text-lg font-medium text-foreground hover:text-primary"
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center text-lg font-medium text-destructive hover:text-destructive/80 text-left"
                      >
                        <LogOut className="mr-2 h-5 w-5" /> {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  ) : (
                    <Link 
                      href="/login" 
                      className="flex items-center text-lg font-medium text-foreground hover:text-primary"
                    >
                      <User className="mr-2 h-5 w-5" /> Login
                    </Link>
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
