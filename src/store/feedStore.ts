import { create } from "zustand";
import { Post } from "../types/post";

type FeedState = {
  /** Posts du feed (réaltime + serveur, fusionnés) */
  posts: Post[];
  /** Chargement en cours */
  loading: boolean;
  /** Message d'erreur éventuel */
  error: string | null;

  // ── Actions ──────────────────────────────────────────────────
  /** Remplace tous les posts (après fetch initial) */
  setPosts: (posts: Post[]) => void;
  /** Ajoute un post en tête (nouveau post / WS) — dédupliqué */
  addPost: (post: Post) => void;
  /** Retire un post par id (suppression locale / WS) */
  removePost: (postId: string) => void;
  /** Met à jour partiellement un post existant */
  updatePost: (postId: string, data: Partial<Post>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useFeedStore = create<FeedState>()((set) => ({
  posts: [],
  loading: false,
  error: null,

  setPosts: (posts) => set({ posts, error: null }),

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
