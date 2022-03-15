import "normalize.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "swiper/css";

import { css, Global, Theme } from "@emotion/react";
import { OnboardAPI } from "@web3-onboard/core";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { animations } from "components/ui/animations";
import ThemeProvider from "components/ui/Theme";
import { useAtom } from "jotai";
import initWeb3Onboard from "lib/web3/web3";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { walletAtom } from "store/wallet";

const GlobalStyle = (theme: Theme) => css`
  html {
    color: ${theme.text1};
    background-color: ${theme.bg1} !important;
  }

  a {
    color: ${theme.blue};
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Barlow Condensed", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 700;
  }

  model-viewer {
    --poster-color: transparent;
  }

  ${animations}
`;

function MageBrotherHoodApp({ Component, pageProps }: AppProps) {
  const [, setWallet] = useAtom(walletAtom);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();

  const [web3Onboard, setWeb3Onboard] = useState<OnboardAPI>();

  useEffect(() => {
    setWallet(() => ({
      data: wallet,
      connecting,
      connect,
      disconnect,
    }));
  }, [wallet, connecting, connect, disconnect, setWallet]);

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) {
      return;
    }

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);

    window.localStorage.setItem("connectedWallets", JSON.stringify(connectedWalletsLabelArray));
  }, [connectedWallets]);

  useEffect(() => {
    const setWalletFromLocalStorage = async () => {
      const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem("connectedWallets") || "[]");

      if (previouslyConnectedWallets?.length) {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }
    };

    setWalletFromLocalStorage();
  }, [web3Onboard, connect]);

  return (
    <div>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <ThemeProvider>
        <Global styles={GlobalStyle} />
        <Component {...pageProps} />
      </ThemeProvider>
      <Script type="module" src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js" />
    </div>
  );
}

export default MageBrotherHoodApp;
