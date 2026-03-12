"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";

const ADMIN_REDIRECTED_KEY = "admin-initial-redirect-done";

/**
 * Protège les routes publiques (login, signup).
 * Redirige vers /home si l'utilisateur est déjà connecté.
 * Lors de la première connexion, les admins sont redirigés vers /dashboard/users.
 * Les connexions suivantes redirigent vers /home comme les autres utilisateurs.
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
      if (
        user?.role === "admin" &&
        !sessionStorage.getItem(ADMIN_REDIRECTED_KEY)
      ) {
        sessionStorage.setItem(ADMIN_REDIRECTED_KEY, "true");
        router.replace("/dashboard/users");
      } else {
        router.replace("/home");
      }
    }
  }, [isAuthenticated, router, user]);

  if (isAuthenticated) return null;

  return <>{children}</>;
}
