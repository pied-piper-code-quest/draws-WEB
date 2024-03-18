import { useEffect, useState, useCallback } from "react";
import { DrawsService } from "../services/draws.service";
import type { DrawData } from "../interfaces";

export function useGetDraws() {
  const [isLoading, setIsLoading] = useState(true);
  const [draws, setDraws] = useState<DrawData[]>([]);

  const getDraws = useCallback(async (page?: number, limit?: number) => {
    setIsLoading(true);
    try {
      const { data } = await DrawsService.getDrawsList(page, limit);
      setDraws(data);
    } catch (error) {
      setDraws([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getDraws();
  }, []);

  return {
    draws,
    isLoading,
    getDraws,
  };
}
