import { z } from "zod";

export type UserSchema = z.infer<typeof userSchema>;

export const userSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatar: z.string(),
  id: z.number(),
});
