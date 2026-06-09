import z from "zod";

export const playerSchema = z.object({
    players: z.array(
        z.object({
            name: z.string(),
            number: z.number()
        })
    )
    
})

export type Player = z.infer <typeof playerSchema>