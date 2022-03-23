import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { Config, DAppProvider, Mainnet } from "@usedapp/core";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
      </Head>
      <ThemeProvider>
        <DAppProvider config={config}>
          <GlobalStyle />
          <Component {...pageProps} />
        </DAppProvider>
      </ThemeProvider>
      {/* <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" /> */}
    </CacheProvider>
  );
}

export default MageBrotherHoodApp;
