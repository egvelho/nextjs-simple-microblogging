import type { NextApiRequest, NextApiResponse } from "next";
import {
  requestLoginCodeSchema,
  RequestLoginCodeSchema,
} from "shared/schemas/request-login-code-schema";
import { allowedMethods } from "server/handlers/allowed-methods";
import { validateBody } from "server/handlers/validate-body";
import { JWT } from "server/jwt";
import { Email } from "server/email";

const texts = {
  emailCodeSubject: "Microblogue - Verificar email",
  emailCodeContent: (code: string) => `
    Seu código de verificação é: ${code}.
  `,
};

export default async function requestLoginCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  allowedMethods(req, res, ["POST"]);
  validateBody(req, res, requestLoginCodeSchema);

  const payload: RequestLoginCodeSchema = req.body;
  const code = generateCode();
  const email = payload.email;
  const token = JWT.sign({ code, email });

  Email.send({
    to: payload.email,
    subject: texts.emailCodeSubject,
    markdown: texts.emailCodeContent(code),
  });

  res.status(200).json({ token });
}

function generateCode() {
  return `${100000 + parseInt((Math.random() * 899999) as any)}`;
}
