import z from "zod";
import { gameStatSchema } from "./gameStat";

export const gameSchema = z.object({
  id: z.number(),
  seasonId: z.number(),
  opponent: z.string(),
  date: z.coerce.date(),
  replay: z.url(),
  gameStatlines: z.array(gameStatSchema),
});

export type Game = z.infer<typeof gameSchema>;
