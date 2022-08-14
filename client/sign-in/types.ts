import type { EmailVerificationFormStep } from "./email-verification-form";

export type SignInStep = "CREATE_ACCOUNT_STEP" | EmailVerificationFormStep;

export type SignInStateProps = {
  step: SignInStep;
  setStep: (step: SignInStep) => void;
};
