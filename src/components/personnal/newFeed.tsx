"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Clock9, Sparkle } from "lucide-react";
import FeedItem from "./ui/feedItem";
import { PostsData } from "@/src/data/posts";
import { useState } from "react";

const NewFeed = () => {
  const [postStatus, setPostStatus] = useState<string>("for you");
  return (
    <div className="flex flex-col gap-2">
        {/* Feed action  */}
      <Card className="p-2 bg-accent flex flex-row gap-2 lg:max-w-2xl w-full rounded-md">
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant={postStatus === "for you" ? "outline" : "ghost"}
            onClick={() => setPostStatus("for you")}
          >
            <Sparkle />
            For you
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant={postStatus === "recent" ? "outline" : "ghost"}
            onClick={() => setPostStatus("recent")}
          >
            <Clock9 />
            Recent
          </Button>
        </div>
      </Card>
      {/* Feed listing  */}
      {
        (postStatus === "recent"
          ? PostsData
              .filter((post) => {
                const postDate = new Date(post.createdAt);
                const now = new Date();
                const diffMs = now.getTime() - postDate.getTime();
                return diffMs <= 24 * 60 * 60 * 1000; // dernières 24h
              })
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          : PostsData
        ).map((post, index) => {
            return <FeedItem key={index} post={post} />
        })
      }
    </div>
  );
};

export default NewFeed;
