import React from "react";
import { useRouter } from "next/router";
import { href } from "client/utils/href";
import { useForm } from "client/utils/use-form";
import { useApi } from "client/utils/use-api";
import { validateSchemaHOC } from "client/utils/validate-schema-hoc";
import { createPubSub } from "client/utils/create-pubsub";
import { Token } from "client/utils/token";
import { requestLoginCodeSchema } from "shared/schemas/request-login-code-schema";
import { verifyLoginCodeSchema } from "shared/schemas/verify-login-code-schema";
import {
  EmailVerificationForm,
  EmailVerificationFormStep,
} from "./email-verification-form";
import type { SignInStateProps } from "./types";

const texts = {
  emailPlaceholder: "Email",
  emailVerificationSuccess: "Email verificado com sucesso!",
  emailVerificationCodePlaceholder: "Código de verificação",
  signInSuccessToast: (username: string) =>
    `Olá ${username}, bom ver você por aqui!`,
};

const toggleAuthState = createPubSub("toggleAuthState");
const displayToastMessage = createPubSub("displayToastMessage");

const initialEmailVerificationForm = {
  email: "",
  verificationCode: "",
};

export function EmailVerification({ step, setStep }: SignInStateProps) {
  const router = useRouter();

  const requestLoginCode = useApi("POST", "requestLoginCode");
  const verifyLoginCode = useApi("POST", "verifyLoginCode");

  const loading = requestLoginCode.loading || verifyLoginCode.loading;

  const emailVerificationForm = useForm({
    initialState: initialEmailVerificationForm,
    async validate(form) {
      if (step === "SUBMIT_EMAIL_STEP") {
        return validateSchemaHOC(requestLoginCodeSchema)(form);
      } else {
        return validateSchemaHOC(verifyLoginCodeSchema)(form);
      }
    },
  });

  const emailVerificationFormInputs = emailVerificationForm.mapToFormInputs({
    email: texts.emailPlaceholder,
    verificationCode: texts.emailVerificationCodePlaceholder,
  });

  async function onSubmitEmailStep() {
    const response = await requestLoginCode.callEndpoint(
      emailVerificationForm.state
    );

    if (response.data) {
      if (response.data.errors) {
        emailVerificationForm.pushFormErrors(response.data.errors);
      } else {
        await emailVerificationForm.reset();
        emailVerificationForm.setFormState({
          email: emailVerificationForm.state.email,
        });
        setStep("VERIFY_EMAIL_STEP");
      }
    }
  }

  async function onVerifyEmail() {
    const response = await verifyLoginCode.callEndpoint(
      emailVerificationForm.state
    );

    if (response.data) {
      if (response.data.errors) {
        emailVerificationForm.pushFormErrors(response.data.errors);
      } else {
        Token.set(response.data.token);
        emailVerificationForm.reset();
        toggleAuthState.publish(true);

        if (response.data.user) {
          await router.push(href("home"));
          displayToastMessage.publish({
            message: texts.signInSuccessToast(response.data.user.username),
            error: false,
          });
        } else {
          displayToastMessage.publish({
            message: texts.emailVerificationSuccess,
            error: false,
          });
          setStep("CREATE_ACCOUNT_STEP");
        }
      }
    }
  }

  return (
    <EmailVerificationForm
      loading={loading}
      form={emailVerificationFormInputs}
      onSubmit={async () => {
        const validationResults = await emailVerificationForm.pushFormErrors();

        if (validationResults.success === false) {
          return;
        }

        if (step === "SUBMIT_EMAIL_STEP") {
          await onSubmitEmailStep();
        } else if (step === "VERIFY_EMAIL_STEP") {
          await onVerifyEmail();
        }
      }}
      step={step as EmailVerificationFormStep}
    />
  );
}
