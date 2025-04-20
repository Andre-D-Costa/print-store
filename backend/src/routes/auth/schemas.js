import { z } from "zod";

export const authSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();
