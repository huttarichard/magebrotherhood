import { css, Theme } from "@emotion/react";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { brighten, float, glow } from "./animations";

export const animations = css`
  .sg0 {
    animation: ${float} 2s ease-in-out infinite;
  }

  .sg1 {
    animation: ${float} 2s ease-in-out infinite;
    // animation-delay: 0.05s;
  }

  .sg2 {
    animation: ${float} 2s ease-in-out infinite;
  }

  .sg3 {
    animation: ${float} 2s ease-in-out infinite;
  }

  .sg4 {
    animation: ${float} 2s ease-in-out infinite;
  }

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

    @media screen and (max-width: 900px) {
      font-size: 90%;
    }
  }

  html,
  body {
    min-height: 100%;
    height: 100%;
    width: 100%;
    min-width: 375px;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overscroll-behavior: none;
    font-size: 100%;
  }

  a {
    color: ${theme.blue};
  }

  model-viewer {
    --poster-color: transparent;
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
