import { z } from "zod";

export const registerBodySchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});
