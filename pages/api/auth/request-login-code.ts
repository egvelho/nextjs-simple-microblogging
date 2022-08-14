import { NextApiRequest, NextApiResponse } from "next";
import {
  requestLoginCodeSchema,
  RequestLoginCodeSchema,
} from "shared/schemas/request-login-code-schema";
import { getConnection, sql } from "server/get-connection";
import { JWT } from "server/jwt";
import { Email } from "server/email";

const texts = {
  emailCodeSubject: "Microblogue - verificar o seu email",
  emailCodeContent: (code: string) => `
    Seu código de verificação é: ${code}
  `,
};

export default async function requestLoginCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload: RequestLoginCodeSchema = req.body;
    const payloadValid = requestLoginCodeSchema.safeParse(req.body);

    if (payloadValid) {
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
  }
}

function generateCode() {
  return `${100000 + parseInt((Math.random() * 899999) as any)}`;
}
