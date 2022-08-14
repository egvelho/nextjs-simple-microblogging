import { getConnection, sql } from "server/get-connection";
import type { PostSchema } from "shared/schemas/post-schema";
import type { UserSchema } from "shared/schemas/user-schema";

export type LatestPosts = (PostSchema & UserSchema)[];

export async function getLatestPosts(): Promise<LatestPosts> {
  const connection = await getConnection();
  const latestPosts = await connection((routine) =>
    routine.many<PostSchema & UserSchema>(
      sql`
      select
        posts.id,
        posts.message,
        posts."createdAt",
        users.avatar,
        users.username
      from posts
      left join users on users.id = "userId"
      order by posts."createdAt" desc
      limit 10`
    )
  );

  return latestPosts as any;
}
