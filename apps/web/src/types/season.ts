import z from "zod";
import { gameSchema } from "./game";

export const seasonSchema = z.object({
  id: z.number(),
  name: z.string(),
  teamId: z.number(),
  dateCreated: z.coerce.date(),
  games: z.array(gameSchema),
});

export type Season = z.infer<typeof seasonSchema>;
