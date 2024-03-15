import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { User, UserDiscord } from '../interfaces/users.interface';

export interface AuthState {
  token?: string;
  user?: User | UserDiscord;
  url?: string,
  loginUser: (username: string, password: string) => Promise<void>;
  loginUserWithDiscord: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  checkDiscordAuthStatus: (code: string) => Promise<void>;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
  token: undefined,
  user: undefined,
  url: undefined,
  loginUser: async (username: string, password: string) => {
    try {
      const { token, user } = await AuthService.login(username, password);
      set({ token, user });
    } catch(error) {
      set({ token: undefined });
      throw 'Unauthorized';
    }
  },
  loginUserWithDiscord: async () => {
    try {
      const { url } = await AuthService.loginWithDiscord();
      set({ url });
    } catch(error) {
      set({ url: undefined });
      throw 'Unauthorized';
    }
  },
  checkDiscordAuthStatus: async (code: string): Promise<void> => {
    try {
      const { token, user } = await AuthService.checkDiscordAthStatus(code);
      set({ token, user })
    } catch (error) {
      set({ user: undefined, token: undefined });
    }
  },
  checkAuthStatus: async (): Promise<void> => {
    try {
      const { token, user } = await AuthService.checkStatus();
      set({ token, user })
    } catch (error) {
      set({ user: undefined, token: undefined });
    }
  },
  logoutUser: () => {
    set({ user: undefined, token: undefined, url: undefined });
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