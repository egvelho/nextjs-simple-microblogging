import { NextApiRequest, NextApiResponse } from "next";
import { getConnection, sql } from "server/get-connection";
import type { UserSchema } from "shared/schemas/user-schema";

export default async function usersId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const connection = await getConnection();
    const user = await connection((conn) =>
      conn.one<UserSchema>(
        sql`select * from users where id=${req.query.id as string}`
      )
    );
    res.status(200).json(user);
  }
}
