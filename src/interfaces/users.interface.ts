export type UserType = "admin" | "discord";

export interface User {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserDiscord {
  id: string;
  discordId: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: null;
  accent_color: null;
  global_name: string;
  avatar_decoration_data: null;
  banner_color: null;
  mfa_enabled: boolean;
  locale: string;
  email: string;
  verified: boolean;
}
