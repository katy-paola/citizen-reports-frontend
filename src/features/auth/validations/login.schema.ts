import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),

  password: z.string().trim().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;
