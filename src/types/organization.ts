export type OrgRole = "owner" | "admin" | "manager" | "member" | "guest";

export type OrgStatus = "active" | "archived";

/**
 * Shape renvoyée par GET /organizations/mine, /discover, /pending.
 * Correspond au select `orgPreview` du backend.
 */
export type OrganizationResponse = {
  id: string;
  name: string;
  domain: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  sector: string;
  country: string;
  bio: string | null;
  siteWeb: string;
  visibility: string;
  status: string;
  createdAt: string;
  _count: {
    memberships: number;
    posts: number;
  };
  /** Présent uniquement dans /mine */
  currentUserRole?: OrgRole | null;
};

/** Réponse paginée commune */
export type PaginatedOrgResponse = {
  data: OrganizationResponse[];
  meta: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
};
