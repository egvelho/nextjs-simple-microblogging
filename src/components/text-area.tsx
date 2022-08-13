import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { spacing } from "src/utils/spacing";

export type TextAreaProps = {
  value: string;
  onChange: (value: string) => Promise<void> | void;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  rows?: number;
  hintText?: React.ReactNode;
  maxLength?: number;
};

export function TextArea({
  value,
  onChange,
  primaryColor,
  secondaryColor,
  placeholder,
  rows,
  error,
  hintText,
  maxLength,
  disabled,
}: TextAreaProps) {
  const accentColor =
    (disabled && colors.disabled) ||
    (error && colors.error) ||
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

  return (
    <div className="text-area-wrapper">
      <textarea
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        className="text-area"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hintText && <span className="text-area-hint-text">{hintText}</span>}
      <style jsx>{`
        .text-area {
          display: block;
          box-sizing: border-box;
          width: 100%;
          border-style: solid;
          border-width: 1px;
          border-color: ${error ? colors.error : colors.borderDark};
          border-radius: ${layout.borderRadius.field};
          padding: ${spacing(1.5)};
          resize: none;
          outline-color: ${accentColor};
          outline-width: 1px;
        }

        .text-area:disabled,
        .text-area[disabled] {
          cursor: default;
        }

        .text-area:hover,
        .text-area:focus {
          border-width: 1px;
          border-color: ${accentColor};
        }

        .text-area-hint-text {
          color: ${error ? colors.error : colors.textDarkSecondary};
          font-size: ${layout.fontSize.hint};
          display: block;
          margin-top: ${spacing(0.8)};
        }
      `}</style>
    </div>
  );
}
