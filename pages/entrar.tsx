import React from "react";
import { useRouter } from "next/router";
import { createPubSub } from "src/utils/create-pubsub";
import { href } from "src/utils/href";
import { Card } from "src/components/card";
import { Title } from "src/components/title";
import { Subtitle } from "src/components/subtitle";
import { spacing } from "src/utils/spacing";
import {
  EmailVerificationForm,
  EmailVerificationFormFields,
  EmailVerificationFormStep,
} from "src/sign-in/email-verification-form";
import {
  CreateAccountForm,
  CreateAccountFormFields,
} from "src/sign-in/create-account-form";

const texts = {
  submitEmailStepTitle: "Acessar o microblogue",
  submitEmailStepSubtitle: "Por favor, digite o seu email para continuar.",
  verifyEmailStepTitle: "Confirmar email",
  verifyEmailStepSubtitle:
    "Por favor, digite o código de verificação que enviamos para o seu email.",
  createAccountStepTitle: "Seja bem-vindo ao microblogue!",
  createAccountStepSubtitle:
    "Por favor, preencha os detalhes da sua conta para continuar.",
  emailPlaceholder: "Email",
  submitEmailButton: "Continuar",
  createAccountSuccessToast: "Sua conta criada com sucesso!",
  signInSuccessToast: (username: string) =>
    `Olá ${username}, bom ver você por aqui!`,
};

const mapStepToTitle: { [step in SignInStep]: string } = {
  SUBMIT_EMAIL_STEP: texts.submitEmailStepTitle,
  VERIFY_EMAIL_STEP: texts.verifyEmailStepTitle,
  CREATE_ACCOUNT_STEP: texts.createAccountStepTitle,
};

const mapStepToSubtitle: { [step in SignInStep]: string } = {
  SUBMIT_EMAIL_STEP: texts.submitEmailStepSubtitle,
  VERIFY_EMAIL_STEP: texts.verifyEmailStepSubtitle,
  CREATE_ACCOUNT_STEP: texts.createAccountStepSubtitle,
};

const initialEmailVerificationFormFields: EmailVerificationFormFields = {
  email: "",
  verificationCode: "",
};

const initialCreateAccountFormFields: CreateAccountFormFields = {
  firstName: "",
  lastName: "",
  username: "",
};

const displayToastMessage = createPubSub("displayToastMessage");

type SignInStep = "CREATE_ACCOUNT_STEP" | EmailVerificationFormStep;

export default function SignIn() {
  const router = useRouter();
  const [step, setStep] = React.useState("SUBMIT_EMAIL_STEP" as SignInStep);

  const [emailVerificationForm, setEmailVerificationForm] = React.useState(
    initialEmailVerificationFormFields
  );

  const [createAccountForm, setCreateAccountForm] = React.useState(
    initialCreateAccountFormFields
  );

  const pageTitle = mapStepToTitle[step];
  const pageSubtitle = mapStepToSubtitle[step];

  const currentStep =
    step === "CREATE_ACCOUNT_STEP" ? (
      <CreateAccountForm
        form={createAccountForm}
        setForm={setCreateAccountForm}
        onSubmit={async () => {
          await router.push(href("home"));
          displayToastMessage.publish({
            message: texts.createAccountSuccessToast,
          });
        }}
      />
    ) : (
      <EmailVerificationForm
        form={emailVerificationForm}
        setForm={setEmailVerificationForm}
        onSubmit={() => {
          if (step === "SUBMIT_EMAIL_STEP") {
            setStep("VERIFY_EMAIL_STEP");
          }

          if (step === "VERIFY_EMAIL_STEP") {
            setStep("CREATE_ACCOUNT_STEP");
          }

          displayToastMessage.publish({
            message: texts.signInSuccessToast("NOME_DE_USUÁRIO"),
          });
        }}
        step={step}
      />
    );

  return (
    <div className="sign-in-page">
      <Card elevation={4}>
        <div className="sign-in-page-header">
          <div className="sign-in-page-title">
            <Title>{pageTitle}</Title>
          </div>
          <Subtitle>{pageSubtitle}</Subtitle>
        </div>
        <div className="sign-in-step">{currentStep}</div>
      </Card>
      <style jsx>{`
        .sign-in-page {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: ${spacing(8)};
        }

        .sign-in-page-header {
          margin-bottom: ${spacing(3)};
        }

        .sign-in-page-title {
          margin-bottom: ${spacing(0.75)};
        }
      `}</style>
    </div>
  );
}
