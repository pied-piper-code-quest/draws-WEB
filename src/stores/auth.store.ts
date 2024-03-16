import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { User, UserDiscord } from '../interfaces/users.interface';

export interface AuthState {
  token?: string;
  user?: User | UserDiscord;
  loginUser: (username: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  setUserData: (token: string, user: User | UserDiscord) => void;
  logoutUser: () => void;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
  token: undefined,
  user: undefined,
  loginUser: async (username: string, password: string) => {
    try {
      const { token, user } = await AuthService.login(username, password);
      set({ token, user });
    } catch(error) {
      set({ token: undefined });
      throw 'Unauthorized';
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
  setUserData: (token: string, user: User | UserDiscord) => {
    set({ token, user })
  },
  logoutUser: () => {
    set({ user: undefined, token: undefined });
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