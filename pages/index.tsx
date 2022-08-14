import type { GetStaticProps } from "next";
import { Feed } from "client/feed/feed";
import { Resource } from "client/utils/resource";
import { getLatestPosts, LatestPosts } from "server/queries/get-latest-posts";

type HomeProps = {
  latestPosts: LatestPosts;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const latestPosts = await getLatestPosts();

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
