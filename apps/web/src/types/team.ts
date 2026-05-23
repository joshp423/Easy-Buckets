import z from "zod";
import { seasonOverviewSchema } from "./seasonOverview";

export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
  seasons: z.array(seasonOverviewSchema),
});

export type Team = z.infer<typeof teamSchema>;
