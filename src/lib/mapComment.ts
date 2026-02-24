import { Comment } from "@/src/types/post";

/**
 * Aplatit récursivement un arbre de commentaires bruts
 * (chaque nœud peut avoir un tableau `replies`) en liste plate.
 * Chaque élément conserve son `parentCommentId` pour que
 * `buildCommentTree` puisse reconstruire l'arbre côté client.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenRawComments(raw: any[]): Comment[] {
  const result: Comment[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function walk(list: any[], parentId: string | null) {
    for (const c of list) {
      // S'assurer que parentCommentId est bien défini
      const mapped = mapRawComment({ ...c, parentCommentId: c.parentCommentId ?? parentId });
      result.push(mapped);

      // Descendre dans les réponses imbriquées
      const nested = c.replies ?? c.children ?? [];
      if (Array.isArray(nested) && nested.length > 0) {
        walk(nested, c.id);
      }
    }
  }

  walk(raw, null);
  return result;
}

/**
 * Transforme un commentaire brut de l'API / WebSocket en Comment frontend.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRawComment(c: any): Comment {
  const displayName: string =
    c.author?.displayName ?? c.author?.username ?? "Unknown";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const now = Date.now();
  const created = new Date(c.createdAt).getTime();
  const diffM = Math.floor((now - created) / (1000 * 60));
  const diffH = Math.floor(diffM / 60);
  const timeAgo =
    diffM < 1
      ? "now"
      : diffM < 60
        ? `${diffM}m`
        : diffH < 24
          ? `${diffH}h`
          : `${Math.floor(diffH / 24)}d`;

  return {
    id: c.id,
    postId: c.postId,
    authorId: c.authorId ?? c.author?.id,
    parentCommentId: c.parentCommentId ?? null,
    author: {
      id: c.author?.id ?? c.authorId,
      name: displayName,
      username: c.author?.username ?? "",
      avatar: c.author?.avatarUrl ?? "",
      initials,
    },
    content: c.contentText ?? c.content ?? "",
    mediaUrl: c.mediaUrl ?? null,
    isEdited: c.isEdited ?? false,
    stats: c.stats ?? { replies_count: 0, reactions_count: 0 },
    createdAt: c.createdAt,
    updatedAt: c.updatedAt ?? c.createdAt,
    timeAgo,
  };
}

/**
 * Construit un arbre de commentaires à 3 niveaux depuis une liste plate.
 *
 * Niveau 1 : parentCommentId === null
 * Niveau 2 : parentCommentId pointe vers un lvl1
 * Niveau 3 : parentCommentId pointe vers un lvl2
 *
 * Au-delà de 3, les réponses sont rattachées au parent de niveau 2 (aplatissement).
 */
export function buildCommentTree(flat: Comment[]): Comment[] {
  const map = new Map<string, Comment & { replies: Comment[] }>();

  // Clone chaque comment avec un tableau replies vide
  for (const c of flat) {
    map.set(c.id, { ...c, replies: [] });
  }

  const roots: Comment[] = [];

  for (const c of map.values()) {
    if (!c.parentCommentId) {
      // Niveau 1
      roots.push(c);
    } else {
      const parent = map.get(c.parentCommentId);
      if (parent) {
        // Si le parent est lui-même une réponse dont le parent a un parent (lvl3+),
        // on rattache au parent de niveau 2 pour limiter à 3 niveaux
        if (parent.parentCommentId) {
          const grandParent = map.get(parent.parentCommentId);
          if (grandParent && grandParent.parentCommentId) {
            // c serait un lvl4+, on l'aplatit sous grandParent (lvl2)
            grandParent.replies.push(c);
          } else {
            parent.replies.push(c);
          }
        } else {
          parent.replies.push(c);
        }
      } else {
        // Parent introuvable → traiter comme racine
        roots.push(c);
      }
    }
  }

  // Tri par date croissante (les plus anciens en premier)
  const sortByDate = (a: Comment, b: Comment) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

  const sortTree = (comments: Comment[]) => {
    comments.sort(sortByDate);
    for (const c of comments) {
      if (c.replies && c.replies.length > 0) {
        sortTree(c.replies);
      }
    }
  };

  sortTree(roots);
  return roots;
}
