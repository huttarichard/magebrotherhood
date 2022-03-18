import "@emotion/react";

import type { Theme as MuiTheme } from "@mui/system";

export interface Options extends MuiTheme {
  // base
  white: string;
  black: string;

  // text
  text1: string;
  text2: string;
  text3: string;

  // backgrounds / greys
  bg1: string;
  bg2: string;
  bg3: string;

  //blues
  primary1: string;
  primary2: string;
  primary3: string;
  secondary1: string;
  secondary2: string;

  // other
  red: string;
  green: string;
  yellow: string;
  blue: string;

  error: string;
  success: string;
  warning: string;

  shadow: string;
  borderRadius: string;
}

declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends Options {}
}

declare module "@mui/material/styles" {
  // eslint-disable-next-line
  export interface Theme extends Options {}
}
