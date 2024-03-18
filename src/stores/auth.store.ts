import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  UserType,
  User,
  UserDiscord,
} from "../interfaces/users.interface";

type AuthData = {
  user: User | UserDiscord;
  userType: UserType;
};
export interface AuthState {
  token: string | null;
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: (userData: AuthData | null, token: string | null) => void;
  refreshAuthData: (userData: AuthData | null) => void;
  setIsLoading: (value: boolean) => void;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = set => ({
  token: null,
  authData: null,
  isLoading: false,
  setAuthData: (userData, token) => {
    set({ authData: userData, token, isLoading: false });
  },
  refreshAuthData: userData => {
    set({ authData: userData });
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
