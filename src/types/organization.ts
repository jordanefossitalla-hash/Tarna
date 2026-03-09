export type OrgRole = "owner" | "admin" | "manager" | "member" | "guest";

export type OrgStatus = "active" | "archived";

export type Organization = {
  id: number;
  /** Nom de l'organisation */
  name: string;
  /** Domaine (ex : kiama.cm) */
  domain: string;
  /** Logo / avatar URL */
  logo: string;
  /** Initiales pour fallback */
  initials: string;
  /** Bannière URL */
  banner: string;
  /** Description courte de l'entité */
  description: string;
  /** Pays d'implantation */
  country: string;
  /** Secteur d'activité */
  sector: string;
  /** Nombre de membres */
  membersCount: number;
  /** Nombre de publications */
  postsCount: number;
  /** Statut de l'organisation */
  status: OrgStatus;
  /** Rôle de l'utilisateur courant (null si non-membre) */
  currentUserRole: OrgRole | null;
  /** L'utilisateur a une demande d'adhésion en cours */
  isPending: boolean;
  /** Date de création lisible */
  createdAt: string;
  /** Dernière activité lisible */
  lastActivity: string;
};
