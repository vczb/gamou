import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/hooks/use-auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NavBar />

      {children}
    </AuthProvider>
  );
}
