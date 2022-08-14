import { z } from "zod";

export const texts = {
  emailInvalidMessage: "Este email é inválido",
  emptyFieldMessage: "Este campo não pode ficar vazio",
};

export type SubmitEmailSchema = z.infer<typeof submitEmailSchema>;

export const submitEmailSchema = z.object({
  email: z
    .string()
    .min(1, texts.emptyFieldMessage)
    .email(texts.emailInvalidMessage),
});
