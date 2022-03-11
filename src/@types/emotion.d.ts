import "@emotion/react";

export type Color = string;

export interface Colors {
  // base
  white: Color;
  black: Color;

  // text
  text1: Color;
  text2: Color;
  text3: Color;

  // backgrounds / greys
  bg1: Color;
  bg2: Color;
  bg3: Color;

  //blues
  primary1: Color;
  primary2: Color;
  secondary1: Color;
  secondary2: Color;

  // other
  red: Color;
  green: Color;
  yellow: Color;
  blue: Color;

  error: Color;
  success: Color;
  warning: Color;

  shadow: Color;
  borderRadius: string;
}

declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends Colors {
  }
}
