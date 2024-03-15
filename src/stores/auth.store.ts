import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { DiscordUser, User } from '../interfaces/users.interface';

export interface AuthState {
  // authStatus: AuthStatus;
  token?: string;
  user?: User | DiscordUser;
  loginUser: (email: string, password: string) => Promise<void>;
  loginUserWithDiscord: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  checkDiscordAuthStatus: (code: string) => Promise<void>;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
  // authStatus: 'pending',
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token } = await AuthService.login(email, password);
      set({  token });
    } catch(error) {
      set({ token: undefined });
      throw 'Unauthorized';
    }
  },
  loginUserWithDiscord: async () => {
    try {
      const { token } = await AuthService.loginWithDiscord();
      set({  token });
    } catch(error) {
      set({ token: undefined });
      throw 'Unauthorized';
    }
  },
  checkDiscordAuthStatus: async (code: string): Promise<void> => {
    try {
      const { token, ...user } = await AuthService.checkDiscordAthStatus(code);
      set({ token, user })
      // set({ authStatus: 'authorized', token, user })

    } catch (error) {
      set({ user: undefined, token: undefined });
      // set({ authStatus: 'unauthorized', user: undefined, token: undefined });
    }
  },
  checkAuthStatus: async (): Promise<void> => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ token, user })
      // set({ authStatus: 'authorized', token, user })
    } catch (error) {
      set({ user: undefined, token: undefined });
      // set({ authStatus: 'unauthorized', user: undefined, token: undefined });
    }
  },
  logoutUser: () => {
    set({ user: undefined, token: undefined });
    // set({ authStatus: 'unauthorized', user: undefined, token: undefined });
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