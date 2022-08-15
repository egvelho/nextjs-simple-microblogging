import { getConnection, sql } from "server/get-connection";
import { getCodeHash } from "server/get-code-hash";

export async function isCodeMatches(code: string) {
  const connection = await getConnection();
  const token = await connection((routine) =>
    routine.maybeOne<{ email: string; code: string }>(
      sql`select * from tokens where code=${getCodeHash(code)}`
    )
  );

  if (token) {
    await dropCodes(token.email);
  }

  return token;
}

export async function dropCodes(email: string) {
  const query = sql`
    delete from tokens
    where email=${email}
  `;

  const connection = await getConnection();
  const post = await connection((routine) => routine.query(query));
  return post.rows[0];
}
