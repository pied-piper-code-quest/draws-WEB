

export interface Draw {
  id: string;
  title: string;
  description: string;
  status: string;
  available: boolean;
  maxParticipants: null;
  numberOfWinners: number;
  prizes: string[];
  resultDate: string;
  maxDateToJoin: string;
  participants: string[];
  winners: string[];
  createdAt?: string;
  updatedAt?: string;
}
