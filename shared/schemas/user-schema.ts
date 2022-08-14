import { z } from "zod";

export const texts = {
  minLengthMessage(min: number) {
    return `Este campo deve conter pelo menos ${min} caracteres`;
  },
  maxLengthMessage(max: number) {
    return `Este campo deve conter no máximo ${max} caracteres`;
  },
  usernameInvalidMessage: "O apelido deve ter apenas letras e números",
  usernameAlreadyExists: "Já existe um usuário cadastrado com esse apelido",
  emptyFieldMessage: "Este campo não pode ficar vazio",
};

export type UserSchema = z.infer<typeof userSchema>;

export const userSchema = z.object({
  username: z
    .string()
    .min(1, texts.emptyFieldMessage)
    .min(2, texts.minLengthMessage(4))
    .max(16, texts.maxLengthMessage(16))
    .regex(/^[a-zA-Z0-9]$/g),
  firstName: z
    .string()
    .min(1, {
      message: texts.emptyFieldMessage,
    })
    .min(2, texts.minLengthMessage(2))
    .max(24, texts.maxLengthMessage(24)),
  lastName: z
    .string()
    .min(1, {
      message: texts.emptyFieldMessage,
    })
    .min(2, texts.minLengthMessage(2))
    .max(32, texts.maxLengthMessage(32)),
  avatar: z.string().optional(),
  id: z.number().optional(),
  createdAt: z.number().optional(),
});
