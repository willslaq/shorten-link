import { z } from "zod";

export const editUrlBodySchema = z.object({
  originalUrl: z.string().optional(),
  expirationDate: z.string().optional(),
});
