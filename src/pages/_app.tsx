import "@fortawesome/fontawesome-svg-core/styles.css";
import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function MageBrotherHoodApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui, viewport-fit=cover" />
      </Head>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      {/* <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" /> */}
    </CacheProvider>
  );
}

export default MageBrotherHoodApp;
