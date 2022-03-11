import "normalize.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { css, Global, Theme } from "@emotion/react";
import { animations } from "components/ui/animations";
import ThemeProvider from "components/ui/Theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

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
