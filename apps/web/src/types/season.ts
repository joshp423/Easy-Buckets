import z from "zod";
import { gameSchema} from "./game";

export const seasonSchema = z.object({
  id: z.boolean(),
  name: z.string(),
  teamId: z.number(),
  dateCreated: z.date(),
  games: z.array(gameSchema)
});

export type Season = z.infer<typeof seasonSchema>;