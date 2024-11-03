import { z } from "zod";

export const deleteUrlParamsSchema = z.object({
  id: z.string().uuid(),
});
