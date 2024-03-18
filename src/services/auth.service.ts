import { AxiosError } from "axios";
import { drawsApi } from "../apis/drawsApi";
import { AuthResponse, DiscordUrl } from "../interfaces";

export class AuthService {
  // ? Login with User Credentials (username & password) - Only for admins
  static login = async (
    username: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const { data } = await drawsApi.post<AuthResponse>("/auth/login", {
        username,
        password,
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err);
      throw new Error("Unable to login!");
    }
  };

  // ? Check the session status - Only for admins
  static checkStatus = async (): Promise<AuthResponse> => {
    try {
      const { data } = await drawsApi.get<AuthResponse>("/auth/check-status");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Unauthorized");
    }
  };

  // ? Login with Discord Button SignIn - Only for competitors
  static getDiscordOAuthUrl = async (): Promise<DiscordUrl> => {
    try {
      const { data } = await drawsApi.get<DiscordUrl>("/auth/oauth-url");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      throw new Error("Unable to login!");
    }
  };

  // ? Check the Discord Session - Only for competitos
  static checkDiscordAthStatus = async (
    code: string,
  ): Promise<AuthResponse> => {
    if (!code) throw new Error("Missing code");
    try {
      const { data } = await drawsApi.get<AuthResponse>(
        `/auth/oauth-token?code=${code}`,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Unable to authenticate");
    }
  };
}
