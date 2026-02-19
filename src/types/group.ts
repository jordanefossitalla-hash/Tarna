export type GroupVisibility = "public" | "private" | "secret";

export type Group = {
  id: number;
  name: string;
  description: string;
  /** URL de la bannière du groupe */
  banner: string;
  /** URL de l'avatar du groupe */
  avatar: string;
  initials: string;
  visibility: GroupVisibility;
  membersCount: number;
  postsCount: number;
  /** L'utilisateur courant est-il membre ? */
  isMember: boolean;
  /** Demande en attente (pour les groupes privés) */
  isPending: boolean;
  /** Catégorie / tag du groupe */
  category: string;
  /** Dernière activité lisible */
  lastActivity: string;
};
