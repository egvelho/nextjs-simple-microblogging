import type { NextApiRequest, NextApiResponse } from "next";
import {
  verifyLoginCodeSchema,
  VerifyLoginCodeSchema,
} from "shared/schemas/verify-login-code-schema";
import { validateBody } from "server/handlers/validate-body";
import { allowedMethods } from "server/handlers/allowed-methods";
import { JWT } from "server/jwt";
import { getUserFromEmail } from "server/queries/get-user-from-email";
import { isCodeMatches } from "server/queries/is-code-matches";

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
  const results = await isCodeMatches(receivedCode);

  if (results) {
    const email = results.email;
    const user = await getUserFromEmail(email);
    const token = JWT.sign(email);

    res.status(200).json({ user, token });
  } else {
    res
      .status(200)
      .json({ errors: { verificationCode: [texts.invalidVerificationCode] } });
  }
}
