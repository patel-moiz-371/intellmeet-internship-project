import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "moderator" | "member" | "guest";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: string; // ISO date string
  timezone: string;
  department: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  updateUser: (patch: Partial<Pick<AuthUser, "name" | "timezone" | "department">>) => void;
  logout: () => void;
}

const MOCK_USER: AuthUser = {
  id: "usr_01HXKZ9P",
  name: "Jay Gaikwad",
  email: "jay.gaikwad@intellmeet.io",
  role: "admin",
  joinedAt: "2024-09-01T00:00:00Z",
  timezone: "Asia/Kolkata",
  department: "Engineering",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_USER,
      isAuthenticated: true,

      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : null,
        })),

      logout: () =>
        set({ user: null, isAuthenticated: false }),
    }),
    { name: "intellmeet-auth" }
  )
);