import React from "react";

export interface ClientRenderProps {
  children: React.ReactNode;
}

export function ClientRender({ children }: ClientRenderProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted ? children : null}</>;
}
