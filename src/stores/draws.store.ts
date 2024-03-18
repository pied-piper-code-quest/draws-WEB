import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DrawData } from "../interfaces/draws.interface";

export interface DrawsState {
  allDraws: DrawData[];
  currentDraw?: DrawData;
  setAllDraws: (draws: DrawData[]) => void;
  setCurrentDraw: (draw: DrawData) => void;
}

const storeAPI: StateCreator<DrawsState> = set => ({
  allDraws: [],
  currentDraw: undefined,
  setAllDraws: (draws: DrawData[]) => {
    set({ allDraws: draws });
  },
  setCurrentDraw: (draw: DrawData) => {
    set({ currentDraw: draw });
  },
});

export const useDrawsStore = create<DrawsState>()(
  devtools(persist(storeAPI, { name: "draws-store" })),
);
