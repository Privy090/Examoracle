import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const signupSchema = loginSchema.extend({
  fullName: z.string().min(2),
  school: z.string().min(2),
  faculty: z.string().min(2),
  department: z.string().min(2)
});
