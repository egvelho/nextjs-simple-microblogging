import React from "react";
import { Dialog, DialogProps } from "src/components/dialog";
import { Button } from "src/components/button";
import { Title } from "src/components/title";
import { Subtitle } from "src/components/subtitle";
import { TextArea } from "src/components/text-area";
import { spacing } from "src/utils/spacing";
import app from "src/consts/app.json";
import { useForm } from "src/utils/use-form";
import { validateSchemaHOC } from "src/utils/validate-schema-hoc";
import { postSchema } from "src/schemas/post-schema";

const texts = {
  title: "Enviar mensagem",
  subtitle: (messageMaxLength: number) =>
    `Por favor, digite a sua mensagem em até ${messageMaxLength} caracteres.`,
  sendMessage: "Enviar",
  messagePlaceholder: "Digite sua mensagem",
  messageHintText: (remainingChars: number) =>
    `Ainda restam ${remainingChars} caracteres`,
};

const messageMaxLength = app.messageMaxSize;

export type WritePostDialogProps = Omit<DialogProps, "children">;

const initialPostForm = {
  message: "",
};

export function WritePostDialog({
  open,
  onRequestClose,
}: WritePostDialogProps) {
  const loading = false;

  const postFormControl = useForm({
    initialState: initialPostForm,
    validate: validateSchemaHOC(postSchema),
  });

  const postFormInputs = postFormControl.mapToFormInputs({
    message: texts.messagePlaceholder,
  });

  const messageHintText =
    postFormControl.form.message.errors.length > 0 ? (
      postFormControl.form.message.errors[0]
    ) : (
      <span style={{ textAlign: "right", display: "block" }}>
        {texts.messageHintText(
          messageMaxLength - postFormControl.state.message.length
        )}
      </span>
    );

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
          value={postFormInputs.message.value}
          disabled={loading}
          error={postFormInputs.message.error}
          onFocus={postFormInputs.message.onFocus}
          onBlur={postFormInputs.message.onBlur}
          helperText={messageHintText}
          onChange={(message) =>
            postFormInputs.message.onChange(
              message.replaceAll(/ +/g, " ").replaceAll(/\n+/g, "\n")
            )
          }
        />
        <div
          className="submit-button-wrapper"
          style={{
            marginTop: spacing(0.75),
          }}
        >
          <Button
            onClick={() => {}}
            label={texts.sendMessage}
            loading={loading}
          />
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
