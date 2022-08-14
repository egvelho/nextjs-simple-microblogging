import { DateTime } from "luxon";
import { Avatar, AvatarProps } from "client/components/avatar";
import { ClientRender } from "client/components/client-render";
import { spacing } from "client/utils/spacing";

export type MessageProps = {
  id: number;
  username: string;
  avatarSrc: AvatarProps["src"];
  createdAt: Date;
  content: string;
};

const avatarSize = 64;
const avatarSpacing = spacing(1);

export function Message({
  username,
  avatarSrc,
  createdAt,
  content,
}: MessageProps) {
  return (
    <div className="message-wrapper">
      <div className="message-header">
        <div className="message-avatar">
          <Avatar size={avatarSize} src={avatarSrc} />
        </div>
        <div className="message-title">
          <span className="message-username">{username}</span>
          <ClientRender>
            <time
              className="message-created-at"
              dateTime={createdAt.toISOString()}
            >
              {DateTime.fromJSDate(createdAt).toRelative()}
            </time>
          </ClientRender>
        </div>
      </div>
      <div className="message-content">
        <p>{content}</p>
      </div>
      <style jsx>{`
        .message-header {
          display: flex;
          align-items: center;
        }

        .message-title {
          display: flex;
          flex-direction: column;
        }

        .message-avatar {
          margin-right: ${avatarSpacing};
        }

        .message-username {
          font-size: 1em;
          letter-spacing: 0.1px;
          font-weight: 600;
          padding-bottom: ${spacing(0.4)};
        }

        .message-created-at {
          font-size: 0.8em;
        }

        .message-content {
          font-size: 1.25em;
          margin-left: calc(${avatarSize}px + ${avatarSpacing});
          margin-bottom: ${spacing(2)};
        }
      `}</style>
    </div>
  );
}
