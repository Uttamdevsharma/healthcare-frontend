import AuthShell from "@/components/modules/Auth/AuthShell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
