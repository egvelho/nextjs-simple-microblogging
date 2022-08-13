import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import type { Resource } from "src/utils/resource";

export type FAButtonProps = {
  onClick: () => Promise<void>;
  backgroundColor?: string;
  iconSrc: Resource;
  position: [number | string, number | string];
};

const size = 56;
const iconSize = 32;

export function FAButton({
  iconSrc,
  onClick,
  position: [bottom, right],
  backgroundColor = colors.secondary,
}: FAButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        position: "fixed",
        bottom,
        right,
        zIndex: layout.level.fab,
      }}
    >
      <img
        src={iconSrc}
        style={{
          width: iconSize,
          height: iconSize,
        }}
      />
      <style jsx>{`
        :hover {
          cursor: pointer;
          opacity: 0.9;
        }
      `}</style>
    </button>
  );
}
