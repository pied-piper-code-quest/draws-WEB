import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { User, UserDiscord } from '../interfaces/users.interface';

export interface AuthState {
  token?: string;
  user?: User | UserDiscord;
  isLoading: boolean;
  loginUser: (username: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  setUserData: (token: string, user: User | UserDiscord) => void;
  setIsLoading: (value: boolean) => void;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
  token: undefined,
  user: undefined,
  isLoading: false,
  loginUser: async (username: string, password: string) => {
    set({ isLoading: true })
    try {
      const { token, user } = await AuthService.login(username, password);
      set({ token, user, isLoading: false });
    } catch(error) {
      set({ user: undefined, token: undefined, isLoading: false });
      throw 'Unauthorized';
    }
  },
  checkAuthStatus: async (): Promise<void> => {
    set({ isLoading: true })
    try {
      const { token, user } = await AuthService.checkStatus();
      set({ token, user, isLoading: false })
    } catch (error) {
      set({ user: undefined, token: undefined, isLoading: false });
    }
  },
  setUserData: (token: string, user: User | UserDiscord) => {
    set({ token, user, isLoading: false })
  },
  setIsLoading: (value: boolean) => {
    set({ isLoading: value })
  },
  logoutUser: () => {
    set({ user: undefined, token: undefined, isLoading: false });
  }
});

export const useAuthStore = create<AuthState>()((
  devtools(
    persist(
      storeAPI,
      { name: 'auth-store'}
    )
  )
));