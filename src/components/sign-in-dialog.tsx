import React from "react";
import { Dialog } from "src/components/dialog";

export type SignInDialogProps = {};

export function SignInDialog({}: SignInDialogProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onRequestClose={async () => setOpen(false)}>
      teste
    </Dialog>
  );
}
