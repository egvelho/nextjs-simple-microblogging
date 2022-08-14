import React from "react";
import { useRouter } from "next/router";
import { createPubSub } from "client/utils/create-pubsub";
import { href } from "client/utils/href";
import { useForm } from "client/utils/use-form";
import { useApi } from "client/utils/use-api";
import { validateSchemaHOC } from "client/utils/validate-schema-hoc";
import { createAccountSchema } from "shared/schemas/create-account-schema";
import { CreateAccountForm } from "./create-account-form";
import type { SignInStateProps } from "./types";

const texts = {
  createAccountUsernamePlaceholder: "Apelido",
  createAccountFirstNamePlaceholder: "Nome",
  createAccountLastNamePlaceholder: "Sobrenome",
  createAccountSuccessToast: "Sua conta criada com sucesso!",
};

const displayToastMessage = createPubSub("displayToastMessage");

const initialCreateAccountForm = {
  firstName: "",
  lastName: "",
  username: "",
};

export function CreateAccount({ step, setStep }: SignInStateProps) {
  const router = useRouter();
  const createAccount = useApi("post", "createAccount");
  const loading = createAccount.loading;

  const createAccountForm = useForm({
    initialState: initialCreateAccountForm,
    validate: validateSchemaHOC(createAccountSchema),
  });

  const createAccountFormInputs = createAccountForm.mapToFormInputs({
    firstName: texts.createAccountFirstNamePlaceholder,
    lastName: texts.createAccountLastNamePlaceholder,
    username: texts.createAccountUsernamePlaceholder,
  });

  async function onSubmit() {
    const validationResults = await createAccountForm.pushFormErrors();

    if (validationResults.success === false) {
      return;
    }

    const response = await createAccount.callEndpoint(createAccountForm.state);

    if (response.data) {
      if (response.data.errors) {
        createAccountForm.pushFormErrors(response.data.errors);
      } else {
        await router.push(href("home"));
        createAccountForm.reset();
        displayToastMessage.publish({
          message: texts.createAccountSuccessToast,
        });
      }
    }
  }

  return (
    <CreateAccountForm
      loading={loading}
      form={createAccountFormInputs}
      onSubmit={onSubmit}
    />
  );
}
