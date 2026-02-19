"use client";
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  Ellipsis,
  FileText,
  Flag,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircle,
  Pin,
  Share2,
  Send,
  User,
  UserPlus,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState } from "react";
import { Post } from "@/src/types/post";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useUserStore } from "@/src/store/userStore";

type ReactionType = "" | "heart" | "light" | "handshake";

const FeedItem = ({ post }: { post: Post }) => {
  const [reaction, setReaction] = useState<ReactionType>("");
  const [saved, setSaved] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((state) => state.user);

  const toggleReaction = (type: ReactionType) => {
    if (!isAuthenticated) return;
    setReaction((prev) => (prev === type ? "" : type));
  };

  const commentCount = commentsData[post.id]?.length || 0;
  const images = post.media.filter((m) => m.type === "image");
  const documents = post.media.filter((m) => m.type === "document");

  return (
    <Collapsible asChild>
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* ─── Header ─── */}
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="text-xs font-semibold">
                {post.author.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-1.5">
                <p className="text-sm font-semibold">{post.author.name}</p>
                {post.author.isVerified && (
                  <BadgeCheck className="size-3.5 text-primary" />
                )}
                {post.isPinned && (
                  <Pin className="size-3 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {post.author.username} · {post.timeAgo}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <Ellipsis className="size-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <User className="size-4" /> Voir le profil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <UserPlus className="size-4" /> Suivre
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => setSaved(!saved)}
                >
                  <Bookmark className="size-4" />
                  {saved ? "Retirer des favoris" : "Enregistrer"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <EyeOff className="size-4" /> Masquer
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                  <Flag className="size-4" /> Signaler
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        {/* ─── Content ─── */}
        <CardContent className="pb-2 pt-0">
          {/* Texte */}
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Images */}
          {images.length > 0 && (
            <div
              className={`grid gap-1.5 mt-3 rounded-xl overflow-hidden ${
                images.length === 1
                  ? "grid-cols-1"
                  : images.length === 3
                    ? "grid-cols-2"
                    : "grid-cols-2"
              }`}
            >
              {images.map((media, index) => {
                const isFullWidth =
                  images.length === 1 ||
                  (images.length === 3 && index === 0);
                return (
                  <div
                    key={media.id}
                    className={`relative overflow-hidden bg-muted ${
                      isFullWidth
                        ? "col-span-2 h-52 lg:h-80"
                        : "h-36 lg:h-52"
                    } ${images.length === 1 ? "col-span-1 rounded-xl" : ""}`}
                  >
                    <Image
                      src={media.url}
                      alt={media.alt || "post image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                    {/* Overlay pour +N images */}
                    {images.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
                        <span className="text-white text-xl font-bold">
                          +{images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div className="flex flex-col gap-2 mt-3">
              {documents.map((media) => (
                <div
                  key={media.id}
                  className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 shrink-0">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {media.fileName || "Document"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {media.fileExtension?.toUpperCase()}
                      {media.fileSize &&
                        ` · ${(media.fileSize / 1024).toFixed(0)} Ko`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {/* ─── Reactions Footer ─── */}
        <CardFooter className="flex flex-row items-center justify-between pt-1 pb-2">
          {/* Réactions */}
          <div className="flex flex-row items-center gap-1">
            <button
              className={`flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                reaction === "heart"
                  ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                  : "hover:bg-accent text-muted-foreground"
              }`}
              onClick={() => toggleReaction("heart")}
            >
              <Heart
                className="size-4"
                fill={reaction === "heart" ? "currentColor" : "none"}
              />
              <span className="font-medium">
                {reaction === "heart"
                  ? post.reactions.heart + 1
                  : post.reactions.heart}
              </span>
            </button>

            <button
              className={`flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                reaction === "light"
                  ? "bg-amber-100 text-amber-500 dark:bg-amber-900/30"
                  : "hover:bg-accent text-muted-foreground"
              }`}
              onClick={() => toggleReaction("light")}
            >
              <Lightbulb
                className="size-4"
                fill={reaction === "light" ? "currentColor" : "none"}
              />
              <span className="font-medium">
                {reaction === "light"
                  ? post.reactions.lightbulb + 1
                  : post.reactions.lightbulb}
              </span>
            </button>

            <button
              className={`flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                reaction === "handshake"
                  ? "bg-blue-100 text-blue-500 dark:bg-blue-900/30"
                  : "hover:bg-accent text-muted-foreground"
              }`}
              onClick={() => toggleReaction("handshake")}
            >
              <Handshake
                className="size-4"
                fill={reaction === "handshake" ? "currentColor" : "none"}
              />
              <span className="font-medium">
                {reaction === "handshake"
                  ? post.reactions.handshake + 1
                  : post.reactions.handshake}
              </span>
            </button>
          </div>

          {/* Commentaires + Partage + Enregistrer */}
          <div className="flex flex-row items-center gap-1">
            {isAuthenticated ? (
              <CollapsibleTrigger asChild>
                <button className="flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground hover:bg-accent transition-colors cursor-pointer">
                  <MessageCircle className="size-4" />
                  <span className="font-medium">{commentCount}</span>
                  <ChevronDown className="size-3.5" />
                </button>
              </CollapsibleTrigger>
            ) : (
              <div className="flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground">
                <MessageCircle className="size-4" />
                <span className="font-medium">{commentCount}</span>
              </div>
            )}

            {/* <button className="p-1.5 rounded-full text-muted-foreground hover:bg-accent transition-colors cursor-pointer">
              <Share2 className="size-4" />
            </button> */}

            {/* <button
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                saved
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent"
              }`}
              onClick={() => isAuthenticated && setSaved(!saved)}
            >
              <Bookmark
                className="size-4"
                fill={saved ? "currentColor" : "none"}
              />
            </button> */}
          </div>
        </CardFooter>

        {/* ─── Comments Section ─── */}
        <CollapsibleContent className="border-t">
          <div className="flex flex-col gap-3 px-4 py-3">
            {/* Écrire un commentaire */}
            <div className="flex flex-row items-center gap-2.5">
              <Avatar className="size-8 shrink-0">
                <AvatarImage
                  src={currentUser?.avatar_url || ""}
                  alt="vous"
                />
                <AvatarFallback className="text-[10px] font-semibold">
                  {currentUser?.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-row items-center gap-1 border rounded-full px-3 py-1 w-full">
                <Input
                  placeholder="Écrire un commentaire..."
                  className="border-0 h-7 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6 cursor-pointer"
                >
                  <Send className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Liste des commentaires */}
            {(commentsData[post.id] || []).map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FeedItem;
