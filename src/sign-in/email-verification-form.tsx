import React from "react";
import { Button } from "src/components/button";
import { InputField } from "src/components/input-field";
import { spacing } from "src/utils/spacing";

export type EmailVerificationFormProps = {
  form: EmailVerificationFormFields;
  setForm: (form: EmailVerificationFormFields) => Promise<void> | void;
  step: EmailVerificationFormStep;
  onSubmit: () => Promise<void> | void;
};

export type EmailVerificationFormFields = {
  email: string;
  verificationCode: string;
};

export type EmailVerificationFormStep =
  | "SUBMIT_EMAIL_STEP"
  | "VERIFY_EMAIL_STEP";

const texts = {
  emailPlaceholder: "Email",
  verificationCodePlaceholder: "Código de verificação",
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
  setForm,
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
          placeholder={texts.emailPlaceholder}
          value={form.email}
          onChange={(email) => {
            setForm({ ...form, email });
          }}
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
  setForm,
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
          type="email"
          placeholder={texts.verificationCodePlaceholder}
          value={form.verificationCode}
          onChange={(verificationCode) => {
            setForm({ ...form, verificationCode });
          }}
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
