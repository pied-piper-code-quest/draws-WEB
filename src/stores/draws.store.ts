import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Draw } from '../interfaces/draws.interface';

export interface DrawsState {
  allDraws: Draw[];
  currentDraw?: Draw;
  setAllDraws: (draws: Draw[]) => void;
  setCurrentDraw: (draw: Draw) => void;
}

const storeAPI: StateCreator<DrawsState> = (set) => ({
  allDraws: [],
  currentDraw: undefined,
  setAllDraws: (draws: Draw[]) => {
    set({ allDraws: draws })
  },
  setCurrentDraw: (draw: Draw) => {
    set({ currentDraw: draw })
  },
});

export const useDrawsStore = create<DrawsState>()((
  devtools(
    persist(
      storeAPI,
      { name: 'draws-store'}
    )
  )
));