import type { NextApiRequest, NextApiResponse } from "next";
import type { UserSchema } from "shared/schemas/user-schema";
import { jwtAuthToken } from "server/helpers/jwt-auth-token";
import { getUserFromEmail } from "server/queries/get-user-from-email";

export async function authUser(req: NextApiRequest, res: NextApiResponse) {
  const email = await jwtAuthToken(req, res);
  if (!email) {
    return null;
  }

  const user = await getUserFromEmail(email);

  if (user === null) {
    res.status(401).end(`Unauthorized`);
    return null;
  }

  return user as UserSchema;
}
