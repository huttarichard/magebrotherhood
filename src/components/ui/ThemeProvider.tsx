import createCache from "@emotion/cache";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import React from "react";

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
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
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
