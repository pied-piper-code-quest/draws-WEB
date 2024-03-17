import { useEffect, useState } from "react";
import { DrawData } from "../interfaces";
import { DrawsService } from "../services/draws.service";

export function useGetDraws() {
  const [isLoading, setIsLoading] = useState(true);
  const [draws, setDraws] = useState<DrawData[]>([]);
  const getDraws = async (page?: number, limit?: number) => {
    setIsLoading(true);
    try {
      const { data } = await DrawsService.getDrawsList(page, limit);
      setDraws(data);
    } catch (error) {
      setDraws([]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getDraws();
  }, []);

  return {
    draws,
    isLoading,
    getDraws,
  };
}
