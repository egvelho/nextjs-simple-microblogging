import type { AppProps } from "next/app";
import app from "src/consts/app.json";
import { href } from "src/utils/href";
import { spacing } from "src/utils/spacing";
import { resource } from "src/utils/resource";
import { GlobalStyles } from "src/global-styles";
import { AppBar, AppBarProps } from "src/components/app-bar";
import { SignInDialog } from "src/components/sign-in-dialog";
import { Link } from "src/components/link";

const navBarItems: AppBarProps["navBarItems"] = [
  {
    label: "@egvelho",
    href: href("egvelhoGithub"),
    external: true,
  },
];

function AppBarLogo() {
  return (
    <Link href={href("home")} prefetch={false}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={resource("logo")} width="56px" height="32px" />
        <span style={{ paddingLeft: spacing(1.5) }}>{app.name}</span>
      </span>
    </Link>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="page-wrapper">
      <AppBar appBarLogo={<AppBarLogo />} navBarItems={navBarItems} />
      <main id="page-content">
        <Component {...pageProps} />
      </main>
      <SignInDialog />
      <GlobalStyles />
    </div>
  );
}
