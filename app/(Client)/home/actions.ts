"use server";

import { Post } from "@/src/types/post";

const API_BASE_URL = process.env.API_BASE_URL ?? "https://api.tarna.com";
const API_PORT = process.env.API_PORT ?? "4000";

export type FeedState = {
  posts: Post[];
  error: string | null;
  nextCursor: string | null;
  hasMore: boolean;
};

export async function fetchPostsAction(
  _prev: FeedState,
  formData: FormData,
): Promise<FeedState> {
  const token = formData.get("token") as string;
  const cursor = formData.get("cursor") as string | null;
  
  if (!token) {
    return { posts: [], error: "Not authenticated.", nextCursor: null, hasMore: false };
  }

  try {
    const url = new URL(`${API_BASE_URL}:${API_PORT}/posts/feed`);
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        posts: [],
        error: data?.message ?? `Request failed (${res.status})`,
        nextCursor: null,
        hasMore: false,
      };
    }

    const json = await res.json();
    const rawPosts = Array.isArray(json)
      ? json
      : (json.data ?? json.posts ?? []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        stats: p.stats ?? {
          views_count: 0,
          shares_count: 0,
          comments_count: 0,
          reactions_count: 0,
        },
        comments: p.stats?.comments_count ?? p.comments ?? 0,
        shares: p.stats?.shares_count ?? p.shares ?? 0,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        timeAgo,
      };
    });

    return { posts, error: null, nextCursor: json.meta?.nextCursor ?? null, hasMore: json.meta?.hasMore ?? false };
  } catch {
    return { posts: [], error: "Failed to fetch posts.", nextCursor: null, hasMore: false };
  }
}

// ---------- Create Post ----------
export type CreatePostState = {
  success: boolean;
  error: string | null;
  post: Post | null;
};

export async function createPostAction(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const token = formData.get("token") as string;
  const authorId = formData.get("authorId") as string;
  const contentText = (formData.get("contentText") as string) ?? "";
  const visibility = (formData.get("visibility") as string) ?? "public";

  if (!token) {
    return { success: false, error: "Not authenticated.", post: null };
  }

  if (!contentText.trim()) {
    return { success: false, error: "Content cannot be empty.", post: null };
  }

  try {
    const res = await fetch(`${API_BASE_URL}:${API_PORT}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        authorId,
        contentText,
        visibility,
        isPinned: false,
        commentsEnabled: true,
        sharesEnabled: true,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        error: data?.message ?? `Request failed (${res.status})`,
        post: null,
      };
    }

    const p = await res.json();
    const displayName: string =
      p.author?.displayName ?? p.author?.username ?? "Unknown";
    const initials = displayName
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const post: Post = {
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
      content: p.contentText ?? "",
      visibility: p.visibility ?? "public",
      isPinned: p.isPinned ?? false,
      isEdited: p.isEdited ?? false,
      commentsEnabled: p.commentsEnabled ?? true,
      sharesEnabled: p.sharesEnabled ?? true,
      media: p.media ?? [],
      reactions: { heart: 0, lightbulb: 0, handshake: 0 },
      stats: p.stats ?? {
        views_count: 0,
        shares_count: 0,
        comments_count: 0,
        reactions_count: 0,
      },
      comments: 0,
      shares: 0,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      timeAgo: "now",
    };

    return { success: true, error: null, post };
  } catch {
    return { success: false, error: "Failed to create post.", post: null };
  }
}

export async function deletePost(id: string) {}
