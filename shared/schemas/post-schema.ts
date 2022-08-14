import { z } from "zod";

export type PostSchema = z.infer<typeof postSchema>;

export const postSchema = z.object({
  message: z.string(),
  userId: z.number(),
  createdAt: z.number().optional(),
});
