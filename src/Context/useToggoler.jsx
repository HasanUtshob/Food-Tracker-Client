import React, { use } from "react";
import { ThemeContext } from "./ThemeContext";

const useToggoler = () => {
  return use(ThemeContext);
};

export default useToggoler;
