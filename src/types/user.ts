export type User = {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  password_hash?: string;
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  is_verified: boolean;
  /** Champs front-end uniquement */
  initials: string;
  online: boolean;
};
