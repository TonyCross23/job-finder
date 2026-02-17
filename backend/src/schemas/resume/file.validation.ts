import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const fileSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((type) => ACCEPTED_FILE_TYPES.includes(type), {
    message: "Only .pdf files are allowed",
  }),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
  buffer: z.any() // Physical file content
});