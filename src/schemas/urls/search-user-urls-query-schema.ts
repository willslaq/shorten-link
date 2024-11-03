import { z } from "zod";

export const searchUsersUrlsQuerySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().optional().default(1),
});
