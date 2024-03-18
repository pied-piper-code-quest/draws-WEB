import { User, UserDiscord, UserType } from "./users.interface";

export type AuthStatus = "authorized" | "unauthorized" | "pending";

export interface AuthResponse {
  user: User | UserDiscord;
  token: string;
}
export interface VerifyTokenResponse {
  user: User | UserDiscord;
  userType: UserType;
}

export interface DiscordUrl {
  url: string;
}
