import { z } from "zod";

export const jobCategoryCreateSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  description: z.string().optional(),
});

export const jobCategoryUpdateSchema = jobCategoryCreateSchema.partial();