import React from "react";
import { Button } from "src/components/button";
import { InputField } from "src/components/input-field";
import { spacing } from "src/utils/spacing";
import type { FormInput } from "src/utils/use-form";

export type EmailVerificationFormProps = {
  form: EmailVerificationFormInputs;
  step: EmailVerificationFormStep;
  onSubmit: () => Promise<void> | void;
  loading: boolean;
};

export type EmailVerificationFormInputs = {
  email: FormInput<string>;
  verificationCode: FormInput<string>;
};

export type EmailVerificationFormStep =
  | "SUBMIT_EMAIL_STEP"
  | "VERIFY_EMAIL_STEP";

const texts = {
  submitEmailButton: "Verificar email",
  verifyEmailButton: "Continuar",
};

export function EmailVerificationForm(props: EmailVerificationFormProps) {
  switch (props.step) {
    case "SUBMIT_EMAIL_STEP":
      return <SubmitEmailForm {...props} />;
    case "VERIFY_EMAIL_STEP":
      return <VerifyEmailForm {...props} />;
    default:
      return null;
  }
}

function SubmitEmailForm({
  form,
  loading,
  onSubmit,
}: EmailVerificationFormProps) {
  return (
    <form
      className="submit-email-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="email-input-field">
        <InputField
          type="email"
          placeholder={form.email.label}
          value={form.email.value}
          disabled={loading}
          helperText={form.email.helperText}
          error={form.email.error}
          onChange={(firstName) => form.email.onChange(firstName)}
          onFocus={() => form.email.onFocus()}
          onBlur={() => form.email.onBlur()}
        />
      </div>
      <Button formSubmit label={texts.submitEmailButton} />
      <style jsx>{`
        .email-input-field {
          margin-bottom: ${spacing(0.75)};
        }
      `}</style>
    </form>
  );
}

function VerifyEmailForm({
  form,
  loading,
  onSubmit,
}: EmailVerificationFormProps) {
  return (
    <form
      className="verify-email-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="verification-code-input-field">
        <InputField
          type="text"
          placeholder={form.verificationCode.label}
          value={form.verificationCode.value}
          disabled={loading}
          helperText={form.verificationCode.helperText}
          error={form.verificationCode.error}
          onChange={(firstName) => form.verificationCode.onChange(firstName)}
          onFocus={() => form.verificationCode.onFocus()}
          onBlur={() => form.verificationCode.onBlur()}
        />
      </div>
      <Button formSubmit label={texts.verifyEmailButton} />
      <style jsx>{`
        .verification-code-input-field {
          margin-bottom: ${spacing(0.75)};
        }
      `}</style>
    </form>
  );
}
