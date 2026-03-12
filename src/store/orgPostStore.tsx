import { create } from "zustand";
import { Post } from "../types/post";

type FeedState = {
  /** Posts du feed (réaltime + serveur, fusionnés) */
  posts: Post[];
  /** Chargement en cours */
  loading: boolean;
  /** Message d'erreur éventuel */
  error: string | null;
  /** Curseur pour la page suivante */
  nextCursor: string | null;
  /** Il reste des posts à charger */
  hasMore: boolean;

  // ── Actions ──────────────────────────────────────────────────
  /** Remplace tous les posts (après fetch initial) */
  setPosts: (posts: Post[], nextCursor?: string | null, hasMore?: boolean) => void;
  /** Ajoute des posts en fin de liste (pagination) — dédupliqués */
  appendPosts: (posts: Post[], nextCursor?: string | null, hasMore?: boolean) => void;
  /** Ajoute un post en tête (nouveau post / WS) — dédupliqué */
  addPost: (post: Post) => void;
  /** Retire un post par id (suppression locale / WS) */
  removePost: (postId: string) => void;
  /** Met à jour partiellement un post existant */
  updatePost: (postId: string, data: Partial<Post>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useOrgPostStore = create<FeedState>()((set) => ({
  posts: [],
  loading: false,
  error: null,
  nextCursor: null,
  hasMore: false,

  setPosts: (posts, nextCursor = null, hasMore = false) =>
    set({ posts, error: null, nextCursor, hasMore }),

  appendPosts: (newPosts, nextCursor = null, hasMore = false) =>
    set((state) => {
      const existingIds = new Set(state.posts.map((p) => p.id));
      const unique = newPosts.filter((p) => !existingIds.has(p.id));
      return { posts: [...state.posts, ...unique], nextCursor, hasMore };
    }),

  addPost: (post) =>
    set((state) => {
      // Éviter les doublons
      if (state.posts.some((p) => p.id === post.id)) return state;
      return { posts: [post, ...state.posts] };
    }),

  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
    })),

  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, ...data } : p,
      ),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
