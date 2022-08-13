import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { spacing } from "src/utils/spacing";
import { Link, LinkProps } from "src/components/link";
import { Spinner } from "src/components/spinner";

export type ButtonProps = {
  label: string;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => Promise<void> | void;
} & (Omit<LinkProps, "children"> | {});

export function Button({
  label,
  disabled,
  primaryColor,
  secondaryColor,
  loading,
  onClick,
  ...linkProps
}: ButtonProps) {
  const accentColor =
    (disabled && colors.disabled) ||
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

  const button = (
    <>
      <button
        disabled={disabled || loading}
        className="button"
        onClick={onClick}
      >
        {loading ? (
          <Spinner
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ) : (
          label
        )}
      </button>
      <style jsx>{`
        .button:hover {
          opacity: ${colors.buttonHoverOpacity};
          cursor: pointer;
        }

        .button:disabled,
        .button[disabled] {
          cursor: default;
        }

        .button {
          background-color: transparent;
          width: 100%;
          text-transform: uppercase;
          border-style: solid;
          border-width: 1px;
          border-radius: ${layout.borderRadius.button};
          border-color: ${accentColor};
          color: ${accentColor};
          padding: ${spacing(1.5)} ${spacing(3)};
        }
      `}</style>
    </>
  );

  if ("href" in linkProps && !disabled) {
    return <Link {...linkProps}>{button}</Link>;
  } else {
    return button;
  }
}
