"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";

/**
 * Protège les routes publiques (login, signup).
 * Redirige vers /home si l'utilisateur est déjà connecté.
 */
export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        router.replace("/dashboard/users");
      } else {
        router.replace("/home");
      }
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return <>{children}</>;
}
