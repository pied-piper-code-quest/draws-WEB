import { ResponseWithPagination } from "./response-with-pagination.interface";
import { UserDiscord } from "./users.interface";

export type DrawStatus = "pending" | "live" | "finished" | "canceled";

export interface DrawData {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  status: DrawStatus;
  available: boolean;
  maxParticipants: number | null;
  numberOfWinners: number;
  prizes: string[];
  maxDateToJoin: string | null;
  participants: string[] | UserDiscord[];
  winners: string[] | UserDiscord[];
  createdAt?: string;
  updatedAt?: string;
}

export type DrawsListResponse = ResponseWithPagination<DrawData>;
