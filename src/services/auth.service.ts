import { AxiosError } from "axios";
import { drawsApi } from "../apis/drawsApi";
import { DiscordLoginResponse, LoginResponse } from "../interfaces";

export class AuthService {
  // ? Login with User Credentials (email & password) - Only for admins
  static login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await drawsApi.post<LoginResponse>('/auth/login', { email, password });
      // console.log(data);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err)
      throw new Error('Unable to login!')
    }
  }

  // ? Check the session status - Only for admins
  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await drawsApi.get<LoginResponse>('/auth/check-status');
      return data;
    } catch(error) {
      console.log(error);
      throw new Error('Unauthorized');
    }
  }

  // ? Login with Discord Button SignIn - Only for competitors
  static loginWithDiscord = async (): Promise<DiscordLoginResponse> => {
    try {
      const { data } = await drawsApi.post<DiscordLoginResponse>('/auth/oauth-url');
      // console.log(data);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err)
      throw new Error('Unable to login!')
    }
  }

  // ? Check the Discord Session - Only for competitos
  static checkDiscordAthStatus = async (code: string): Promise<DiscordLoginResponse> => {
    if (!code) throw new Error("Missing code");
    try {
      const { data } = await drawsApi.post(`/auth/oauth-token?code=${code}`);
      // console.log(data);
      return data;

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Unable to authenticate");
    }
  }
}