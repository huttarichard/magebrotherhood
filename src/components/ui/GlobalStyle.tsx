import { css, Theme } from "@emotion/react";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { brighten, glow } from "./animations";

export const animations = css`
  .raysg {
    animation: ${brighten} 2s ease-in-out infinite;
  }

  .text-game-white {
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

const GlobalStyle = (theme: Theme) => css`
  html {
    color: ${theme.text1};
    background-color: ${theme.bg1} !important;
    font-size: 100%;
    height: 100%;
    min-width: 375px;

    @media screen and (max-width: 900px) {
      font-size: 90%;
    }
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overscroll-behavior: none;
    font-size: 100%;
    height: 100%;
  }

  #__next {
    height: 100%;
  }

  a {
    color: ${theme.blue};
  }

  model-viewer {
    --poster-color: transparent;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h5 {
    .gradient {
      display: inline-block;
      background: linear-gradient(#8d11db, #ec12f9);
      background: -webkit-linear-gradient(#8d11db, #ec12f9);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 0 20px;
    }
  }

  a {
    color: #ec12f9;
  }

  ${animations}
`;

export default function GlobalStyles() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <CssBaseline />
    </>
  );
}
