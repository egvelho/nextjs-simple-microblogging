import React from "react";
import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { createPubSub } from "src/utils/create-pubsub";
import { spacing } from "src/utils/spacing";

export type ToastProps = {
  primaryColor?: boolean;
  secondaryColor?: boolean;
  closeAfter?: number;
};

export type ToastState = {
  message: string;
  error: boolean;
};

const initialState = {
  message: "",
  error: false,
};

const displayToastMessage = createPubSub("displayToastMessage");

export function Toast({
  primaryColor,
  secondaryColor,
  closeAfter = 3000,
}: ToastProps) {
  const [state, setState] = React.useState(initialState as ToastState);

  React.useEffect(() => {
    displayToastMessage.subscribe(async (message, toastState: ToastState) => {
      setState(toastState);
      setTimeout(() => setState(initialState), closeAfter);
    });

    return () => {
      displayToastMessage.unsubscribe();
    };
  }, []);

  const backgroundColor =
    (state.error && colors.error) ||
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

  if (state.message === "") {
    return null;
  }

  return (
    <div className="toast" onClick={() => setState(initialState)}>
      {state.message}
      <style jsx>{`
        .toast {
          box-sizing: border-box;
          z-index: ${layout.level.toast};
          border-top-left-radius: ${layout.borderRadius.toast};
          border-top-right-radius: ${layout.borderRadius.toast};
          background-color: ${backgroundColor};
          color: ${colors.textLightPrimary};
          font-size: ${layout.fontSize.hint};
          font-weight: bold;
          text-align: center;
          width: 320px;
          max-width: 90vw;
          position: fixed;
          bottom: 0;
          left: calc(50%);
          margin-left: calc(calc(min(320px, 90vw) / 2) * -1);
          padding: ${spacing(1.5)} ${spacing(3)};
        }

        .toast:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
