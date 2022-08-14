import React from "react";
import { Dialog, DialogProps } from "client/components/dialog";
import { Button } from "client/components/button";
import { Title } from "client/components/title";
import { Subtitle } from "client/components/subtitle";
import { TextArea } from "client/components/text-area";
import { createPubSub } from "client/utils/create-pubsub";
import { spacing } from "client/utils/spacing";
import { useApi } from "client/utils/use-api";
import app from "shared/consts/app.json";
import { useForm } from "client/utils/use-form";
import { validateSchemaHOC } from "client/utils/validate-schema-hoc";
import { postSchema } from "shared/schemas/post-schema";

const texts = {
  title: "Enviar mensagem",
  subtitle: (messageMaxLength: number) =>
    `Por favor, digite a sua mensagem em até ${messageMaxLength} caracteres.`,
  sendMessage: "Enviar",
  writePostSuccess: "Mensagem enviada com sucesso",
  messagePlaceholder: "Digite sua mensagem",
  messageHintText: (remainingChars: number) =>
    `Ainda restam ${remainingChars} caracteres`,
};

const displayToastMessage = createPubSub("displayToastMessage");

const messageMaxLength = app.messageMaxSize;

export type WritePostDialogProps = Omit<DialogProps, "children">;

const initialPostForm = {
  message: "",
};

export function WritePostDialog({
  open,
  onRequestClose,
}: WritePostDialogProps) {
  const createPost = useApi("post", "createPost");

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
    <Dialog
      open={open}
      onRequestClose={createPost.loading ? () => {} : onRequestClose}
    >
      <div className="write-post-dialog-header">
        <Title>{texts.title}</Title>
        <Subtitle>{texts.subtitle(messageMaxLength)}</Subtitle>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const validationResults = await postFormControl.pushFormErrors();

          if (validationResults.success === false) {
            return;
          }

          const response = await createPost.callEndpoint(postFormControl.state);

          if (response.data) {
            onRequestClose();

            displayToastMessage.publish({
              message: texts.writePostSuccess,
            });
          }
        }}
      >
        <TextArea
          maxLength={messageMaxLength}
          rows={5}
          placeholder={texts.messagePlaceholder}
          value={postFormInputs.message.value}
          disabled={createPost.loading}
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
            formSubmit
            label={texts.sendMessage}
            loading={createPost.loading}
          />
        </div>
      </form>
      <style jsx>{`
        .write-post-dialog-header {
          margin-bottom: ${spacing(3)};
        }
      `}</style>
    </Dialog>
  );
}
