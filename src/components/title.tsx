import layout from "src/consts/layout.json";
import { spacing } from "src/utils/spacing";

export type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return (
    <h1 className="title">
      {children}
      <style jsx>{`
        .title {
          text-align: center;
          font-size: ${layout.fontSize.title};
          line-height: 1.2;
        `}</style>
    </h1>
  );
}
