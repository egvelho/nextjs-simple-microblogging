import type { NextApiRequest, NextApiResponse } from "next";
import {
  requestLoginCodeSchema,
  RequestLoginCodeSchema,
} from "shared/schemas/request-login-code-schema";
import { allowedMethods } from "server/handlers/allowed-methods";
import { validateBody } from "server/handlers/validate-body";
import { insertCode } from "server/queries/insert-code";
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

  await Email.send({
    to: payload.email,
    subject: texts.emailCodeSubject,
    markdown: texts.emailCodeContent(code),
  });

  await insertCode({ code, email });

  res.status(200).json({});
}

function generateCode() {
  return `${100000 + parseInt((Math.random() * 899999) as any)}`;
}
