import z from 'zod';

export const locationSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }).max(100),
});

export type LocationType = z.infer<typeof locationSchema>;
