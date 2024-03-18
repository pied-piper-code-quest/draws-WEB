import { AxiosError } from "axios";
import { drawsApi } from "../apis/drawsApi";
import { Draw } from "../interfaces/draws.interface";
import { UserDiscord } from "../interfaces/users.interface";

interface CompetitorResponse {
  data: UserDiscord[];
  totalPages: number;
  currentPage: number;
}

export class CompetitorsService {
  static getAllCompetitors = async (limit: number = 10, page: number = 1) => {
    try {
      const { data } = await drawsApi.get<CompetitorResponse>(`/users/discord?limit=${limit}&page=${page}`);
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