import z from 'zod';

export const ForgotSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .max(100),
});

export type ForgotType = z.infer<typeof ForgotSchema>;
