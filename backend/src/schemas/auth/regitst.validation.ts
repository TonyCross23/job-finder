import { z } from 'zod';

export const RegisterSchema = z
  .object({
    username: z.string().trim().nonempty({ message: 'Name is required' }).max(100),
    email: z
      .string()
      .trim()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email address' })
      .max(100),
    code: z.string().length(6).nonempty({ message: 'code is required' }),
    password: z.string().trim().nonempty({ message: 'Password is required' }).max(100),
    confirmPassword: z
      .string()
      .trim()
      .nonempty({ message: 'Confirm Password is required' })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;
