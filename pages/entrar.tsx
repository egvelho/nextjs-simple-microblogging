import React from "react";
import { Card } from "client/components/card";
import { Title } from "client/components/title";
import { Subtitle } from "client/components/subtitle";
import { spacing } from "client/utils/spacing";
import { CreateAccount } from "client/sign-in/create-account";
import { EmailVerification } from "client/sign-in/email-verification";
import type { SignInStep } from "client/sign-in/types";

const texts = {
  submitEmailStepTitle: "Acessar o microblogue",
  submitEmailStepSubtitle: "Por favor, digite o seu email para continuar.",
  verifyEmailStepTitle: "Confirmar email",
  verifyEmailStepSubtitle:
    "Por favor, digite o código de verificação que enviamos para o seu email.",
  createAccountStepTitle: "Seja bem-vindo ao microblogue!",
  createAccountStepSubtitle:
    "Por favor, preencha os detalhes da sua conta para continuar.",
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

export default function SignIn() {
  const [step, setStep] = React.useState("SUBMIT_EMAIL_STEP" as SignInStep);

  const pageTitle = mapStepToTitle[step];
  const pageSubtitle = mapStepToSubtitle[step];

  const currentStep =
    step === "CREATE_ACCOUNT_STEP" ? (
      <CreateAccount step={step} setStep={setStep} />
    ) : (
      <EmailVerification step={step} setStep={setStep} />
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
