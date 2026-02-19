import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user";

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
};

const defaultUser: User = {
  id: "1",
  username: "@mr.shadow",
  email: "jerry@kiama.com",
  phone: null,
  display_name: "Jerry Mbende",
  bio: "Software Engineer at KIAMA",
  avatar_url: "https://github.com/shadcn.png",
  cover_url: null,
  is_verified: true,
  initials: "JM",
  online: true,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
    //   user: null,
      user: defaultUser,
      isAuthenticated: true,

      setUser: (user) => set({ user, isAuthenticated: true }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "tarna-user",
    }
  )
);
