import FlashNotification from "@/components/FlashNotification";
import NavBar from "@/components/NavBar";
import { UserProvider } from "@/hooks/use-user";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <NavBar />
      <FlashNotification />
      {children}
    </UserProvider>
  );
}
