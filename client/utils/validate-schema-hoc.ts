import type { z } from "zod";

export function validateSchemaHOC<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): (
  form: typeof schema["_type"]
) => Promise<Partial<{ [key in keyof T]: string[] }>> {
  return async (form) => {
    const results = await schema.safeParseAsync(form);

    if (results.success) {
      return {};
    } else {
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

      return errors;
    }
  };
}
