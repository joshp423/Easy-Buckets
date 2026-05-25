import z from "zod";

export const seasonOverviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  teamId: z.number(),
  dateCreated: z.coerce.date(),
});

export type SeasonOverview = z.infer<typeof seasonOverviewSchema>;

//transfer other types to zod object
