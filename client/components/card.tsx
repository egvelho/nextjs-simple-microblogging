import { elevation as getElevation } from "client/utils/elevation";
import { spacing } from "client/utils/spacing";
import colors from "shared/consts/colors.json";
import layout from "shared/consts/layout.json";

export type CardProps = {
  children: React.ReactNode;
  elevation?: number;
};

const cardMaxWidth = "480px";

export function Card({ children, elevation = 0 }: CardProps) {
  return (
    <div className="card">
      {children}
      <style jsx>{`
        .card {
          max-width: ${cardMaxWidth};
          padding: ${spacing(2)};
          border-radius: ${layout.borderRadius.card};
          background-color: ${colors.white};
          box-shadow: ${getElevation(elevation)};
        }
      `}</style>
    </div>
  );
}
