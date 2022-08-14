import colors from "shared/consts/colors.json";

export type SpinnerProps = {
  primaryColor?: boolean;
  secondaryColor?: boolean;
};

export function Spinner({ primaryColor, secondaryColor }: SpinnerProps) {
  const spinnerColor =
    (primaryColor && colors.primary) ||
    (secondaryColor && colors.secondary) ||
    colors.primary;

  return (
    <div className="spinner">
      <style jsx>{`
        .spinner,
        .spinner:after {
          border-radius: 50%;
          width: 1ex;
          height: 1ex;
        }

        .spinner {
          margin: auto;
          font-size: inherit;
          border-top: 0.5em solid ${colors.borderDark};
          border-right: 0.5em solid ${colors.borderDark};
          border-bottom: 0.5em solid ${colors.borderDark};
          border-left: 0.5em solid ${spinnerColor};
          animation: spinner 1s infinite linear;
        }

        @-webkit-keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
