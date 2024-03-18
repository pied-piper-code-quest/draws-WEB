import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserDiscord } from "../interfaces/users.interface";

export interface CompetitorsState {
  allCompetitors: UserDiscord[];
  currentCompetitor?: UserDiscord;
  setAllCompetitors: (competitors: UserDiscord[]) => void;
  setCurrentCompetitors: (competitor: UserDiscord) => void;
  selectedCompetitors: string[];
  setSelectedCompetitors: (competitors: string[]) => void;
}

const storeAPI: StateCreator<CompetitorsState> = set => ({
  allCompetitors: [],
  currentCompetitor: undefined,
  selectedCompetitors: [],
  setAllCompetitors: competitors => {
    set({ allCompetitors: competitors });
  },
  setSelectedCompetitors: competitors => {
    set({ selectedCompetitors: competitors });
  },
  setCurrentCompetitors: competitor => {
    set({ currentCompetitor: competitor });
  },
});

export const useCompetitorsStore = create<CompetitorsState>()(
  devtools(persist(storeAPI, { name: "competitors-store" })),
);
