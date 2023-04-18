import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .min(4, { message: "The email must be at least 4 characters" }),
  password: z
    .string()
    .min(4, { message: "The password must be at least 4 characters" }),
});
