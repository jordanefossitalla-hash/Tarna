import { create } from "zustand";
import type {
  OrganizationResponse,
  PaginatedOrgResponse,
} from "../types/organization";

type TabKey = "my-orgs" | "discover" | "pending";

type TabState = {
  data: OrganizationResponse[];
  nextCursor: string | null;
  hasMore: boolean;
  loaded: boolean;
};

function emptyTab(): TabState {
  return { data: [], nextCursor: null, hasMore: false, loaded: false };
}

type OrganizationState = {
  tabs: Record<TabKey, TabState>;
  loading: boolean;
  error: string | null;

  // ── Actions ────────────────────────────────────────────────

  /** Remplace les données d'un onglet (fetch initial). */
  setTab: (tab: TabKey, page: PaginatedOrgResponse) => void;

  /** Ajoute des données à un onglet (pagination / infinite scroll). */
  appendTab: (tab: TabKey, page: PaginatedOrgResponse) => void;

  /** Ajoute une organisation en tête d'un onglet (création / WS). */
  addOrg: (tab: TabKey, org: OrganizationResponse) => void;

  /** Retire une organisation d'un onglet. */
  removeOrg: (tab: TabKey, orgId: string) => void;

  /** Met à jour partiellement une organisation dans tous les onglets. */
  updateOrg: (orgId: string, data: Partial<OrganizationResponse>) => void;

  /** Déplace une org d'un onglet à un autre (ex: pending → my-orgs). */
  moveOrg: (from: TabKey, to: TabKey, orgId: string) => void;

  /** Marque un onglet comme non chargé (force un refresh). */
  invalidateTab: (tab: TabKey) => void;

  /** Réinitialise tout le store. */
  reset: () => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const initialTabs: Record<TabKey, TabState> = {
  "my-orgs": emptyTab(),
  discover: emptyTab(),
  pending: emptyTab(),
};

export const useOrganizationStore = create<OrganizationState>()((set) => ({
  tabs: { ...initialTabs },
  loading: false,
  error: null,

  // ── Setters ────────────────────────────────────────────────

  setTab: (tab, page) =>
    set((state) => ({
      tabs: {
        ...state.tabs,
        [tab]: {
          data: page.data,
          nextCursor: page.meta.nextCursor,
          hasMore: page.meta.hasMore,
          loaded: true,
        },
      },
      error: null,
    })),

  appendTab: (tab, page) =>
    set((state) => {
      const existing = state.tabs[tab];
      const existingIds = new Set(existing.data.map((o) => o.id));
      const unique = page.data.filter((o) => !existingIds.has(o.id));
      return {
        tabs: {
          ...state.tabs,
          [tab]: {
            data: [...existing.data, ...unique],
            nextCursor: page.meta.nextCursor,
            hasMore: page.meta.hasMore,
            loaded: true,
          },
        },
      };
    }),

  addOrg: (tab, org) =>
    set((state) => {
      const existing = state.tabs[tab];
      if (existing.data.some((o) => o.id === org.id)) return state;
      return {
        tabs: {
          ...state.tabs,
          [tab]: { ...existing, data: [org, ...existing.data] },
        },
      };
    }),

  removeOrg: (tab, orgId) =>
    set((state) => {
      const existing = state.tabs[tab];
      return {
        tabs: {
          ...state.tabs,
          [tab]: {
            ...existing,
            data: existing.data.filter((o) => o.id !== orgId),
          },
        },
      };
    }),

  updateOrg: (orgId, data) =>
    set((state) => {
      const updatedTabs = { ...state.tabs };
      for (const key of Object.keys(updatedTabs) as TabKey[]) {
        const tab = updatedTabs[key];
        if (tab.data.some((o) => o.id === orgId)) {
          updatedTabs[key] = {
            ...tab,
            data: tab.data.map((o) =>
              o.id === orgId ? { ...o, ...data } : o,
            ),
          };
        }
      }
      return { tabs: updatedTabs };
    }),

  moveOrg: (from, to, orgId) =>
    set((state) => {
      const fromTab = state.tabs[from];
      const toTab = state.tabs[to];
      const org = fromTab.data.find((o) => o.id === orgId);
      if (!org) return state;
      return {
        tabs: {
          ...state.tabs,
          [from]: {
            ...fromTab,
            data: fromTab.data.filter((o) => o.id !== orgId),
          },
          [to]: {
            ...toTab,
            data: [org, ...toTab.data.filter((o) => o.id !== orgId)],
          },
        },
      };
    }),

  invalidateTab: (tab) =>
    set((state) => ({
      tabs: {
        ...state.tabs,
        [tab]: { ...state.tabs[tab], loaded: false },
      },
    })),

  reset: () => set({ tabs: { ...initialTabs }, loading: false, error: null }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
