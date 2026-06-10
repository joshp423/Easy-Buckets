import z from "zod";

export const playerSchema = z.object({
    id: z.number(),
    name: z.string(),
    number: z.number()
})

export type Player = z.infer <typeof playerSchema>