import { z } from "zod";

export const syncSocialMediaSchema = z.object({
    socialMedias: z.array(
        z.object({
            link: z.string().url("Invalid URL format")
        })
    )
    .optional() 
    .default([]) 
});

export type SyncSocialMediaInput = z.infer<typeof syncSocialMediaSchema>;