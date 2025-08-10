import { createContext } from "react";

export const ThemeContext = createContext({
  darkmode: false,
  setDarkmode: () => {}
});
