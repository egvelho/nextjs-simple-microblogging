import React from "react";
import { createPubSub } from "src/utils/create-pubsub";
import { Dialog } from "src/components/dialog";
import { Button } from "src/components/button";
import { Title } from "src/components/title";
import { Subtitle } from "src/components/subtitle";
import { spacing } from "src/utils/spacing";
import { href } from "src/utils/href";

const texts = {
  signInTitle: "Legal que você quer participar da conversa!",
  signInSubtitle:
    "Por favor, faça login ou crie uma conta para enviar sua mensagem.",
  signInButtonLabel: "Entrar",
  signUpButtonLabel: "Criar conta",
};

export type SignInDialogProps = {};

const toggleSignInDialog = createPubSub("toggleSignInDialog");

export function SignInDialog({}: SignInDialogProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    toggleSignInDialog.subscribe(async (message, toggleOpen: typeof open) => {
      setOpen(toggleOpen);
    });

    return () => {
      toggleSignInDialog.unsubscribe();
    };
  }, []);

  return (
    <Dialog open={open} onRequestClose={() => setOpen(false)}>
      <div className="sign-in-dialog-header">
        <div className="sign-in-dialog-title">
          <Title>{texts.signInTitle}</Title>
        </div>
        <Subtitle>{texts.signInSubtitle}</Subtitle>
      </div>
      <div className="sign-in-dialog-buttons">
        <div style={{ marginBottom: spacing(0.75) }}>
          <Button
            href={href("signIn")}
            onClick={() => setOpen(false)}
            label={texts.signInButtonLabel}
          />
        </div>
        <div>
          <Button
            href={href("signIn")}
            onClick={() => setOpen(false)}
            label={texts.signUpButtonLabel}
          />
        </div>
      </div>
      <style jsx>{`
        .sign-in-dialog-header {
          margin-bottom: ${spacing(2)};
        }

        .sign-in-dialog-title {
          margin-bottom: ${spacing(0.75)};
        }
      `}</style>
    </Dialog>
  );
}
