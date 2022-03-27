import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { Config, DAppProvider, Mainnet } from "@usedapp/core";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
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
  autoConnect: true,
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: "https://mainnet.infura.io/v3/5c0736f0b07f4a24a3f0ffc5656b14ad",
  },
};

// function Test() {
//   const { activateBrowserWallet, account } = useEthers();
//   const etherBalance = useEtherBalance(account);
//   return (
//     <div>
//       {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
//       {account && <p>Account: {account}</p>}
//       {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
//     </div>
//   );
// }

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
      {/* <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" /> */}
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
