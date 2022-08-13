import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { spacing } from "src/utils/spacing";
import type { InputHTMLAttributes } from "react";

export type InputFieldProps = {
  value: string;
  onChange: (value: string) => Promise<void> | void;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  hintText?: React.ReactNode;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
};

export function InputField({
  value,
  onChange,
  primaryColor,
  secondaryColor,
  placeholder,
  disabled,
  error,
  hintText,
  maxLength,
  type,
}: InputFieldProps) {
  const accentColor =
    (error && colors.error) ||
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

  return (
    <div className="input-field-wrapper">
      <input
        type={type}
        className="input-field"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
      {hintText && (
        <span
          className="input-field-hint-text"
          style={{
            color: error ? colors.error : colors.textDarkSecondary,
            fontSize: layout.fontSize.hint,
          }}
        >
          {hintText}
        </span>
      )}
      <style jsx>{`
        .input-field {
          width: 100%;
          box-sizing: border-box;
          border-style: solid;
          border-width: 1px;
          border-color: ${error ? colors.error : colors.borderDark};
          border-radius: ${layout.borderRadius.field};
          padding: ${spacing(1.5)};
          resize: none;
          outline-color: ${accentColor};
        }

        .input-field:disabled,
        .input-field[disabled] {
          cursor: default;
        }

        .input-field:hover,
        .input-field:focus {
          border-width: 1px;
          border-color: ${accentColor};
        }
      `}</style>
    </div>
  );
}
