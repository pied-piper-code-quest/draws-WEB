import { AxiosError } from "axios";
import { drawsApi } from "../apis/drawsApi";
import type { DrawData, DrawsListResponse } from "../interfaces";

export class DrawsService {
  static getDrawsList = async (
    page?: number,
    limit?: number
  ): Promise<DrawsListResponse> => {
    try {
      const { data } = await drawsApi.get<DrawsListResponse>("/draws", {
        params: { limit, page },
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err);
      throw new Error("Unknown error");
    }
  };
  static createDraw = async (draw: DrawData) => {
    try {
      const { data } = await drawsApi.post<DrawData>(`/draws/manage`, draw);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err);
      throw new Error("Somethint went wrong!");
    }
  };

  static subscribeToDraw = async (id: string): Promise<DrawData> => {
    try {
      const { data } = await drawsApi.post<DrawData>(`/draws/subscribe/${id}`);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err);
      throw new Error("Unknown error");
    }
  };
}
