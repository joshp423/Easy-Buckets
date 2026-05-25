import { type GameStat } from "./gameStat";

type Game = {
  id: number;
  name: string;
  teamId: number;
  dateCreated: Date;
  gameStatlines: GameStat[]
};

export type { Game };
