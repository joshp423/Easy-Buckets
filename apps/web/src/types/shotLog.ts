import z from "zod";

const shotLog = z.object({
    id: z.number(),
    gameStatlineId: z.number(),
  make: z.boolean(),
  X: z.number(),
  Y: z.number(),
  type: z.number(),
  timeStamp: z.number(),
  gameStatLine: z.object({
    player: z.object({
        name: z.string(),
        number: z.number
    })
  })
})

export const shotLogSchema= z.array(shotLog);

export type ShotLog = z.infer<typeof shotLogSchema>;
