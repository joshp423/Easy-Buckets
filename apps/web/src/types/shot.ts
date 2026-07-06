import z from "zod";

export const shotSchema = z.object({
  make: z.boolean(),
  X: z.number(),
  Y: z.number(),
  type: z.number(),
  timeStamp: z.number()
});

export type Shot = z.infer<typeof shotSchema>;
