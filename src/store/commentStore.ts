import { create } from "zustand";
import { Comment } from "../types/post";

type CommentState = {
  /** Commentaires plats indexés par postId */
  commentsByPost: Record<string, Comment[]>;
  /** Posts dont les commentaires sont en cours de chargement */
  loadingPosts: Record<string, boolean>;

  // ── Actions ──────────────────────────────────────────────────
  /** Remplace tous les commentaires d'un post (après fetch) */
  setComments: (postId: string, comments: Comment[]) => void;
  /** Ajoute un commentaire (création locale / WS) — dédupliqué */
  addComment: (postId: string, comment: Comment) => void;
  /** Retire un commentaire */
  removeComment: (postId: string, commentId: string) => void;
  /** Marque le chargement d'un post */
  setLoading: (postId: string, loading: boolean) => void;
};

export const useCommentStore = create<CommentState>()((set) => ({
  commentsByPost: {},
  loadingPosts: {},

  setComments: (postId, comments) =>
    set((state) => ({
      commentsByPost: { ...state.commentsByPost, [postId]: comments },
    })),

  addComment: (postId, comment) =>
    set((state) => {
      const existing = state.commentsByPost[postId] ?? [];
      // Dédupliquer
      if (existing.some((c) => c.id === comment.id)) return state;
      return {
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: [...existing, comment],
        },
      };
    }),

  removeComment: (postId, commentId) =>
    set((state) => {
      const existing = state.commentsByPost[postId] ?? [];
      return {
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: existing.filter((c) => c.id !== commentId),
        },
      };
    }),

  setLoading: (postId, loading) =>
    set((state) => ({
      loadingPosts: { ...state.loadingPosts, [postId]: loading },
    })),
}));
