import z from "zod";

export const shotLogSchema = z.object({
  make: z.boolean(),
  X: z.number(),
  Y: z.number(),
  type: z.number(),
  timeStamp: z.number(),
});

export type ShotLog = z.infer<typeof shotLogSchema>;
