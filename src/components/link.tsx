import NextLink from "next/link";
import colors from "src/consts/colors.json";
import type { Href } from "src/utils/href";

export type LinkProps = {
  children: React.ReactNode;
  href: Href;
  prefetch?: boolean;
  anchor?: boolean;
  external?: boolean;
};

export function Link({
  children,
  href,
  prefetch,
  anchor,
  external,
}: LinkProps) {
  const link = <a className={anchor ? "anchor" : undefined}>{children}</a>;

  if (external) {
    return link;
  } else {
    return (
      <>
        <NextLink href={href} prefetch={prefetch} key={href}>
          {link}
        </NextLink>
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
      </>
    );
  }
}
