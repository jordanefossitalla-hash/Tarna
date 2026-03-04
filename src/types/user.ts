export type User = {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  isVerified: boolean;
  role?: string;
  status?: string;
  createdAt?: string;
  /** Champs front-end uniquement */
  initials: string;
  online: boolean;
};

export type FetchUser = {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
};
