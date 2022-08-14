import { PostSchema } from "shared/schemas/post-schema";
import { getConnection, sql } from "server/get-connection";

export async function insertPost(nextPost: PostSchema) {
  const query = sql`
        insert into posts (
            "message",
            "userId"
        ) values (
            ${nextPost.message},
            ${nextPost.userId}
        ) returning *;`;

  const connection = await getConnection();
  const post = await connection((routine) => routine.query<PostSchema>(query));
  return post.rows[0];
}
