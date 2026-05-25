import z from "zod";
import { gameStatSchema } from "./gameStat";

export const gameSchema = z.object({
  userId: z.number(),
  seasonId: z.number(),
  opponent: z.string(),
  date: z.coerce.date(),
  gameStats: z.array(gameStatSchema)
});

export type Game = z.infer<typeof gameSchema>;
