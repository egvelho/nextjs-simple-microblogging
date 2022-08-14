import NextLink from "next/link";
import colors from "shared/consts/colors.json";
import type { Href } from "client/utils/href";

export type LinkProps = {
  children: React.ReactNode;
  href?: Href;
  prefetch?: boolean;
  anchor?: boolean;
  external?: boolean;
  onClick?: () => Promise<void> | void;
};

export function Link({
  children,
  href,
  prefetch,
  anchor,
  external,
  onClick,
}: LinkProps) {
  const link = (
    <a onClick={onClick} className={anchor ? "anchor" : undefined}>
      {children}
    </a>
  );

  const styles = (
    <style jsx>{`
      :global(a, a:visited) {
        color: inherit;
        text-decoration: none;
      }

      :global(.anchor, .anchor:visited) {
        color: ${colors.primary};
      }

      :global(.anchor:hover) {
        text-decoration: underline;
      }
    `}</style>
  );

  if (external || onClick || !href) {
    return (
      <>
        {link}
        {styles}
      </>
    );
  } else {
    return (
      <>
        <NextLink href={href} prefetch={prefetch} key={href}>
          {link}
        </NextLink>
        {styles}
      </>
    );
  }
}
