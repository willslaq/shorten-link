import { z } from "zod";

export const redirectToOriginalUrlParamsSchema = z.object({
  shortenUrl: z.string(),
});
