"use server";
import type {
  OrganizationResponse,
  PaginatedOrgResponse,
} from "@/src/types/organization";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL ?? "https://localhost";

type CreateOrgInput = {
  name: string;
  domain: string;
  country: string;
  sector: string;
  bio: string;
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

  const url = new URL(`${API_BASE_URL}${path}`);
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
    const res = await fetch(`${API_BASE_URL}/organizations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
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
    const res = await fetch(`${API_BASE_URL}/organizations/${orgId}/join`, {
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
    const res = await fetch(`${API_BASE_URL}/organizations/${orgId}/join`, {
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
