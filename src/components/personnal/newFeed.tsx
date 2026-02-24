"use client";
import { Button } from "../ui/button";
import { Clock9, Sparkles } from "lucide-react";
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

type FeedFilter = "for-you" | "recent";

const initialState: FeedState = { posts: [], error: null };

const NewFeed = () => {
  const accessToken = useUserStore((s) => s.accessToken);
  const formRef = useRef<HTMLFormElement>(null);
  const [filter, setFilter] = useState<FeedFilter>("for-you");

  // ── Feed store ──
  const feedPosts = useFeedStore((s) => s.posts);
  const setPosts = useFeedStore((s) => s.setPosts);
  const addPost = useFeedStore((s) => s.addPost);
  const removePost = useFeedStore((s) => s.removePost);

  // Auto-submit au montage pour charger les posts
  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [accessToken]);

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
          const diffMs = Date.now() - new Date(post.createdAt).getTime();
          return diffMs <= 24 * 60 * 60 * 1000;
        })
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
    return feedPosts;
  }, [filter, feedPosts]);

  return (
    <div className="flex flex-col gap-3">
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
          onClick={() => setFilter("recent")}
        >
          <Clock9 className="size-3.5" />
          Récents
        </Button>
      </div>

      {/* ─── Contenu ─── */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
          <Clock9 className="size-10 opacity-30" />
          <p className="text-sm">Aucun post récent dans les dernières 24h.</p>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer mt-1"
            onClick={() => setFilter("for-you")}
          >
            Voir tous les posts
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts?.map((post) => (
            <FeedItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewFeed;
