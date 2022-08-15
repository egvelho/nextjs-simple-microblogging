import type { NextApiRequest, NextApiResponse } from "next";
import {
  requestLoginCodeSchema,
  RequestLoginCodeSchema,
} from "shared/schemas/request-login-code-schema";
import { allowedMethods } from "server/helpers/allowed-methods";
import { validateBody } from "server/helpers/validate-body";
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
  const allowed = allowedMethods(req, res, ["POST"]);
  if (!allowed) {
    return;
  }

  const valid = validateBody(req, res, requestLoginCodeSchema);
  if (!valid) {
    return;
  }

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
