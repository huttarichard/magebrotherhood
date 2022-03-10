import Head from "next/head";
import Script from "next/script";
import { Connector } from "components/web3/Connector";
import "../styles/globals.scss";

function MageBrotherHoodApp({ Component, pageProps }) {
  return (
    <Connector>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <Component {...pageProps} />
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" />
    </Connector>
  );
}

export default MageBrotherHoodApp;
