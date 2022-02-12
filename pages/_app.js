import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { VechaiProvider } from "@vechaiui/react";
config.autoAddCss = false;

import "../styles/globals.scss";

import { extendTheme, colors } from "@vechaiui/react";

// 2.Define new color scheme
const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.black,
      fill: colors.black,
    },
    text: {
      foreground: colors.white,
      muted: colors.white,
    },
    primary: colors.violet,
    neutral: colors.white,
  },
};

// or custom default color scheme
const light = {
  id: "light",
  type: "light",
  colors: {
    bg: {
      base: colors.white,
      fill: colors.white,
    },
    text: {
      foreground: colors.black,
      muted: colors.black,
    },
    primary: colors.violet,
    neutral: colors.white,
  },
};

// 3. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    light,
    cool,
  },
});

function MageBrotherHoodApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>
      <VechaiProvider theme={theme} colorScheme="cool">
        <Component {...pageProps} />;
      </VechaiProvider>
    </>
  );
}

export default MageBrotherHoodApp;
