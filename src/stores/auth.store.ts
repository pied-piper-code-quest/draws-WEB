import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User, UserDiscord } from "../interfaces/users.interface";

type AuthData = {
  token: string;
  user: User | UserDiscord;
  userType: "admin" | "discord";
};
export interface AuthState {
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: (userData: AuthData | null) => void;

  setIsLoading: (value: boolean) => void;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = set => ({
  authData: null,
  isLoading: false,
  setAuthData: userData => {
    set({ authData: userData, isLoading: false });
  },

  setIsLoading: (value: boolean) => {
    set({ isLoading: value });
  },
  logoutUser: () => {
    set({ authData: null, isLoading: false });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeAPI, { name: "auth-store" })),
);
