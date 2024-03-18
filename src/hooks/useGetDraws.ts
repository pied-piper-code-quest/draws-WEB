import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { DrawsService } from "../services/draws.service";
import type { DrawData } from "../interfaces";
import { Alerts } from "../global";

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

  const subscribeToDraw = useCallback(async (id: string, title: string) => {
    const result = await Swal.fire({
      icon: "question",
      title: `¿Desea inscribirse al sorteo "${title}"?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Inscribirme",
    });
    if (result.isConfirmed) {
      Alerts.Loading();
      try {
        const data = await DrawsService.subscribeToDraw(id);
        console.log(data);
        Alerts.Success();
      } catch (error: any) {
        Alerts.Error(error?.message || "Error Desconocido");
      }
    }
  }, []);
  useEffect(() => {
    getDraws();
  }, []);

  return {
    draws,
    isLoading,
    getDraws,
    subscribeToDraw,
  };
}
