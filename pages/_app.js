import Head from "next/head";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import { WalletContextProvider } from "../contexts/walletContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import "normalize.css";

config.autoAddCss = false;

function MageBrotherHoodApp({ Component, pageProps }) {
  return (
    <WalletContextProvider>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <Component {...pageProps} />
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" />
    </WalletContextProvider>
  );
}

export default MageBrotherHoodApp;
