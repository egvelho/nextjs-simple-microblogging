import { z } from "zod";

export const texts = {
  verificationCodeLength: (length: number) =>
    `O código de verificação deve possuir ${length} números`,
  verificationCodeInvalid: "O código de verificação está incorreto",
  emptyFieldMessage: "Este campo não pode ficar vazio",
};

export type VerifyLoginCodeSchema = z.infer<typeof verifyLoginCodeSchema>;

export const verifyLoginCodeSchema = z.object({
  verificationCode: z
    .string()
    .min(1, texts.emptyFieldMessage)
    .length(6, texts.verificationCodeLength(6))
    .regex(/^[0-9]$/g, texts.verificationCodeLength(6)),
});
