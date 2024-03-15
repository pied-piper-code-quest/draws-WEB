export type AuthStatus = 'authorized' | 'unauthorized' | 'pending'; 

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export interface DiscordLoginResponse {
  id: string;
  discordId: string;
  username: string;
  avatar: string;
  discriminator: string;
  globalName: string;
  email: string;
  token: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}