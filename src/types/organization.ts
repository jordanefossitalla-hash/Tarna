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

export type DetailedOrganizationResponse = {
    id: string;
    name: string;
    domain: string | null;
    country: string | null;
    sector: string | null;
    bio: string | null;
    logoUrl: string | null;
    bannerUrl: string | null;
    emailContact: string | null;
    siteWeb: string | null;
    visibility: "public" | "internal";
    status: "active" | "archived";
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator: {
        id: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
    };
    _count: {
        memberships: number;
        posts: number;
    };
    /** Role of the current user in the organization, null if not a member */
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

/** Shape d'un membre retourné par GET /organizations/:orgId/members */
export type OrgMember = {
  id: string;
  role: OrgRole;
  status: string;
  joinedAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
  };
};

export type PaginatedMembersResponse = {
  data: OrgMember[];
  meta: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
};

/** Shape d'une demande d'adhésion */
export type OrgJoinRequest = {
  id: string;
  status: string;
  joinedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
  };
};

export type PaginatedJoinRequestsResponse = {
  data: OrgJoinRequest[];
  meta: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
};
