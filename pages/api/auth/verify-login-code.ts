import { NextApiRequest, NextApiResponse } from "next";
import {
  verifyLoginCodeSchema,
  VerifyLoginCodeSchema,
} from "shared/schemas/verify-login-code-schema";
import type { UserSchema } from "shared/schemas/user-schema";
import { getConnection, sql } from "server/get-connection";
import { JWT } from "server/jwt";

export default async function verifyLoginCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload: VerifyLoginCodeSchema = req.body;
    const payloadValid = verifyLoginCodeSchema.safeParse(req.body);

    if (payloadValid) {
      const receivedCode = payload.verificationCode;
      const decodedPayload = JWT.verify(payload.token);

      if (decodedPayload !== undefined) {
        const { email, code } = decodedPayload as any;
        const validationSuccess = receivedCode === code;

        if (validationSuccess) {
          const connection = await getConnection();
          const maybeUser = await connection((routine) =>
            routine.maybeOne<UserSchema>(
              sql`select * from users where email=${email}`
            )
          );

          if (maybeUser) {
            res.status(200).json({ user: maybeUser, token: JWT.sign(email) });
          } else {
            res.status(200).json({ token: JWT.sign(email) });
          }
        }
      }
    }
  }
}
