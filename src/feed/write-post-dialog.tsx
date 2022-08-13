import React from "react";
import layout from "src/consts/layout.json";
import { Dialog, DialogProps } from "src/components/dialog";
import { Button } from "src/components/button";
import { Title } from "src/components/title";
import { Subtitle } from "src/components/subtitle";
import { TextArea } from "src/components/text-area";
import { spacing } from "src/utils/spacing";

const texts = {
  title: "Enviar mensagem",
  subtitle: (messageMaxLength: number) =>
    `Por favor, digite a sua mensagem em até ${messageMaxLength} caracteres.`,
  sendMessage: "Enviar",
  messagePlaceholder: "Digite sua mensagem",
  messageHintText: (remainingChars: number) =>
    `Ainda restam ${remainingChars} caracteres`,
};

const messageMaxLength = 140;

export type WritePostDialogProps = Omit<DialogProps, "children">;

export function WritePostDialog({
  open,
  onRequestClose,
}: WritePostDialogProps) {
  const [message, setMessage] = React.useState("");

  return (
    <Dialog open={open} onRequestClose={onRequestClose}>
      <div className="write-post-dialog-header">
        <Title>{texts.title}</Title>
        <Subtitle>{texts.subtitle(messageMaxLength)}</Subtitle>
      </div>
      <div>
        <TextArea
          maxLength={messageMaxLength}
          rows={5}
          placeholder={texts.messagePlaceholder}
          value={message}
          onChange={(nextMessage) => {
            setMessage(
              nextMessage.replaceAll(/ +/g, " ").replaceAll(/\n+/g, "\n")
            );
          }}
          hintText={
            <span style={{ textAlign: "right", display: "block" }}>
              {texts.messageHintText(messageMaxLength - message.length)}
            </span>
          }
        />
        <div
          className="submit-button-wrapper"
          style={{
            marginTop: spacing(0.75),
          }}
        >
          <Button onClick={() => {}} label={texts.sendMessage} loading />
        </div>
      </div>
      <style jsx>{`
        .write-post-dialog-header {
          margin-bottom: ${spacing(3)};
        }
      `}</style>
    </Dialog>
  );
}
