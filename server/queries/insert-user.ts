import type { UserSchema } from "shared/schemas/user-schema";
import { getConnection, sql } from "server/get-connection";

export async function insertUser(nextUser: UserSchema) {
  const query = sql`
        insert into users (
            "username",
            "firstName",
            "lastName",
            "email",
            "avatar"
        ) values (
            ${nextUser.username},
            ${nextUser.firstName},
            ${nextUser.lastName},
            ${nextUser.email as string},
            ${nextUser.avatar as string}
        ) returning *;`;

  const connection = await getConnection();
  const user = await connection((routine) => routine.query<UserSchema>(query));
  return user.rows[0];
}
