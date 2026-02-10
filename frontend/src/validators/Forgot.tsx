import z from "zod";

export const forgorSchema = z.object({
    email: z.string().email("Invalid email"), 
})

export type ForgortInput = z.infer<typeof forgorSchema>