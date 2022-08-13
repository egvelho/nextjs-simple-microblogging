import React from "react";
import { Button } from "src/components/button";
import { InputField } from "src/components/input-field";
import { spacing } from "src/utils/spacing";

export type CreateAccountFormProps = {
  form: CreateAccountFormFields;
  setForm: (form: CreateAccountFormFields) => Promise<void> | void;
  onSubmit: () => Promise<void> | void;
};

export type CreateAccountFormFields = {
  username: string;
  firstName: string;
  lastName: string;
};

const texts = {
  usernamePlaceholder: "Apelido",
  firstNamePlaceholder: "Nome",
  lastNamePlaceholder: "Sobrenome",
  submitButton: "Criar conta",
};

export function CreateAccountForm({
  form,
  setForm,
  onSubmit,
}: CreateAccountFormProps) {
  const firstNameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={texts.firstNamePlaceholder}
        value={form.firstName}
        onChange={(firstName) => {
          setForm({ ...form, firstName });
        }}
      />
    </div>
  );

  const lastNameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={texts.lastNamePlaceholder}
        value={form.lastName}
        onChange={(lastName) => {
          setForm({ ...form, lastName });
        }}
      />
    </div>
  );

  const usernameField = (
    <div className="input-field-wrapper">
      <InputField
        type="text"
        placeholder={texts.usernamePlaceholder}
        value={form.username}
        onChange={(username) => {
          setForm({ ...form, username });
        }}
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
