import type { UserSchema } from "shared/schemas/user-schema";
import { getConnection, sql } from "server/get-connection";

export async function checkUsernameUnique(username: string) {
  const connection = await getConnection();
  const maybeUser = await connection((routine) =>
    routine.maybeOne<UserSchema>(
      sql`select id from users where username=${username}`
    )
  );
  return maybeUser === null;
}
