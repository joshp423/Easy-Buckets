import z from "zod";

export const newPlayerSchema = z.object({
  name: z.string(),
  number: z.number(),
});

export type NewPlayer = z.infer<typeof newPlayerSchema>;
