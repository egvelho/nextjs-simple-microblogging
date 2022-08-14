import type { UserSchema } from "shared/schemas/user-schema";
import { getConnection, sql } from "server/get-connection";

export async function getUserFromEmail(email: string) {
  const connection = await getConnection();
  return await connection((routine) =>
    routine.maybeOne<UserSchema>(sql`select * from users where email=${email}`)
  );
}
