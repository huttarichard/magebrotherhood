import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ChainId, Config, DAppProvider, Mainnet, Rinkeby } from "@usedapp/core";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
import env from "lib/env";
import { chains } from "lib/web3/providers/infura";
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

const config: Config = {
  autoConnect: false,
  readOnlyChainId: env.DEFAULT_NETWORK as ChainId,
  networks: [Mainnet, Rinkeby],
  readOnlyUrls: chains,
};

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
        <DAppProvider config={config}>
          <IntlProvider messages={messages} locale={shortLocale} defaultLocale="en">
            <GlobalStyle />
            <Component {...pageProps} />
          </IntlProvider>
        </DAppProvider>
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
