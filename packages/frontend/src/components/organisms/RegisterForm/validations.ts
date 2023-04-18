import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "The name must be at least 4 characters" }),
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .min(4, { message: "The email must be at least 4 characters" }),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 characters" })
    .regex(/[a-zA-Z0-9]/, { message: "The password must be alphanumeric" }),
  role: z.enum(["user", "admin"]).optional(),
});
