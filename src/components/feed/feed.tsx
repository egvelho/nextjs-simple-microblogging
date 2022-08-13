import colors from "src/consts/colors.json";
import { spacing } from "src/utils/spacing";
import { resource } from "src/utils/resource";
import { FAButton, FAButtonProps } from "src/components/fa-button";
import { Message, MessageProps } from "./message";

export type FeedProps = {
  messages: MessagePoolProps["messages"];
};

type MessageItem = MessageProps;

type MessagePoolProps = {
  messages: MessageItem[];
};

const fabPosition: FAButtonProps["position"] = [spacing(4), spacing(4)];

export function Feed({ messages }: FeedProps) {
  return (
    <div className="feed-wrapper">
      <FAButton
        onClick={async () => {}}
        iconSrc={resource("writeMessageIcon")}
        position={fabPosition}
      />
      <div className="message-pool-wrapper">
        <MessagePool messages={messages} />
      </div>
      <style jsx>{`
        .feed-wrapper {
          margin: ${spacing(3)};
        }
      `}</style>
    </div>
  );
}

function MessagePool({ messages }: MessagePoolProps) {
  return (
    <div className="messages-pool">
      {messages.map((message) => (
        <Message {...message} key={message.id} />
      ))}
      <style jsx>
        {`
          :global(.message-wrapper:not(:last-child)) {
            border: 0;
            border-bottom: 1px;
            border-style: solid;
            border-color: ${colors.borderDark};
            margin-bottom: ${spacing(2)};
          }
        `}
      </style>
    </div>
  );
}
