"use client";
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  Ellipsis,
  FileText,
  Handshake,
  Heart,
  Lightbulb,
  Loader2,
  MessageCircle,
  Pin,
  Send,
  User,
  UserCheck,
  UserPlus,
  EyeOff,
  Trash,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Post } from "@/src/types/post";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import CommentItem from "./commentItem";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useUserStore } from "@/src/store/userStore";
import { Media, Comment } from "@/src/types/post";
import {
  followUser,
  unfollowUser,
  checkIsFollowing,
  deletePost,
  fetchComments,
  createComment,
} from "@/src/lib/api";
import { useFeedStore } from "@/src/store/feedStore";
import { useCommentStore } from "@/src/store/commentStore";
import {
  mapRawComment,
  flattenRawComments,
  buildCommentTree,
} from "@/src/lib/mapComment";
import { Spinner } from "../../ui/spinner";
import { toast } from "sonner";

type ReactionType = "" | "heart" | "light" | "handshake";

const FeedItem = ({ post }: { post: Post }) => {
  const [reaction, setReaction] = useState<ReactionType>("");
  const [saved, setSaved] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Media | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentSending, setCommentSending] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const removePost = useFeedStore((s) => s.removePost);

  // ── Comment store ──
  const EMPTY: Comment[] = useMemo(() => [], []);
  const flatComments =
    useCommentStore((s) => s.commentsByPost[post.id]) ?? EMPTY;
  const commentsLoading =
    useCommentStore((s) => s.loadingPosts[post.id]) ?? false;
  const setComments = useCommentStore((s) => s.setComments);
  const addComment = useCommentStore((s) => s.addComment);
  const setCommentsLoading = useCommentStore((s) => s.setLoading);

  // Arbre de commentaires (3 niveaux)
  const commentTree = useMemo(
    () => buildCommentTree(flatComments),
    [flatComments],
  );

  const isOwnPost = currentUser?.id === post.authorId;

  // ── Charger les commentaires à la première ouverture ──
  const hasFetchedComments = useRef(false);

  useEffect(() => {
    if (!commentsOpen || !accessToken || hasFetchedComments.current) return;

    hasFetchedComments.current = true;
    setCommentsLoading(post.id, true);

    fetchComments(post.id, accessToken)
      .then(async (res) => {
        if (!res.ok) return;
        const json = await res.json();
        const raw = Array.isArray(json)
          ? json
          : (json.data ?? json.comments ?? []);
        const mapped = flattenRawComments(raw);
        setComments(post.id, mapped);
      })
      .catch(() => {})
      .finally(() => {
        setCommentsLoading(post.id, false);
      });
  }, [commentsOpen, accessToken, post.id, setComments, setCommentsLoading]);

  // ── Envoyer un commentaire racine ──
  const handleSendComment = useCallback(async () => {
    if (!commentText.trim() || commentSending || !accessToken) return;
    setCommentSending(true);
    try {
      const res = await createComment(
        {
          postId: post.id,
          authorId: currentUser?.id || "",
          contentText: commentText.trim(),
        },
        accessToken,
      );
      if (res.ok) {
        const data = await res.json();
        const mapped = mapRawComment(data);
        addComment(post.id, mapped);
        setCommentText("");
      } else {
        toast.error("Échec de l'envoi du commentaire");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setCommentSending(false);
    }
  }, [commentText, commentSending, accessToken, post.id, addComment, currentUser?.id]);

  // Vérifie le statut de follow au montage
  useEffect(() => {
    if (!isAuthenticated || !post.authorId || isOwnPost) return;
    checkIsFollowing(post.authorId, accessToken)
      .then(setIsFollowing)
      .catch(() => {});
  }, [isAuthenticated, post.authorId, accessToken, isOwnPost]);

  const handleFollow = useCallback(async () => {
    if (!isAuthenticated || !post.authorId || followLoading) return;
    setFollowLoading(true);
    try {
      if (isFollowing) {
        const res = await unfollowUser(post.authorId, accessToken);
        if (res.ok) setIsFollowing(false);
      } else {
        const res = await followUser(post.authorId, accessToken);
        if (res.ok) setIsFollowing(true);
      }
    } catch {
      // silently fail
    } finally {
      setFollowLoading(false);
    }
  }, [isAuthenticated, post.authorId, accessToken, isFollowing, followLoading]);

  const handleDelete = useCallback(async () => {
    if (!isAuthenticated || deleteLoading) return;
    setDeleteLoading(true);
    try {
      const res = await deletePost(post.id, accessToken);
      if (res.ok) {
        removePost(post.id);
      }
    } catch {
      // silently fail
    } finally {
      setDeleteLoading(false);
      setConfirmDelete(false);
    }
  }, [isAuthenticated, post.id, accessToken, deleteLoading, removePost]);

  const toggleReaction = (type: ReactionType) => {
    if (!isAuthenticated) return;
    setReaction((prev) => (prev === type ? "" : type));
  };

  return (
    <Collapsible asChild open={commentsOpen} onOpenChange={setCommentsOpen}>
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

            {/* Bouton Follow — directement après les infos auteur */}
            {isAuthenticated && !isOwnPost && post.authorId && (
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                className="h-7 px-3 rounded-full text-xs gap-1.5 cursor-pointer ml-1"
                onClick={handleFollow}
                disabled={followLoading}
              >
                {followLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : isFollowing ? (
                  <UserCheck className="size-3.5" />
                ) : (
                  <UserPlus className="size-3.5" />
                )}
                {isFollowing ? "Suivi" : "Suivre"}
              </Button>
            )}
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
                {isOwnPost ? (
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <Pin className="size-4" />{" "}
                    {post.isPinned ? "Détacher" : "Épingler"}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={handleFollow}
                  >
                    {isFollowing ? (
                      <UserCheck className="size-4" />
                    ) : (
                      <UserPlus className="size-4" />
                    )}
                    {isFollowing ? "Ne plus suivre" : "Suivre"}
                  </DropdownMenuItem>
                )}
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
                <DropdownMenuItem
                  onClick={() => {}}
                  className="cursor-pointer gap-2"
                >
                  <EyeOff className="size-4" /> Masquer
                </DropdownMenuItem>
                {isOwnPost && (
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                    onClick={() => setConfirmDelete(true)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash className="size-4" />
                    )}
                    Supprimer
                  </DropdownMenuItem>
                )}
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
          {post.images?.length > 0 && (
            <div
              className={`grid gap-1.5 mt-3 rounded-xl overflow-hidden ${
                post.images.length === 1
                  ? "grid-cols-1"
                  : post.images.length === 3
                    ? "grid-cols-2"
                    : "grid-cols-2"
              }`}
            >
              {post.images.map((media, index) => {
                const isFullWidth =
                  post.images.length === 1 || (post.images.length === 3 && index === 0);
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden bg-muted ${
                      isFullWidth ? "col-span-2 h-52 lg:h-80" : "h-36 lg:h-52"
                    } ${post.images.length === 1 ? "col-span-1 rounded-xl" : ""}`}
                  >
                    <Image
                      src={media}
                      alt={"post image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                    {/* Overlay pour +N images */}
                    {post.images.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
                        <span className="text-white text-xl font-bold">
                          +{post.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Documents */}
          {/* {post.files.length > 0 && (
            <div className="flex flex-col gap-2 mt-3">
              {post.files.map((media, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  // AFFICHER LE PREVIOUS DU PDF DANS UNE MODAL
                  // onClick={() =>
                  //   media.fileExtension === "pdf" && setPreviewDoc(media)
                  // }
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
          )} */}

          {/* PDF Preview Dialog */}
          <Dialog
            open={!!previewDoc}
            onOpenChange={(open) => !open && setPreviewDoc(null)}
          >
            <DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col p-0 gap-0">
              <DialogHeader className="px-6 py-4 border-b shrink-0">
                <DialogTitle className="flex items-center gap-2 text-base">
                  <FileText className="size-4 text-primary" />
                  {previewDoc?.fileName || "Document"}
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 min-h-0">
                {previewDoc && (
                  <iframe
                    src={previewDoc.url}
                    title={previewDoc.fileName || "PDF Preview"}
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer le post</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Êtes-vous sûr de vouloir supprimer ce post ? Cette action est
                irréversible.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setConfirmDelete(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading && (
                    <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  )}
                  Supprimer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                  <span className="font-medium">{post.comments}</span>
                  <ChevronDown className="size-3.5" />
                </button>
              </CollapsibleTrigger>
            ) : (
              <div className="flex flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground">
                <MessageCircle className="size-4" />
                <span className="font-medium">{post.comments}</span>
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
            {isAuthenticated && (
              <div className="flex flex-row items-center gap-2.5">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={currentUser?.avatarUrl || ""} alt="vous" />
                  <AvatarFallback className="text-[10px] font-semibold">
                    {currentUser?.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-row items-center gap-1 border rounded-full px-3 py-1 w-full">
                  <Input
                    placeholder="Écrire un commentaire..."
                    className="border-0 h-7 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 p-0"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendComment()
                    }
                    disabled={commentSending}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 cursor-pointer"
                    onClick={handleSendComment}
                    disabled={commentSending || !commentText.trim()}
                  >
                    {commentSending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Send className="size-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Chargement */}
            {commentsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Spinner className="size-5" />
              </div>
            ) : commentTree.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">
                Aucun commentaire pour le moment.
              </p>
            ) : (
              commentTree.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FeedItem;
