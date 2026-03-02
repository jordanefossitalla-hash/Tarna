"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  CalendarDays,
  Edit,
  FileText,
  Loader2,
  Sparkles,
  UserCheck,
  UserPlus,
  Users2,
} from "lucide-react";
import { useUserStore } from "@/src/store/userStore";
import { apiFetch } from "@/src/lib/api";
import { User } from "@/src/types/user";
import Link from "next/link";
import FeedItem from "@/src/components/personnal/ui/feedItem";
import { Post } from "@/src/types/post";
import { Spinner } from "@/src/components/ui/spinner";
import { getInitials } from "@/src/lib/getInitials";
import { toast } from "sonner";

interface UserProfile extends User {
  followers?: number;
  following?: number;
  postsCount?: number;
}

const formatCount = (value?: number) => {
  if (!value) return "0";
  if (value < 1000) return `${value}`;
  return `${(value / 1000).toFixed(1)}k`;
};

const ProfilePage = () => {
  const params = useParams();
  const username = params.username as string;

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((s) => s.user);
  const accessToken = useUserStore((s) => s.accessToken);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  //   const [isFollowing, setIsFollowing] = useState(false);
  //   const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      // if (!isAuthenticated) {
      //   setLoading(false);
      //   return;
      // }
      // if (loading) {
      //   return (
      //     <div className="xl:max-w-2xl xl:w-2xl w-full flex flex-row items-center justify-center pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      //       <Spinner className="size-8" />
      //     </div>
      //   );
      // }

      try {
        setLoading(true);
        const res = await apiFetch(`/users/${username}`, accessToken);
        if (!res.ok) return;

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil", {
          description: `Impossible de charger le profil de ${username}`,
        });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username, accessToken, currentUser?.id, isAuthenticated]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!profile?.id) return;
      try {
        setPostsLoading(true);
        const res = await apiFetch(`/posts/feed`, accessToken);
        if (!res.ok) return;
        const json = await res.json();
        const rawPosts = Array.isArray(json)
          ? json
          : (json.data ?? json.posts ?? []);
        
          console.log(rawPosts);
          

        const posts: Post[] = rawPosts.map((p: any) => {
          const displayName: string =
            p.author?.displayName ?? p.author?.username ?? "Unknown";
          const initials = displayName
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          const now = Date.now();
          const created = new Date(p.createdAt).getTime();
          const diffH = Math.floor((now - created) / (1000 * 60 * 60));
          const timeAgo =
            diffH < 1
              ? "now"
              : diffH < 24
                ? `${diffH}h`
                : `${Math.floor(diffH / 24)}d`;

          return {
            id: p.id,
            authorId: p.authorId ?? p.author?.id,
            groupId: p.groupId ?? null,
            parentPostId: p.parentPostId ?? null,
            author: {
              id: p.author?.id,
              name: displayName,
              username: p.author?.username ?? "",
              avatar: p.author?.avatarUrl ?? "",
              initials,
              isVerified: p.author?.isVerified ?? false,
            },
            content: p.contentText ?? p.content ?? "",
            visibility: p.visibility ?? "public",
            isPinned: p.isPinned ?? false,
            isEdited: p.isEdited ?? false,
            commentsEnabled: p.commentsEnabled ?? true,
            sharesEnabled: p.sharesEnabled ?? true,
            media: p.media ?? [],
            reactions: p.reactions ?? {
              heart: p.stats?.reactions_count ?? 0,
              lightbulb: 0,
              handshake: 0,
            },
            images: p.images ?? [],
            files: p.files ?? [],
            stats: p.stats ?? {
              likes_count: 0,
              views_count: 0,
              shares_count: 0,
              comments_count: 0,
              supports_count: 0,
              reactions_count: 1,
              illuminates_count: 0,
            },
            comments: p._count?.comments ?? 0,
            shares: p.stats?.shares_count ?? p.shares ?? 0,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            timeAgo,
            myReaction: p.myReaction ?? null,
          };
        });

        setPosts(posts);
      } catch (error) {
        toast.error("Erreur lors du chargement des posts", {
          description: "Impossible de charger les posts de cet utilisateur.",
        });
      } finally {
        setPostsLoading(false);
      }
    };

    if (profile?.id) {
      fetchUserPosts();
    }
  }, [profile?.id, accessToken]);

  //   const handleFollow = useCallback(async () => {
  //     if (!profile?.id) return;

  //     try {
  //       const method = isFollowing ? "DELETE" : "POST";
  //       const res = await apiFetch(`/users/${profile.id}/follow`, accessToken, {
  //         method,
  //       });

  //       if (res.ok) {
  //         setIsFollowing(!isFollowing);
  //       }
  //     } catch (error) {
  //       toast.error("Erreur lors de la modification du follow", {
  //         description: "Impossible de modifier le follow.",
  //       });
  //     } finally {
  //       setFollowLoading(false);
  //     }
  //   }, [profile?.id, isFollowing, accessToken, followLoading]);

  if (loading) {
    return (
      <div className="xl:max-w-2xl xl:w-2xl w-full flex flex-row items-center justify-center pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Utilisateur non trouve</p>
      </div>
    );
  }

  return (
    <div className="xl:max-w-2xl xl:w-2xl w-full pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      <div className="relative h-52 md:h-64 rounded-2xl overflow-hidden border bg-linear-to-br from-primary/20 via-primary/5 to-background">
        {profile.coverUrl && (
          <img
            src={profile.coverUrl}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-primary/10 to-transparent" />
        {/* <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur px-3 py-1 text-xs font-medium border">
            <Sparkles className="size-3.5 text-primary" />
            Profil public
          </div>
        </div> */}
      </div>

      <Card className="relative -mt-14 md:-mt-16 mx-3 md:mx-4 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <Avatar className="size-24 md:size-28 border-4 border-background shadow-sm -mt-16 md:-mt-20 shrink-0">
            <AvatarImage
              src={profile.avatarUrl ?? ""}
              alt={profile.displayName ?? profile.username}
            />
            <AvatarFallback className="text-2xl font-bold">
              {getInitials(profile.displayName || profile.username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {profile.displayName || profile.username}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  @{profile.username}
                </p>
                {profile.isVerified && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 mt-2">
                    <UserCheck className="size-3.5" />
                    Verified
                  </div>
                )}
              </div>

              {/* <div className="shrink-0">
                {isOwnProfile ? (
                  <Link href="/profil/edit">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 cursor-pointer rounded-full"
                    >
                      <Edit className="size-3.5" />
                      Edit profile
                    </Button>
                  </Link>
                ) :   <Button
                    variant={isFollowing ? "outline" : "default"}
                    size="sm"
                    className="gap-1.5 cursor-pointer rounded-full"
                    // onClick={handleFollow}
                    disabled={followLoading}
                  >
                    {followLoading ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : isFollowing ? (
                      <UserCheck className="size-3.5" />
                    ) : (
                      <UserPlus className="size-3.5" />
                    )}
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                null}
              </div> */}
            </div>

            {profile.bio && (
              <p className="text-sm text-foreground/80 leading-relaxed mt-3">
                {profile.bio}
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="rounded-xl border bg-muted/25 px-3 py-2">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <FileText className="size-3.5" />
                  Posts
                </div>
                <p className="text-base md:text-lg font-bold mt-1">
                  {formatCount(posts.length)}
                </p>
              </div>

              {/* <div className="rounded-xl border bg-muted/25 px-3 py-2">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Users2 className="size-3.5" />
                  Followers
                </div>
                <p className="text-base md:text-lg font-bold mt-1">
                  {formatCount(profile.followers)}
                </p>
              </div>

              <div className="rounded-xl border bg-muted/25 px-3 py-2">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <CalendarDays className="size-3.5" />
                  Following
                </div>
                <p className="text-base md:text-lg font-bold mt-1">
                  {formatCount(profile.following)}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </Card>

      <div className="px-3 md:px-4 pb-8">
        <Card className="p-4 mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-semibold">Posts</h2>
            <p className="text-xs text-muted-foreground">
              Latest publications from this profile.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatCount(posts.length)} total
          </div>
        </Card>

        {postsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-5" />
          </div>
        ) : posts.length === 0 ? (
          <Card className="py-12 px-6 text-center">
            <p className="text-sm font-medium">No post yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              This user has not published content for now.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post, index) => {
              return <FeedItem key={index} post={post} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
