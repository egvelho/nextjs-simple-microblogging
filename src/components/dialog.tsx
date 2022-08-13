import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { ClientRender } from "src/components/client-render";
import { spacing } from "src/utils/spacing";

export type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onRequestClose: () => Promise<void>;
};

export function Dialog({ children, open, onRequestClose }: DialogProps) {
  if (open === false) {
    return null;
  }

  return (
    <ClientRender>
      <div className="dialog-backdrop" onClick={() => onRequestClose()}>
        <div className="dialog-wrapper">
          <div className="dialog-card">{children}</div>
        </div>
        <style jsx>{`
          :global(body) {
            overflow: ${open ? "hidden" : "initial"};
          }

          .dialog-backdrop {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: ${colors.backdropDark};
            z-index: ${layout.level.backdrop};
          }

          .dialog-wrapper {
            z-index: ${layout.level.dialog};
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .dialog-card {
            padding: ${spacing(2)};
            border-radius: ${layout.borderRadius.card};
            background-color: ${colors.white};
          }
        `}</style>
      </div>
    </ClientRender>
  );
}
