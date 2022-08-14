import React from "react";
import { Button } from "src/components/button";
import { InputField } from "src/components/input-field";
import { spacing } from "src/utils/spacing";
import type { FormInput } from "src/utils/use-form";

export type CreateAccountFormProps = {
  form: CreateAccountFormInputs;
  onSubmit: () => Promise<void> | void;
  loading: boolean;
};

export type CreateAccountFormInputs = {
  username: FormInput<string>;
  firstName: FormInput<string>;
  lastName: FormInput<string>;
};

const texts = {
  submitButton: "Criar conta",
};

export function CreateAccountForm({
  form,
  onSubmit,
  loading,
}: CreateAccountFormProps) {
  const firstNameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={form.firstName.label}
        value={form.firstName.value}
        disabled={loading}
        helperText={form.firstName.helperText}
        error={form.firstName.error}
        onChange={(firstName) => form.firstName.onChange(firstName)}
        onFocus={() => form.firstName.onFocus()}
        onBlur={() => form.firstName.onBlur()}
      />
    </div>
  );

  const lastNameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={form.lastName.label}
        value={form.lastName.value}
        disabled={loading}
        helperText={form.lastName.helperText}
        error={form.lastName.error}
        onChange={(lastName) => form.lastName.onChange(lastName)}
        onFocus={() => form.lastName.onFocus()}
        onBlur={() => form.lastName.onBlur()}
      />
    </div>
  );

  const usernameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={form.lastName.label}
        value={form.username.value}
        disabled={loading}
        helperText={form.username.helperText}
        error={form.username.error}
        onChange={(username) => form.username.onChange(username)}
        onFocus={() => form.username.onFocus()}
        onBlur={() => form.username.onBlur()}
      />
    </div>
  );

  return (
    <form
      className="submit-email-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {firstNameField}
      {lastNameField}
      {usernameField}
      <Button formSubmit label={texts.submitButton} />
      <style jsx>{`
        :global(.input-field-wrapper) {
          margin-bottom: ${spacing(0.75)};
        }
      `}</style>
    </form>
  );
}
