import type { AppProps } from "next/app";
import Head from "next/head";
import { href } from "client/utils/href";
import { spacing } from "client/utils/spacing";
import { resource } from "client/utils/resource";
import { GlobalStyles } from "client/app/global-styles";
import { AppBar, AppBarProps } from "client/app/app-bar";
import { Toast } from "client/app/toast";
import { SignInDialog } from "client/app/sign-in-dialog";
import { Link } from "client/components/link";
import app from "shared/consts/app.json";

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
      <Head>
        <title>{app.name}</title>
        <meta name="description" content={app.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar appBarLogo={<AppBarLogo />} navBarItems={navBarItems} />
      <main id="page-content">
        <Component {...pageProps} />
      </main>
      <SignInDialog />
      <Toast />
      <GlobalStyles />
    </div>
  );
}
