import "swiper/css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import OGImage from "assets/images/magebrotherhood.jpg";
import TiktokPixelCode from "components/Marketing/TiktokPixelCode";
import GlobalStyle from "components/ui/GlobalStyle";
import ThemeProvider, { createEmotionCache } from "components/ui/ThemeProvider";
import TransactionPresenter from "components/ui/TransactionPresenter";
import WalletConnectWindow from "components/ui/WalletConnectWindow";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { SWRConfig } from "swr";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const title = "Mage Brotherhood";
const description =
  "Mage Brotherhood P2E game powered by Ethereum Blockchain. Explore magic of AR and decentralization. Our family is waiting for you!";
const url = "https://www.magebrotherhood.com/";

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function MageBrotherHoodApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    setTimeout(() => document.getElementById("loader")?.remove(), 50);
  }, []);

  const seo = (
    <DefaultSeo
      title={title + " - Homepage"}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        locale: "en",
        description,
        images: [
          {
            url: OGImage.src,
            width: OGImage.width,
            height: OGImage.height,
            alt: "MageBrotherhood",
            type: "image/jpeg",
          },
        ],
        site_name: title,
      }}
      twitter={{
        handle: "@magebrotherhood",
        site: "@magebrotherhood",
        cardType: "summary_large_image",
      }}
    />
  );

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Mage Brotherhood</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>

        {seo}

        <ThemeProvider>
          <GlobalStyle />
          <SWRConfig
            value={{
              refreshInterval: 15000,
              fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>

          <WalletConnectWindow />
          <TransactionPresenter />
        </ThemeProvider>
      </CacheProvider>

      <TiktokPixelCode id="C9AU0PRC77U9N0P9CPBG" />
    </>
  );
}

export default MageBrotherHoodApp;
