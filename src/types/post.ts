export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  parentCommentId: string | null;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    initials: string;
  };
  content: string;
  mediaUrl: string | null;
  isEdited: boolean;
  stats: {
    replies_count: number;
    reactions_count: number;
  };
  createdAt: string;
  updatedAt: string;
  timeAgo: string;
  /** Réponses (calculées côté client pour l'arbre 3 niveaux) */
  replies?: Comment[];
};

export type MediaType = "image" | "video" | "document";

export type Media = {
  id: number;
  type: MediaType;
  url: string;
  alt?: string;
  /** Nom du fichier (utile pour les documents) */
  fileName?: string;
  /** Taille du fichier en octets (utile pour les documents) */
  fileSize?: number;
  /** Extension du fichier (ex: pdf, docx, xlsx) */
  fileExtension?: string;
};

export type FileDocument = {
    url: string;
    fileName: string;
    extension: string;
  }

export type Post = {
  id: string;
  authorId?: string;
  groupId?: string | null;
  parentPostId?: string | null;
  author: {
    id?: string;
    name: string;
    username: string;
    avatar: string;
    initials: string;
    isVerified?: boolean;
  };
  content: string;
  visibility?: string;
  isPinned: boolean;
  isEdited?: boolean;
  commentsEnabled?: boolean;
  sharesEnabled?: boolean;
  media: Media[];
  reactions: {
    heart: number;
    lightbulb: number;
    handshake: number;
  };
  images: string[];
  files: FileDocument[];
  stats?: {
    views_count: number;
    shares_count: number;
    comments_count: number;
    reactions_count: number;
  };
  comments: number;
  shares: number;
  createdAt: string;
  updatedAt?: string;
  timeAgo: string;
};
