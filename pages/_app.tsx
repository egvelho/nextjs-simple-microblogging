import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { href } from "client/utils/href";
import { spacing } from "client/utils/spacing";
import { resource } from "client/utils/resource";
import { createPubSub } from "client/utils/create-pubsub";
import { Token } from "client/utils/token";
import { GlobalStyles } from "client/app/global-styles";
import { AppBar, AppBarProps } from "client/app/app-bar";
import { Toast } from "client/app/toast";
import { SignInDialog } from "client/app/sign-in-dialog";
import { Link } from "client/components/link";
import app from "shared/consts/app.json";
import type { AppProps } from "next/app";

const texts = {
  sourceLinkLabel: "@nextjs-simple-microblogging",
  logoutButton: "Sair",
  logoutToastMessage: "Sua sessão foi encerrada. Até mais!",
};

const toggleAuthState = createPubSub<boolean>("toggleAuthState");
const displayToastMessage = createPubSub("displayToastMessage");

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
  const router = useRouter();
  const [displayAuthLinks, setDisplayAuthLinks] = React.useState(false);

  React.useEffect(() => {
    setDisplayAuthLinks(!!Token.get());

    toggleAuthState.subscribe(async (message, toggleDisplay) => {
      if (toggleDisplay === undefined) {
        return;
      }

      setDisplayAuthLinks(toggleDisplay);
    });

    return () => {
      toggleAuthState.unsubscribe();
    };
  }, []);

  const navBarItems: AppBarProps["navBarItems"] = displayAuthLinks
    ? [
        {
          label: texts.logoutButton,
          async onClick() {
            Token.remove();
            await router.push(href("home"));
            displayToastMessage.publish({
              message: texts.logoutToastMessage,
              error: false,
            });
            toggleAuthState.publish(false);
          },
        },
      ]
    : [
        {
          label: texts.sourceLinkLabel,
          href: href("sourceGithub"),
          external: true,
        },
      ];

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
