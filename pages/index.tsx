import type { GetStaticProps } from "next";
import { Feed } from "client/feed/feed";
import { generateMessages, GeneratedMessage } from "shared/generate-messages";

type HomeProps = {
  lastMessages: GeneratedMessage[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const lastMessages = generateMessages(10);

  return {
    props: {
      lastMessages,
    },
    revalidate: 10,
  };
};

export default function Home({ lastMessages }: HomeProps) {
  const messages = lastMessages.map((message) => ({
    ...message,
    createdAt: new Date(message.createdAt),
  }));

  return (
    <div>
      <Feed messages={messages} />
    </div>
  );
}
