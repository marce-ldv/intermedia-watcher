import * as z from "zod";

export const createCoinSchema = z.object({
  id: z.string().min(2, { message: "The id must be at least 2 characters" }),
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
