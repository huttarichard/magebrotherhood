import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React from "react";

const theme = {
  // base
  white: "#FFFFFF",
  black: "#000000",

  // text
  text1: "#FFFFFF",
  text2: "#111111",
  text3: "#4269e7",

  // backgrounds / greys
  bg1: "#111111",
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

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
}
