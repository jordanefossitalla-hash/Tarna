"use server";
import type {
  DetailedOrganizationResponse,
  OrgRole,
  OrganizationResponse,
  PaginatedJoinRequestsResponse,
  PaginatedMembersResponse,
  PaginatedOrgResponse,
} from "@/src/types/organization";
import type { UserSearchResult } from "@/src/types/user";
import { cookies } from "next/headers";
import { buildUrl, getServerApiOrigin } from "@/src/lib/runtime-config";

const API_BASE_URL = getServerApiOrigin();

type CreateOrgInput = {
  name: string;
  domain: string;
  country: string;
  sector: string;
  bio: string;
  memberIds?: string[];
};
export type CreateOrgState = {
  success: boolean;
  error: string | null;
  org: OrganizationResponse | null;
};

// ── Helpers ──────────────────────────────────────────────────

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

function emptyPage(): PaginatedOrgResponse {
  return {
    data: [],
    meta: { limit: 20, nextCursor: null, hasMore: false },
  };
}

/**
 * Appel générique vers un endpoint paginé d'organisations.
 */
async function fetchOrgs(
  path: string,
  cursor?: string | null,
): Promise<PaginatedOrgResponse> {
  const token = await getToken();
  if (!token) return emptyPage();

  const url = new URL(buildUrl(API_BASE_URL, path));
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return emptyPage();

  const json = (await res.json()) as {
    data?: OrganizationResponse[];
    meta?: PaginatedOrgResponse["meta"];
  };

  return {
    data: json.data ?? [],
    meta: json.meta ?? { limit: 20, nextCursor: null, hasMore: false },
  };
}

// ── Public server actions ────────────────────────────────────

/** Organisations dont l'utilisateur est membre actif. */
export async function fetchMyOrgs(
  cursor?: string | null,
): Promise<PaginatedOrgResponse> {
  return fetchOrgs("/organizations/mine", cursor);
}

/** Organisations que l'utilisateur peut découvrir. */
export async function fetchDiscoverOrgs(
  cursor?: string | null,
): Promise<PaginatedOrgResponse> {
  return fetchOrgs("/organizations/discover", cursor);
}

/** Invitations / demandes en attente. */
export async function fetchPendingOrgs(
  cursor?: string | null,
): Promise<PaginatedOrgResponse> {
  return fetchOrgs("/organizations/pending", cursor);
}

/** Crée une nouvelle organisation. */
export async function createOrganization(
  input: CreateOrgInput,
): Promise<CreateOrgState> {
  const token = await getToken();
  if (!token) {
    return { success: false, error: "Non authentifié.", org: null };
  }
  try {
    const res = await fetch(buildUrl(API_BASE_URL, "/organizations"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...input,
        memberIds: input.memberIds?.length ? input.memberIds : undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        error: data?.message ?? `Request failed (${res.status})`,
        org: null,
      };
    }

    // Le contrôleur backend retourne l'org directement (pas de wrapper { data })
    const org = (await res.json()) as OrganizationResponse;

    return { success: true, error: null, org };
  } catch {
    return { success: false, error: "Échec de la création de l'organisation.", org: null };
  }
}

// ── Join / Cancel ────────────────────────────────────────────

export type JoinRequestResult = {
  success: boolean;
  error: string | null;
};

/** Demander à rejoindre une organisation. */
export async function requestJoinOrg(
  orgId: string,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}/join`), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        error: data?.message ?? `Erreur (${res.status})`,
      };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de la demande." };
  }
}

/** Annuler sa demande d'adhésion en attente. */
export async function cancelJoinRequest(
  orgId: string,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}/join`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        error: data?.message ?? `Erreur (${res.status})`,
      };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de l'annulation." };
  }
}

export async function fetchDetailOrg(
  orgId: string,
): Promise<DetailedOrganizationResponse | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const org = (await res.json()) as DetailedOrganizationResponse;
    return org;
  } catch {
    return null;
  }
}

