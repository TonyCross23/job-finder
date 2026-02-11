import z from "zod";

export const formSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    locationId: z.string().min(1, "Location is required"),
    address: z.string().nullish().catch(""),
    description: z.string().nullish().catch(""),
});

export type FormValues = z.infer<typeof formSchema>;