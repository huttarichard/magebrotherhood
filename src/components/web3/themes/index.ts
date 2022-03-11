import { ThemesList } from "../helpers";
import darkTheme from "./dark";
import lightTheme from "./light";

export const themesList: ThemesList = {
  default: lightTheme,
  [lightTheme.name]: lightTheme,
  [darkTheme.name]: darkTheme,
};
