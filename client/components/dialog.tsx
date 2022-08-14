import { ClientRender } from "client/components/client-render";
import { Card } from "client/components/card";
import colors from "shared/consts/colors.json";
import layout from "shared/consts/layout.json";

export type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onRequestClose: () => Promise<void> | void;
};

export function Dialog({ children, open, onRequestClose }: DialogProps) {
  if (open === false) {
    return null;
  }

  return (
    <ClientRender>
      <div className="dialog-wrapper">
        <div
          className="dialog-backdrop"
          onClick={(event) => {
            if (
              (event.target as typeof event.currentTarget).className.includes(
                "dialog-card-wrapper"
              )
            ) {
              onRequestClose();
            }
          }}
        >
          <div className="dialog-card-wrapper">
            <div className="dialog-card">
              <Card>{children}</Card>
            </div>
          </div>
        </div>
        <style jsx>{`
          :global(body) {
            overflow: ${open ? "hidden" : "initial"};
          }

          .dialog-backdrop {
            width: 100%;
            height: 100%;
            position: absolute;
            top: ${window.scrollY}px;
            left: 0;
            background-color: ${colors.backdropDark};
            z-index: ${layout.level.backdrop};
          }

          .dialog-card-wrapper {
            z-index: ${layout.level.dialog};
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    </ClientRender>
  );
}
