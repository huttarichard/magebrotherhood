import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
import WalletConnectWindow from "components/ui/WalletConnectWindow";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
}

function MageBrotherHoodApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, messages } = props;
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  useEffect(() => {
    setTimeout(() => document.getElementById("loader")?.remove(), 50);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
      </Head>
      <ThemeProvider>
        <IntlProvider messages={messages} locale={shortLocale} defaultLocale="en">
          <GlobalStyle />
          <Component {...pageProps} />

          <WalletConnectWindow />
        </IntlProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MageBrotherHoodApp.getInitialProps = async ({ router }: AppContext) => {
  const { locale } = router;
  const [shortLocale] = locale ? locale.split("-") : ["en"];
  const { default: messages } = await import(`translations/${shortLocale}`);

  return { messages };
};

export default MageBrotherHoodApp;
