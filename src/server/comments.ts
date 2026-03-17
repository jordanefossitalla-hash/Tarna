"use server";
import { cookies } from "next/headers";
import { buildUrl, getServerApiOrigin } from "@/src/lib/runtime-config";

const API_BASE_URL = getServerApiOrigin();

type createType = {
  postId: string;
  authorId: string;
  contentText: string;
  parentCommentId?: string;
};

export async function createComments(content: createType) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated.", post: null };
  }

  if (!content.contentText.trim()) {
    return { success: false, error: "Content cannot be empty.", post: null };
  }

  try {
    const res = await fetch(buildUrl(API_BASE_URL, "/comments"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
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
    
    const post= {
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
