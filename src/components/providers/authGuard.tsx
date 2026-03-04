"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";

/**
 * Protège les routes authentifiées.
 * Redirige vers /login si l'utilisateur n'est pas connecté.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const users = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
    if (isAuthenticated) {
      if (users?.role === "admin" || users?.role === "user" || users?.role === "moderator") {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
