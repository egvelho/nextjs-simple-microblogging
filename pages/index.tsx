import type { GetStaticProps } from "next";
import { Feed } from "client/feed/feed";
import { getConnection, sql } from "server/get-connection";
import { PostSchema } from "shared/schemas/post-schema";
import type { UserSchema } from "shared/schemas/user-schema";
import { Resource } from "client/utils/resource";

type Message = PostSchema & UserSchema;

type HomeProps = {
  latestPosts: readonly Message[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
      limit 10`
    )
  );

  return {
    props: {
      latestPosts,
    },
    revalidate: 10,
  };
};

export default function Home({ latestPosts }: HomeProps) {
  const messages = latestPosts.map((post) => ({
    id: post.id as number,
    username: post.username,
    avatarSrc: post.avatar as Resource,
    content: post.message,
    createdAt: new Date(post.createdAt as number),
  }));

  return (
    <div>
      <Feed messages={messages} />
    </div>
  );
}
