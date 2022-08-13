import colors from "src/consts/colors.json";
import layout from "src/consts/layout.json";
import { elevation as getElevation } from "src/utils/elevation";
import { spacing } from "src/utils/spacing";

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
