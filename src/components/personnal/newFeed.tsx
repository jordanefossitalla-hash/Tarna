"use client";
import { Button } from "../ui/button";
import { Clock9, Sparkles } from "lucide-react";
import FeedItem from "./ui/feedItem";
import { PostsData } from "@/src/data/posts";
import { useState, useMemo } from "react";

type FeedFilter = "for-you" | "recent";

const NewFeed = () => {
  const [filter, setFilter] = useState<FeedFilter>("for-you");

  const posts = useMemo(() => {
    if (filter === "recent") {
      return PostsData.filter((post) => {
        const diffMs = Date.now() - new Date(post.createdAt).getTime();
        return diffMs <= 24 * 60 * 60 * 1000;
      }).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return PostsData;
  }, [filter]);

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

      {/* ─── Posts ─── */}
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
          {posts.map((post) => (
            <FeedItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewFeed;
