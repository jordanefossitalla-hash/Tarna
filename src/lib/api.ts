import { useUserStore } from "@/src/store/userStore";
import { ReactionType } from "../components/personnal/ui/feedItem";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost";
const API_PORT = process.env.NEXT_PUBLIC_API_PORT ?? "4000";

/**
 * Construit l'URL de base de l'API backend.
 */
export function getApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

// ── Refresh token logic ─────────────────────────────────────

let refreshPromise: Promise<string | null> | null = null;

/**
 * Tente de renouveler l'access token via le refresh token.
 * Déduplique les appels concurrents (un seul refresh à la fois).
 */
async function tryRefreshToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const { refreshToken, setTokens, logout } = useUserStore.getState();
    if (!refreshToken) return null;

    try {
      const res = await fetch(getApiUrl("/auth/refresh"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        logout();
        return null;
      }

      const data = await res.json();
      setTokens(data.accessToken, data.refreshToken);
      return data.accessToken as string;
    } catch {
      logout();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Effectue une requête authentifiée vers l'API backend.
 * Intercepte les 401 et tente un refresh automatique du token.
 */
export async function apiFetch(
  path: string,
  token: string | null,
  options: RequestInit = {},
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(getApiUrl(path), { ...options, headers });

  // Si 401 et qu'on avait un token, tenter le refresh
  if (res.status === 401 && token) {
    const newToken = await tryRefreshToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      return fetch(getApiUrl(path), { ...options, headers });
    }
  }

  return res;
}

// ── Follow helpers ──────────────────────────────────────────

export async function followUser(userId: string, token: string | null) {
  return apiFetch(`/users/${userId}/follow`, token, { method: "POST" });
}

export async function unfollowUser(userId: string, token: string | null) {
  return apiFetch(`/users/${userId}/follow`, token, { method: "DELETE" });
}

export async function checkIsFollowing(
  userId: string,
  token: string | null,
): Promise<boolean> {
  const res = await apiFetch(`/users/${userId}/is-following`, token);
  if (!res.ok) return false;
  const data = await res.json();
  return data.isFollowing === true;
}

// ── Post helpers ────────────────────────────────────────────

export async function deletePost(postId: string, token: string | null) {
  return apiFetch(`/posts/${postId}`, token, { method: "DELETE" });
}

// ── Comment helpers ─────────────────────────────────────────

/** Récupère les commentaires d'un post */
export async function fetchComments(postId: string, token: string | null) {
  return apiFetch(`/posts/${postId}/comments`, token);
}

/** Crée un commentaire (ou une réponse si parentCommentId est fourni) */
export async function createComment(
  body: {
    postId: string;
    authorId: string;
    contentText: string;
    parentCommentId?: string;
  },
  token: string | null,
) {
  return apiFetch(`/comments`, token, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// reactions sur les posts ─────────────────────────────────────────

/** Réagit à un post avec un type de réaction donné */
export async function reactToPost(
  postId: string,
  reactionType: ReactionType,
  token: string | null,
) {
  return apiFetch(`/posts/${postId}/reaction`, token, {
    method: "PUT",
    body: JSON.stringify({ type: reactionType }),
  });
}

export async function deleteReactionToPost(
  postId: string,
  token: string | null,
) {
  return apiFetch(`/posts/${postId}/reaction`, token, {
    method: "DELETE",
  });
}

// Compatibilite temporaire avec les imports existants
export async function DeleteToPost(postId: string, token: string | null) {
  return deleteReactionToPost(postId, token);
}
