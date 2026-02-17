export type Comment = {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
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

export type Post = {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    initials: string;
    isVerified: boolean;
  };
  content: string;
  isPinned: boolean;
  media: Media[];
  reactions: {
    heart: number;
    lightbulb: number;
    handshake: number;
  };
  comments: number;
  shares: number;
  createdAt: string;
  timeAgo: string;
};