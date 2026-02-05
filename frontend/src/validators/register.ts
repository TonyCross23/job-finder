import { z } from "zod";

export const step1Schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const step2Schema = z.object({
  code: z.string().min(6, "Verification code is required"),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
