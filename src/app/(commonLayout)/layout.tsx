import { getCookie } from "@/lib/cookieUtils";
import { jwtUtils } from "@/lib/jwtUtils";
import PublicNavbar from "@/components/shared/PublicNavbar";
import PublicFooter from "@/components/shared/PublicFooter";
import { UserRole } from "@/lib/authUtils";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getCookie("accessToken");
  let role: UserRole | null = null;
  
  if (token) {
      try {
          const decoded = jwtUtils.decodedToken(token);
          if (decoded && decoded.role) {
              role = decoded.role as UserRole;
          }
      } catch (e) {
          // invalid token
      }
  }

  return (
   <div className="flex flex-col min-h-screen">
      <PublicNavbar userRole={role} />
      <div className="flex-grow">
        {children}
      </div>
      <PublicFooter />
   </div>
  );
}
