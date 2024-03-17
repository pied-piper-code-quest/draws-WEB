import { AxiosError } from "axios";
import { drawsApi } from "../apis/drawsApi";
import { Draw } from "../interfaces/draws.interface";

interface DrawResponse {
  data: Draw[];
  totalPages: number;
  currentPage: number;
}

export class DrawsService {
  static getAllDraws = async (limit: number = 10, page: number = 1) => {
    try {
      const { data } = await drawsApi.get<DrawResponse>(`/draws?limit=${limit}&page=${page}`);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err)
      throw new Error('Somethint went wrong!')
    }
  }

  static createDraw = async (draw: Draw) => {
    try {
      const { data } = await drawsApi.post<Draw>(`/draws/manage`, draw);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        throw new Error(err.response?.data);
      }
      console.log(err)
      throw new Error('Somethint went wrong!')
    }
  }
}