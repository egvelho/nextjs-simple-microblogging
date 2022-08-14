import layout from "shared/consts/layout.json";

export type SubtitleProps = {
  children: React.ReactNode;
};

export function Subtitle({ children }: SubtitleProps) {
  return (
    <h1 className="subtitle">
      {children}
      <style jsx>{`
        .subtitle {
          display: block;
          font-size: ${layout.fontSize.subtitle};
          line-height: 1.3;
        }
      `}</style>
    </h1>
  );
}
