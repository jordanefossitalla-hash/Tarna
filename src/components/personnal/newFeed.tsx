"use client";
import { Button } from "../ui/button";
import { Clock9, Loader2, Sparkles } from "lucide-react";
import { Spinner } from "../ui/spinner";
import FeedItem from "./ui/feedItem";
import { useUserStore } from "@/src/store/userStore";
import { useFeedStore } from "@/src/store/feedStore";
import { useSocketEvent } from "@/src/hooks/useSocketEvent";
import { mapRawPost } from "@/src/lib/mapPost";
import {
  fetchPostsAction,
  type FeedState,
} from "@/app/(Client)/home/actions";
import { useState, useMemo, useEffect, useRef, useActionState, useCallback } from "react";
import { Post } from "@/src/types/post";

type FeedFilter = "for-you" | "recent";

const initialState: FeedState = { posts: [], error: null, nextCursor: null, hasMore: false };

const NewFeed = ({firstPost} : {firstPost: Post[]}) => {
  const accessToken = useUserStore((s) => s.accessToken);
  const formRef = useRef<HTMLFormElement>(null);
  const loadMoreFormRef = useRef<HTMLFormElement>(null);
  const [filter, setFilter] = useState<FeedFilter>("for-you");
  const [now, setNow] = useState(() => Date.now());

  // ── Feed store ──
  const feedPosts = useFeedStore((s) => s.posts);
  const setPosts = useFeedStore((s) => s.setPosts);
  const appendPosts = useFeedStore((s) => s.appendPosts);
  const addPost = useFeedStore((s) => s.addPost);
  const removePost = useFeedStore((s) => s.removePost);
  const nextCursor = useFeedStore((s) => s.nextCursor);
  const hasMore = useFeedStore((s) => s.hasMore);

  const [state, formAction, isPending] = useActionState(fetchPostsAction, initialState);
  const [loadMoreState, loadMoreAction, isLoadingMore] = useActionState(fetchPostsAction, initialState);

  // Auto-submit au montage pour charger les posts
  // useEffect(() => {
  //   formRef.current?.requestSubmit();
  // }, [accessToken]);

  // Quand le fetch initial arrive, remplacer les posts
  useEffect(() => {
    if (state.posts.length > 0 || state.error === null) {
      setPosts(state.posts, state.nextCursor, state.hasMore);
    }
  }, [state, setPosts]);

  // Premier chargement au montage
  useEffect(() => {
    if (firstPost.length > 0) {
      setPosts(firstPost, null, false);
    }
  }, [firstPost, setPosts]);

  // Quand le loadMore arrive, ajouter les posts
  useEffect(() => {
    if (loadMoreState.posts.length > 0) {
      appendPosts(loadMoreState.posts, loadMoreState.nextCursor, loadMoreState.hasMore);
    }
  }, [loadMoreState, appendPosts]);

  // ── WebSocket : nouveau post d'un utilisateur suivi (ou soi-même) ──
  const handleNewPost = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawPost: any) => {
      const post = mapRawPost(rawPost);
      addPost(post);
    },
    [addPost],
  );

  useSocketEvent("post:new", handleNewPost);

  // ── WebSocket : post supprimé ──
  const handleDeletedPost = useCallback(
    (data: { postId: string }) => {
      removePost(data.postId);
    },
    [removePost],
  );

  useSocketEvent("post:deleted", handleDeletedPost);

  // Filtre appliqué sur les posts du store
  const posts = useMemo(() => {
    if (filter === "recent") {
      return feedPosts
        .filter((post) => {
          const diffMs = now - new Date(post.createdAt).getTime();
          return diffMs <= 24 * 60 * 60 * 1000;
        })
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
    return feedPosts;
  }, [filter, feedPosts, now]);

  return (
    <div className="flex flex-col gap-3">
      {/* Formulaire caché — fetch initial */}
      <form ref={formRef} action={formAction} className="hidden">
        <input type="hidden" name="token" value={accessToken ?? ""} />
      </form>

      {/* Formulaire caché — charger plus */}
      <form ref={loadMoreFormRef} action={loadMoreAction} className="hidden">
        <input type="hidden" name="token" value={accessToken ?? ""} />
        <input type="hidden" name="cursor" value={nextCursor ?? ""} />
      </form>

      {/* ─── Filtres ─── */}
      <div className="flex flex-row gap-2">
        <Button
          variant={filter === "for-you" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer gap-1.5 rounded-full"
          onClick={() => setFilter("for-you")}
        >
          <Sparkles className="size-3.5" />
          Pour vous
        </Button>
        <Button
          variant={filter === "recent" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer gap-1.5 rounded-full"
          onClick={() => { setFilter("recent"); setNow(Date.now()); }}
        >
          <Clock9 className="size-3.5" />
          Récents
        </Button>
      </div>

      {/* ─── Contenu ─── */}
      {isPending ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
          <Clock9 className="size-10 opacity-30" />
          <p className="text-sm">
            {filter === "recent"
              ? "Aucun post dans les dernières 24h."
              : "Aucun post pour le moment."}
          </p>
          {filter === "recent" && (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer mt-1"
              onClick={() => setFilter("for-you")}
            >
              Voir tous les posts
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <FeedItem key={post.id} post={post} />
          ))}

          {/* Bouton charger plus */}
          {hasMore && filter === "for-you" && (
            <div className="flex justify-center py-4">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-2"
                onClick={() => loadMoreFormRef.current?.requestSubmit()}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                {isLoadingMore ? "Chargement..." : "Charger plus"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewFeed;
