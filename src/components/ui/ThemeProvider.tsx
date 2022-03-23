import createCache from "@emotion/cache";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles/shadows";
import React from "react";

const shadowKeyUmbraOpacity = 0.1;
const shadowKeyPenumbraOpacity = 0.07;
const shadowAmbientShadowOpacity = 0.06;

function createShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(255,255,255,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(255,255,255,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(255,255,255,${shadowAmbientShadowOpacity})`,
  ].join(",");
}

const shadows: Shadows = [
  "none",
  createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
];

export const mui: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ec12f9",
      light: "#f241ff",
      dark: "#b100bb",
    },
    secondary: {
      main: "#8d11db",
    },
    background: {
      default: "#121212",
      paper: "#000000",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.8)",
      disabled: "rgba(253,253,253,0.38)",
    },
    error: {
      main: "#FF4343",
    },
    success: {
      main: "#00ff29",
    },
    divider: "rgba(47,47,47,0.8)",
    info: {
      main: "#2172E5",
    },
  },
  typography: {
    fontWeightLight: 200,
    fontWeightMedium: 600,

    body1: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "white",
    },
    body2: {
      fontSize: "1.2rem",
      fontWeight: 400,
      color: "white",
    },
    button: {
      fontSize: "1.5rem",
    },
    fontFamily: `"Barlow Condensed", '-apple-system', sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: "5rem",
      lineHeight: "1.rem",
      textTransform: "uppercase",
    },
    h2: {
      fontWeight: 600,
      fontSize: "4rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "3.5rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "3rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "2.25rem",
    },
  },
  shadows: shadows,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "5px",
          // background: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
  },
};

export const theme = {
  // base
  white: "#FFFFFF",
  black: "#000000",

  // text
  text1: "#FFFFFF",
  text2: "#111111",
  text3: "#4269e7",

  // backgrounds / greys
  bg1: "#121212",
  bg2: "#FFFFFF",
  bg3: "#ec12f9",

  //primary colors
  primary1: "#ec12f9",
  primary2: "#8d11db",
  primary3: "#00ff29",

  // secondary colors
  secondary1: "#2172E5",
  secondary2: "#2172E5",

  red: "#FF4343",
  green: "#27AE60",
  yellow: "#E3A507",
  blue: "#2172E5",

  error: "#FD4040",
  success: "#27AE60",
  warning: "#FF8F00",

  //shadows
  shadow: "#000",
  borderRadius: "10px",
};

// Create a theme instance.
const instance = createTheme(mui, theme);

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={instance}>{children}</MuiThemeProvider>;
}
