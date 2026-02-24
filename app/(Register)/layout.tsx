import GuestGuard from "@/src/components/providers/guestGuard";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GuestGuard>{children}</GuestGuard>;
}
