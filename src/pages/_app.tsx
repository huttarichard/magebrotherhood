import "../styles/globals.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function MageBrotherHoodApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <Component {...pageProps} />
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" />
    </div>
  );
}

export default MageBrotherHoodApp;
