"use client";
import {
  BadgeCheck,
  ChevronDown,
  Ellipsis,
  FileText,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircle,
  Pin,
  Share2,
  TriangleAlert,
  User,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState } from "react";
import { Post, Media } from "@/src/types/post";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import CommentItem from "./commentItem";
import { commentsData } from "@/src/data/comments";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useUserStore } from "@/src/store/userStore";

const FeedItem = ({ post }: { post: Post }) => {
  const [isLikedType, setIsLikedType] = useState<string>("");
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <Collapsible asChild>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2.5">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt="profil" />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <p className="font-bold">{post.author.name}</p>
                <div className="flex flex-row items-center gap-1.5">
                  {post.author.isVerified && (
                    <BadgeCheck className="size-3" color="#1549e6" />
                  )}
                  <Pin className="size-3" />
                </div>
              </div>
              <p className="text-[12px] text-gray-500">
                {post.author.username} . {post.timeAgo}
              </p>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="size-4" /> View profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <TriangleAlert className="size-4" /> Report post
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-justify text-[15px]">{post.content}</p>

            {/* Images */}
            {post.media.filter((m) => m.type === "image").length > 0 && (
              <div
                className={`grid gap-2 ${
                  post.media.filter((m) => m.type === "image").length === 1
                    ? "grid-cols-1"
                    : post.media.filter((m) => m.type === "image").length === 2
                      ? "grid-cols-2"
                      : post.media.filter((m) => m.type === "image").length ===
                          3
                        ? "grid-cols-2"
                        : "grid-cols-2"
                }`}
              >
                {post.media
                  .filter((m) => m.type === "image")
                  .map((media, index) => {
                    const imageCount = post.media.filter(
                      (m) => m.type === "image",
                    ).length;
                    const isFullWidth =
                      imageCount === 1 || (imageCount === 3 && index === 0);
                    return (
                      <div
                        key={media.id}
                        className={`bg-gray-400 rounded-2xl overflow-hidden ${
                          isFullWidth
                            ? "col-span-2 h-50 lg:h-100"
                            : "h-40 lg:h-60"
                        } ${imageCount === 1 ? "col-span-1" : ""}`}
                      >
                        <Image
                          src={media.url}
                          alt={media.alt || "post image"}
                          width={600}
                          height={400}
                          className="rounded-2xl w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Documents */}
            {post.media.filter((m) => m.type === "document").length > 0 && (
              <div className="flex flex-col gap-2">
                {post.media
                  .filter((m) => m.type === "document")
                  .map((media) => (
                    <div
                      key={media.id}
                      rel="noopener noreferrer"
                      className="flex flex-row items-center gap-3 p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700">
                        <FileText className="size-5 text-blue-400" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {media.fileName || "Document"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {media.fileExtension?.toUpperCase()}
                          {media.fileSize &&
                            ` · ${(media.fileSize / 1024).toFixed(0)} Ko`}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() => {
                isAuthenticated && setIsLikedType("heart");
              }}
            >
              <Heart
                className="size-5"
                color={isLikedType === "heart" ? "red" : "white"}
              />
              <p>
                {isLikedType === "heart"
                  ? post.reactions.heart + 1
                  : post.reactions.heart}
              </p>
            </div>
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={() => {
                isAuthenticated && setIsLikedType("light");
              }}
            >
              <Lightbulb
                className="size-5"
                color={isLikedType === "light" ? "yellow" : "white"}
              />
              <p>
                {isLikedType === "light"
                  ? post.reactions.lightbulb + 1
                  : post.reactions.lightbulb}
              </p>
            </div>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() => {
                isAuthenticated && setIsLikedType("handshake");
              }}
            >
              <Handshake
                className="size-5"
                color={isLikedType === "handshake" ? "blue" : "white"}
              />
              <p>
                {isLikedType === "handshake"
                  ? post.reactions.handshake + 1
                  : post.reactions.handshake}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            {isAuthenticated ? (
              <CollapsibleTrigger asChild>
                <div className="flex flex-row items-center gap-0.5 cursor-pointer">
                  <MessageCircle className="size-5" />
                  <p>{commentsData[post.id]?.length || 0}</p>
                  <ChevronDown className="size-5" />
                </div>
              </CollapsibleTrigger>
            ) : (
              <div className="flex flex-row items-center gap-0.5 cursor-pointer">
                <MessageCircle className="size-5" />
                <p>{commentsData[post.id]?.length || 0}</p>
                <ChevronDown className="size-5" />
              </div>
            )}

            {/* <div className="flex flex-row items-center gap-2 cursor-pointer">
              <Share2 className="size-5" />
            </div> */}
          </div>
        </CardFooter>
        <CollapsibleContent className="flex flex-col gap-3 px-4 pb-4">
          {/* Write a comment */}
          <div className="flex flex-row items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="you" />
              <AvatarFallback className="text-xs">ME</AvatarFallback>
            </Avatar>
            <div className="flex flex-row items-center gap-1 border rounded-full px-3 py-1 w-full">
              <Input
                placeholder="Write a comment..."
                className="border-0 h-7 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 p-0"
              />
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-6 cursor-pointer"
              >
                <Send className="size-3" />
              </Button>
            </div>
          </div>
          {/* Comments list */}
          {(commentsData[post.id] || []).map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FeedItem;
