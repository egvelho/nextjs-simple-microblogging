import type { Resource } from "client/utils/resource";
import colors from "shared/consts/colors.json";
import layout from "shared/consts/layout.json";

export type FAButtonProps = {
  onClick: () => Promise<void> | void;
  iconSrc: Resource;
  position: [number | string, number | string];
  primaryColor?: boolean;
  secondaryColor?: boolean;
};

const size = 56;
const iconSize = 32;

export function FAButton({
  iconSrc,
  onClick,
  position: [bottom, right],
  primaryColor,
  secondaryColor,
}: FAButtonProps) {
  const backgroundColor =
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

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
          opacity: ${colors.buttonHoverOpacity};
        }
      `}</style>
    </button>
  );
}