// ── Recherche d'utilisateurs ─────────────────────────────────

/** Recherche des utilisateurs par nom/username (pour l'ajout de membres). */
export async function searchUsers(
  query: string,
): Promise<UserSearchResult[]> {
  const token = await getToken();
  if (!token) return [];

  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  try {
    const url = new URL(buildUrl(API_BASE_URL, "/users"));
    url.searchParams.set("search", trimmed);
    url.searchParams.set("limit", "10");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = (await res.json()) as {
      data?: Array<{
        id: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
      }>;
    };

    return (json.data ?? []).map((u) => ({
      id: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
    }));
  } catch {
    return [];
  }
}

// ── Members ──────────────────────────────────────────────────

/** Liste paginée des membres d'une organisation. */
export async function fetchMembers(
  orgId: string,
  cursor?: string | null,
): Promise<PaginatedMembersResponse> {
  const token = await getToken();
  const empty: PaginatedMembersResponse = {
    data: [],
    meta: { limit: 20, nextCursor: null, hasMore: false },
  };
  if (!token) return empty;

  try {
    const url = new URL(buildUrl(API_BASE_URL, `/organizations/${orgId}/members`));
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return empty;
    return (await res.json()) as PaginatedMembersResponse;
  } catch {
    return empty;
  }
}

/** Ajouter un membre directement. */
export async function addMember(
  orgId: string,
  userId: string,
  role?: OrgRole,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}/members`), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de l'ajout." };
  }
}

/** Retirer un membre (ou quitter soi-même). */
export async function removeMember(
  orgId: string,
  userId: string,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(
      buildUrl(API_BASE_URL, `/organizations/${orgId}/members/${userId}`),
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec du retrait." };
  }
}

/** Modifier le rôle d'un membre. */
export async function updateMemberRole(
  orgId: string,
  userId: string,
  role: OrgRole,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(
      buildUrl(API_BASE_URL, `/organizations/${orgId}/members/${userId}/role`),
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      },
    );
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de la mise à jour." };
  }
}

// ── Join Requests ────────────────────────────────────────────

/** Liste paginée des demandes d'adhésion en attente. */
export async function fetchJoinRequests(
  orgId: string,
  cursor?: string | null,
): Promise<PaginatedJoinRequestsResponse> {
  const token = await getToken();
  const empty: PaginatedJoinRequestsResponse = {
    data: [],
    meta: { limit: 20, nextCursor: null, hasMore: false },
  };
  if (!token) return empty;

  try {
    const url = new URL(
      buildUrl(API_BASE_URL, `/organizations/${orgId}/join-requests`),
    );
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return empty;
    return (await res.json()) as PaginatedJoinRequestsResponse;
  } catch {
    return empty;
  }
}

/** Accepter ou rejeter une demande d'adhésion. */
export async function handleJoinRequest(
  orgId: string,
  requestId: string,
  decision: "accepted" | "rejected",
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(
      buildUrl(API_BASE_URL, `/organizations/${orgId}/join-requests/${requestId}`),
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision }),
      },
    );
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec du traitement." };
  }
}

// ── Organization Update / Archive ────────────────────────────

export type UpdateOrgInput = {
  name?: string;
  domain?: string;
  country?: string;
  sector?: string;
  bio?: string;
  emailContact?: string;
  // siteWeb?: string;
  visibility?: "public" | "internal";
};

/** Mettre à jour les infos d'une organisation. */
export async function updateOrganization(
  orgId: string,
  input: UpdateOrgInput,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}`), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de la mise à jour." };
  }
}

/** Archiver une organisation (owner uniquement). */
export async function archiveOrganization(
  orgId: string,
): Promise<JoinRequestResult> {
  const token = await getToken();
  if (!token) return { success: false, error: "Non authentifié." };

  try {
    const res = await fetch(buildUrl(API_BASE_URL, `/organizations/${orgId}/archive`), {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message ?? `Erreur (${res.status})` };
    }
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Échec de l'archivage." };
  }
}
