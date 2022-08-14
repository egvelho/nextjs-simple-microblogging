import React from "react";
import { useRouter } from "next/router";
import { createPubSub } from "client/utils/create-pubsub";
import { href } from "client/utils/href";
import { Card } from "client/components/card";
import { Title } from "client/components/title";
import { Subtitle } from "client/components/subtitle";
import { spacing } from "client/utils/spacing";
import {
  EmailVerificationForm,
  EmailVerificationFormStep,
} from "client/sign-in/email-verification-form";
import { CreateAccountForm } from "client/sign-in/create-account-form";
import { useForm } from "client/utils/use-form";
import { useApi } from "client/utils/use-api";
import { validateSchemaHOC } from "client/utils/validate-schema-hoc";
import { Token } from "client/utils/token";
import { userSchema } from "shared/schemas/user-schema";
import { requestLoginCodeSchema } from "shared/schemas/request-login-code-schema";
import { verifyLoginCodeSchema } from "shared/schemas/verify-login-code-schema";

const texts = {
  submitEmailStepTitle: "Acessar o microblogue",
  submitEmailStepSubtitle: "Por favor, digite o seu email para continuar.",
  verifyEmailStepTitle: "Confirmar email",
  verifyEmailStepSubtitle:
    "Por favor, digite o código de verificação que enviamos para o seu email.",
  createAccountStepTitle: "Seja bem-vindo ao microblogue!",
  createAccountStepSubtitle:
    "Por favor, preencha os detalhes da sua conta para continuar.",
  createAccountUsernamePlaceholder: "Apelido",
  createAccountFirstNamePlaceholder: "Nome",
  createAccountLastNamePlaceholder: "Sobrenome",
  emailPlaceholder: "Email",
  tokenHidden: "Token (oculto)",
  emailVerificationCodePlaceholder: "Código de verificação",
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

const initialEmailVerificationForm = {
  email: "",
  verificationCode: "",
  token: "",
};

const initialCreateAccountForm = {
  firstName: "",
  lastName: "",
  username: "",
};

const displayToastMessage = createPubSub("displayToastMessage");

type SignInStep = "CREATE_ACCOUNT_STEP" | EmailVerificationFormStep;

type SignInStateProps = {
  step: SignInStep;
  setStep: (step: SignInStep) => void;
  loading: boolean;
};

export default function SignIn() {
  const loading = false;
  const [step, setStep] = React.useState("SUBMIT_EMAIL_STEP" as SignInStep);

  const pageTitle = mapStepToTitle[step];
  const pageSubtitle = mapStepToSubtitle[step];

  const currentStep =
    step === "CREATE_ACCOUNT_STEP" ? (
      <CreateAccount step={step} setStep={setStep} loading={loading} />
    ) : (
      <EmailVerification step={step} setStep={setStep} loading={loading} />
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

function EmailVerification({ step, setStep }: SignInStateProps) {
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
    token: texts.tokenHidden,
  });

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
          const response = await requestLoginCode.callEndpoint(
            emailVerificationForm.state
          );

          if (response.data) {
            emailVerificationForm.setFormState({
              token: response.data.token,
            });
            setStep("VERIFY_EMAIL_STEP");
          }
        }

        if (step === "VERIFY_EMAIL_STEP") {
          const response = await verifyLoginCode.callEndpoint(
            emailVerificationForm.state
          );

          if (response.data) {
            Token.set(response.data.token);

            if (response.data.user) {
              displayToastMessage.publish({
                message: texts.signInSuccessToast(response.data.username),
              });
            } else {
              setStep("CREATE_ACCOUNT_STEP");
            }
          }
        }
      }}
      step={step as EmailVerificationFormStep}
    />
  );
}

function CreateAccount({ step, setStep, loading }: SignInStateProps) {
  const router = useRouter();
  const createAccount = useApi("post", "createAccount");

  const createAccountForm = useForm({
    initialState: initialCreateAccountForm,
    validate: validateSchemaHOC(userSchema),
  });

  const createAccountFormInputs = createAccountForm.mapToFormInputs({
    firstName: texts.createAccountFirstNamePlaceholder,
    lastName: texts.createAccountLastNamePlaceholder,
    username: texts.createAccountUsernamePlaceholder,
  });

  return (
    <CreateAccountForm
      loading={createAccount.loading}
      form={createAccountFormInputs}
      onSubmit={async () => {
        const validationResults = await createAccountForm.pushFormErrors();

        if (validationResults.success === false) {
          return;
        }

        const response = await createAccount.callEndpoint(
          createAccountForm.state
        );

        if (response.data) {
          await router.push(href("home"));
          displayToastMessage.publish({
            message: texts.createAccountSuccessToast,
          });
        }
      }}
    />
  );
}
