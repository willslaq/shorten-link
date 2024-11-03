import { z } from "zod";

export const createShortenUrlBodySchema = z.object({
  originalUrl: z.string().url(),
  expirationDate: z.coerce.date().optional(),
});
