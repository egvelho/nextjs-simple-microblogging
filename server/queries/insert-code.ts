import { getConnection, sql } from "server/get-connection";
import { getCodeHash } from "server/get-code-hash";

export async function insertCode({
  code,
  email,
}: {
  code: string;
  email: string;
}) {
  const query = sql`
    insert into tokens (
        "code",
        "email"
    ) values (
        ${getCodeHash(code)},
        ${email}
    );
  `;

  const connection = await getConnection();
  const post = await connection((routine) => routine.query(query));
  return post.rows[0];
}
