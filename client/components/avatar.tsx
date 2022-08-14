import type { Resource } from "client/utils/resource";

export type AvatarProps = {
  src?: Resource;
  size?: number;
};

export function Avatar({ src, size = 48 }: AvatarProps) {
  return (
    <img
      src={src}
      style={{
        borderRadius: size / 2,
        width: size,
        height: size,
      }}
    />
  );
}
