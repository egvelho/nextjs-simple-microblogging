import { z } from "zod";
import app from "shared/consts/app.json";

export const texts = {
  minLengthMessage(min: number) {
    return `Sua mensagem deve conter pelo menos ${min} caracteres`;
  },
  maxLengthMessage(max: number) {
    return `Sua mensagem deve conter até ${max} caracteres`;
  },
  invalidMessageContent: "Essa mensagem possui caracteres inválidos",
  emptyFieldMessage: "Este campo não pode ficar vazio",
};

export type PostSchema = z.infer<typeof postSchema>;

export const postSchema = z.object({
  message: z
    .string()
    .min(1, texts.emptyFieldMessage)
    .min(2, texts.minLengthMessage(2))
    .max(app.messageMaxSize, texts.maxLengthMessage(app.messageMaxSize)),
  id: z.number().optional(),
  createdAt: z.number().optional(),
});
