import { type Shot } from "./shot";

type GameStat = {
  id: number;
  gameId: number;
  playerId: number;
  TwoPointFGMiss: number;
  TwoPointFGMake: number;
  ThreePointFGMiss: number;
  ThreePointFGMake: number;
  FTMiss: number;
  FTMake: number;
  OReb: number;
  DReb: number;
  Assist: number;
  Block: number;
  Steal: number;
  Turnover: number;
  PF: number;
  TwoPointFGPercent: number;
  ThreePointFGPercent: number;
  FTPercent: number;
  TotalRebounds: number;
  Points: number;
  shots: Shot[]
};

export type { GameStat };
