import Head from "next/head";
import "../styles/globals.css";

function MageBrotherHoodApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MageBrotherHoodApp;
