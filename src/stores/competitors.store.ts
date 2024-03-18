import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserDiscord } from '../interfaces/users.interface';



export interface CompetitorsState {
  allCompetitors: UserDiscord[];
  currentCompetitor?: UserDiscord;
  setAllCompetitors: (competitors: UserDiscord[]) => void;
  setCurrentCompetitors: (competitor: UserDiscord) => void;
  selectedCompetitors: string[];
  setSelectedCompetitors: (competitors: string[]) => void;
}

const storeAPI: StateCreator<CompetitorsState> = (set) => ({
  allCompetitors: [],
  currentCompetitor: undefined,
  selectedCompetitors: [],
  setAllCompetitors: (competitors: UserDiscord[]) => {
    set({ allCompetitors: competitors })
  },
  setSelectedCompetitors: (competitors: string[]) => {
    set({ selectedCompetitors: competitors })
  },
  setCurrentCompetitors: (competitor: UserDiscord) => {
    set({ currentCompetitor: competitor })
  },
});

export const useCompetitorsStore = create<CompetitorsState>()((
  devtools(
    persist(
      storeAPI,
      { name: 'competitors-store'}
    )
  )
));