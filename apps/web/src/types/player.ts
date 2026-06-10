import z from "zod";

export const playerSchema = z.object({
    name: z.string(),
    number: z.number()
})

export type Player = z.infer <typeof playerSchema>