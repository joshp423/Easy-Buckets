import z from "zod";

export const gameSchema = z.object({
  userId: z.number(),
  seasonId: z.number(),
  opponent: z.string(),
  date: z.coerce.date(),
});

export type Game = z.infer<typeof gameSchema>;
