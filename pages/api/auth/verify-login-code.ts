import type { NextApiRequest, NextApiResponse } from "next";
import {
  verifyLoginCodeSchema,
  VerifyLoginCodeSchema,
} from "shared/schemas/verify-login-code-schema";
import { validateBody } from "server/handlers/validate-body";
import { allowedMethods } from "server/handlers/allowed-methods";
import { JWT } from "server/jwt";
import { getUserFromEmail } from "server/queries/get-user-from-email";

const texts = {
  invalidVerificationCode: "O código de verificação é inválido",
};

export default async function verifyLoginCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  allowedMethods(req, res, ["POST"]);
  validateBody(req, res, verifyLoginCodeSchema);

  const payload: VerifyLoginCodeSchema = req.body;
  const receivedCode = payload.verificationCode;
  const decodedPayload = JWT.verify(payload.token);

  if (decodedPayload !== undefined) {
    const { email, code } = decodedPayload as any;
    const validationSuccess = receivedCode === code;

    if (validationSuccess) {
      const user = await getUserFromEmail(email);
      const token = JWT.sign(email);

      res.status(200).json({ user, token });
    }
  }

  res
    .status(200)
    .json({ errors: { verificationCode: [texts.invalidVerificationCode] } });
}
