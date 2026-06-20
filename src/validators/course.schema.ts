import { z } from "zod";

export const courseSchema = z.object({
  code: z.string().min(2).max(12).transform((value) => value.toUpperCase()),
  title: z.string().min(2).max(120),
  level: z.string(),
  credits: z.coerce.number().min(1).max(6)
});
