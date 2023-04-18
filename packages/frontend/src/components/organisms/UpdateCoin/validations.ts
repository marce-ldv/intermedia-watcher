import * as z from "zod";

export const updateCoinSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The name must be at least 2 characters" }),
  symbol: z
    .string()
    .min(2, { message: "The symbol must be at least 2 characters" }),
  logo: z
    .string()
    .min(2, { message: "The logo must be at least 2 characters" }),
  canFavorite: z.boolean(),
});
