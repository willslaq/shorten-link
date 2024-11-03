import { z } from "zod";

export const editUrlParamsSchema = z.object({
  id: z.string().uuid(),
});
