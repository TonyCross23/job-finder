import z from 'zod';

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email address' })
      .max(100),
    code: z.string().length(6).nonempty({ message: 'code is required' }),
    newPassword: z.string().trim().nonempty({ message: 'Password is required' }).max(100),
    confirmPassword: z
      .string()
      .trim()
      .nonempty({ message: 'Confirm Password is required' })
      .max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
