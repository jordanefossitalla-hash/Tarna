export type NotificationType =
  | "like"
  | "comment"
  | "follow"
  | "mention"
  | "group_invite"
  | "group_join"
  | "share"
  | "system";

export type Notification = {
  id: number;
  type: NotificationType;
  actor: {
    name: string;
    avatar: string;
    initials: string;
  };
  /** Texte principal affiché (ex: "a aimé votre publication") */
  message: string;
  /** Extrait du contenu concerné (ex: début du post liké) */
  preview?: string;
  /** Thumbnail de l'image du post concerné */
  thumbnail?: string;
  /** Nom du groupe (pour invitations/joins) */
  groupName?: string;
  /** Date ISO */
  createdAt: string;
  /** Texte relatif (ex: "il y a 5 min") */
  timeAgo: string;
  /** Notification lue ou non */
  read: boolean;
};
