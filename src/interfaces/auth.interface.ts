import { User, UserDiscord } from "./users.interface";

export type AuthStatus = "authorized" | "unauthorized" | "pending";

export interface AuthResponse {
  user?: User | UserDiscord;
  token: string;
}

export interface DiscordUrl {
  url: string;
}
