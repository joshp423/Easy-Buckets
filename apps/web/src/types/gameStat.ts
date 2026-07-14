import z from "zod";
import { shotSchema } from "./shot";

export const gameStatSchema = z.object({
  id: z.number(),
  gameId: z.number(),
  playerId: z.number(),
  twoPointFGMiss: z.number(),
  twoPointFGMake: z.number(),
  twoPointFGA: z.number(),
  threePointFGMiss: z.number(),
  threePointFGMake: z.number(),
  threePointFGA: z.number(),
  fTMiss: z.number(),
  fTMake: z.number(),
  fTA: z.number(),
  oReb: z.number(),
  dReb: z.number(),
  assist: z.number(),
  block: z.number(),
  steal: z.number(),
  turnover: z.number(),
  pF: z.number(),
  twoPointFGPercent: z.number(),
  threePointFGPercent: z.number(),
  fTPercent: z.number(),
  totalRebounds: z.number(),
  points: z.number(),
  player: z.object({
    id: z.number(),
    name: z.string(),
    number: z.number(),
  }),
  shots: z.array(shotSchema).optional(),
});

export type GameStat = z.infer<typeof gameStatSchema>;
