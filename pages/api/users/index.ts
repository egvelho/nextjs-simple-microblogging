import { NextApiRequest, NextApiResponse } from "next";
import { getConnection, sql } from "server/get-connection";
import type { UserSchema } from "shared/schemas/user-schema";

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const connection = await getConnection();
    const users = await connection((conn) =>
      conn.many<UserSchema>(sql`select * from users`)
    );
    res.status(200).json(users);
  }
}
