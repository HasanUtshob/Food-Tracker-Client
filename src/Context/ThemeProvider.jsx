import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("Theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme changes
    if (darkmode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("Theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("Theme", "light");
    }
  }, [darkmode]);

  return (
    <ThemeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
