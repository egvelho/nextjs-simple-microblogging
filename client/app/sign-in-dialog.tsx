import React from "react";
import { useRouter } from "next/router";
import { createPubSub } from "client/utils/create-pubsub";
import { Dialog } from "client/components/dialog";
import { Button } from "client/components/button";
import { Title } from "client/components/title";
import { Subtitle } from "client/components/subtitle";
import { spacing } from "client/utils/spacing";
import { href } from "client/utils/href";

const texts = {
  signInTitle: "Legal que você quer participar da conversa!",
  signInSubtitle:
    "Por favor, faça login ou crie uma conta para enviar sua mensagem.",
  signInButtonLabel: "Entrar",
  signUpButtonLabel: "Criar conta",
};

export type SignInDialogProps = {};

const toggleSignInDialog = createPubSub<boolean>("toggleSignInDialog");

export function SignInDialog({}: SignInDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    toggleSignInDialog.subscribe(async (message, toggleOpen) => {
      if (toggleOpen === undefined) {
        return;
      }

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
            onClick={() => {
              setOpen(false);
              router.push(href("signIn"));
            }}
            label={texts.signInButtonLabel}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              setOpen(false);
              router.push(href("signIn"));
            }}
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
