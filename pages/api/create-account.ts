import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { userSchema, UserSchema } from "shared/schemas/user-schema";
import { getConnection, sql } from "server/get-connection";
import { JWT } from "server/jwt";

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload: UserSchema = req.body;
    const payloadValid = userSchema.safeParse(req.body);

    if (payloadValid) {
      const decodedEmail = await JWT.verify(
        (req.headers["authorization"] || "").split("Bearer ")[1]
      );

      if (decodedEmail !== undefined) {
        const connection = await getConnection();
        const user = await connection((routine) =>
          routine.query<UserSchema>(
            sql`insert into users (
                "username",
                "firstName",
                "lastName",
                "email",
                "avatar"
              ) values (${payload.username}, ${payload.firstName}, ${
              payload.lastName
            }, ${
              decodedEmail as string
            }, ${faker.internet.avatar()}) returning id;`
          )
        );

        res.status(200).json({ user });
      }
    }
  }
}
