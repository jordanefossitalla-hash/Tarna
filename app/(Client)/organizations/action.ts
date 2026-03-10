"use server";
import type {
  OrganizationResponse,
  PaginatedOrgResponse,
} from "@/src/types/organization";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL ?? "https://localhost";

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

/** Invitations en attente. */
export async function fetchPendingOrgs(
  cursor?: string | null,
): Promise<PaginatedOrgResponse> {
  return fetchOrgs("/organizations/pending", cursor);
}
