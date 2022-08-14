import { spacing } from "client/utils/spacing";
import { elevation } from "client/utils/elevation";
import { Link, LinkProps } from "client/components/link";
import colors from "shared/consts/colors.json";

type NavBarItem = Omit<LinkProps, "children"> & {
  label: string;
};

export type AppBarProps = {
  appBarLogo: React.ReactNode;
  navBarItems: NavBarItem[];
};

export function AppBar({ appBarLogo, navBarItems }: AppBarProps) {
  return (
    <div className="app-bar">
      <h1 className="app-bar-logo">{appBarLogo}</h1>
      <nav>
        {navBarItems.map(({ label, href }) => (
          <Link anchor href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <style jsx>{`
        .app-bar {
          top: 0;
          position: sticky;
          background-color: ${colors.white};
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${spacing(1.5)} ${spacing(3)};
          box-shadow: ${elevation(12)};
        }

        .app-bar-logo {
          font-weight: normal;
          font-size: inherit;
        }

        :global(.app-bar nav a:not(:first-child)) {
          padding-left: ${spacing(2)};
        }
      `}</style>
    </div>
  );
}
