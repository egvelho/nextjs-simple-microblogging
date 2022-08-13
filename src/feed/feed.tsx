import React from "react";
import colors from "src/consts/colors.json";
import { spacing } from "src/utils/spacing";
import { resource } from "src/utils/resource";
import { FAButton, FAButtonProps } from "src/components/fa-button";
import { createPubSub } from "src/utils/create-pubsub";
import { Message, MessageProps } from "./message";
import { WritePostDialog } from "./write-post-dialog";

export type FeedProps = {
  messages: MessagePoolProps["messages"];
};

type MessageItem = MessageProps;

type MessagePoolProps = {
  messages: MessageItem[];
};

const fabPosition: FAButtonProps["position"] = [spacing(4), spacing(4)];

const toggleSignInDialog = createPubSub("toggleSignInDialog");

export function Feed({ messages }: FeedProps) {
  const [writePostDialogOpen, setWritePostDialogOpen] = React.useState(false);

  return (
    <div className="feed-wrapper">
      <WritePostDialog
        open={writePostDialogOpen}
        onRequestClose={() => setWritePostDialogOpen(false)}
      />
      <FAButton
        onClick={() => {
          const toggleOpen = true;
          //setWritePostDialogOpen(true);
          toggleSignInDialog.publish(toggleOpen);
        }}
        iconSrc={resource("writeMessageIcon")}
        position={fabPosition}
        secondaryColor
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
