import type { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";

export function validateBody<T extends z.ZodRawShape>(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: z.ZodObject<T>
) {
  const results = schema.safeParse(req.body);
  if (!results.success) {
    const errors = results.error.errors.reduce(
      (stack, item) => {
        stack[item.path[0] as keyof T] = (
          (stack[item.path[0] as keyof T] || []) as string[]
        ).concat(item.message);
        return stack;
      },
      {} as Partial<{
        [key in keyof T]: string[];
      }>
    );

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).end(JSON.stringify({ errors }));
  }
}
