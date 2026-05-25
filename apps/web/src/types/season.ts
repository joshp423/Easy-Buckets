import { type Game } from "./game";

type Season = {
  id: number;
  name: string;
  teamId: number;
  dateCreated: Date;
  games: Game[];
};

export type { Season };
